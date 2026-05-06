import { NextResponse } from "next/server";

import { listMediaFiles, saveMediaFile } from "@/lib/media-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const allowedTypes = [
  "audio/",
  "video/",
  "image/",
  "text/vtt",
  "application/x-subrip",
  "application/octet-stream",
];

function isAllowedMedia(file: File) {
  return allowedTypes.some((type) => file.type.startsWith(type)) || /\.(srt|vtt)$/i.test(file.name);
}

export async function GET() {
  return NextResponse.json({ files: await listMediaFiles() });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Upload a media file with the field name `file`." }, { status: 400 });
  }

  if (!isAllowedMedia(file)) {
    return NextResponse.json({ error: "Only audio, video, image, and subtitle files are supported." }, { status: 415 });
  }

  if (file.size > 250 * 1024 * 1024) {
    return NextResponse.json({ error: "Media files are limited to 250 MB in this POC." }, { status: 413 });
  }

  return NextResponse.json({ file: await saveMediaFile(file) }, { status: 201 });
}
