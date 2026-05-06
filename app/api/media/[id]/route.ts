import { NextResponse } from "next/server";

import { deleteMediaFile, getMediaFile } from "@/lib/media-storage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type MediaRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(_request: Request, { params }: MediaRouteProps) {
  const { id } = await params;
  const result = await getMediaFile(id);

  if (!result) {
    return NextResponse.json({ error: "Media file not found." }, { status: 404 });
  }

  return new Response(result.bytes, {
    headers: {
      "Content-Type": result.media.contentType,
      "Content-Length": String(result.media.size),
      "Content-Disposition": `inline; filename="${result.media.originalName.replaceAll('"', "")}"`,
      "Cache-Control": "private, max-age=3600",
    },
  });
}

export async function DELETE(_request: Request, { params }: MediaRouteProps) {
  const { id } = await params;
  const deleted = await deleteMediaFile(id);

  if (!deleted) {
    return NextResponse.json({ error: "Media file not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
