import { mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import path from "node:path";

export type StoredMedia = {
  id: string;
  filename: string;
  originalName: string;
  contentType: string;
  size: number;
  createdAt: string;
  url: string;
};

type MediaIndex = {
  files: StoredMedia[];
};

const safeNamePattern = /[^a-zA-Z0-9._-]/g;

export function getMediaStorageDir() {
  return process.env.MEDIA_STORAGE_DIR ?? path.join(process.cwd(), "storage", "media");
}

function sanitizeFilename(filename: string) {
  const parsed = path.parse(filename);
  const name = parsed.name.replace(safeNamePattern, "-").replace(/-+/g, "-").slice(0, 80) || "media";
  const ext = parsed.ext.replace(safeNamePattern, "").slice(0, 16);
  return `${name}${ext}`.toLowerCase();
}

async function ensureStorage() {
  const root = getMediaStorageDir();
  await mkdir(path.join(root, "files"), { recursive: true });
  return root;
}

function indexPath(root: string) {
  return path.join(root, "index.json");
}

async function readIndex(root: string): Promise<MediaIndex> {
  try {
    const raw = await readFile(indexPath(root), "utf8");
    return JSON.parse(raw) as MediaIndex;
  } catch {
    return { files: [] };
  }
}

async function writeIndex(root: string, index: MediaIndex) {
  await writeFile(indexPath(root), JSON.stringify(index, null, 2));
}

export async function listMediaFiles() {
  const root = await ensureStorage();
  const index = await readIndex(root);

  const existing = await readdir(path.join(root, "files")).catch(() => []);
  const existingSet = new Set(existing);

  return index.files
    .filter((file) => existingSet.has(file.filename))
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

export async function saveMediaFile(file: File) {
  const root = await ensureStorage();
  const index = await readIndex(root);
  const id = randomUUID();
  const cleanName = sanitizeFilename(file.name);
  const filename = `${id}-${cleanName}`;
  const destination = path.join(root, "files", filename);
  const bytes = Buffer.from(await file.arrayBuffer());

  await writeFile(destination, bytes);

  const storedFile: StoredMedia = {
    id,
    filename,
    originalName: file.name,
    contentType: file.type || "application/octet-stream",
    size: file.size,
    createdAt: new Date().toISOString(),
    url: `/api/media/${id}`,
  };

  await writeIndex(root, { files: [storedFile, ...index.files] });
  return storedFile;
}

export async function getMediaFile(id: string) {
  const root = await ensureStorage();
  const index = await readIndex(root);
  const media = index.files.find((file) => file.id === id);

  if (!media) {
    return null;
  }

  const filepath = path.join(root, "files", media.filename);
  const fileStats = await stat(filepath).catch(() => null);

  if (!fileStats?.isFile()) {
    return null;
  }

  return {
    media,
    bytes: await readFile(filepath),
  };
}

export async function deleteMediaFile(id: string) {
  const root = await ensureStorage();
  const index = await readIndex(root);
  const media = index.files.find((file) => file.id === id);

  if (!media) {
    return false;
  }

  await rm(path.join(root, "files", media.filename), { force: true });
  await writeIndex(root, { files: index.files.filter((file) => file.id !== id) });
  return true;
}
