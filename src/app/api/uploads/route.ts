import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { isAdminRole } from "@/lib/authorization";
import {
  getBlobUploadRules,
  isAllowedBlobPathname,
  parseBlobClientPayload,
} from "@/lib/blob-storage";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const session = await auth();

  if (!session?.user || !isAdminRole(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      request,
      body,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const payload = parseBlobClientPayload(clientPayload);

        if (!payload.success) {
          throw new Error("Invalid upload payload.");
        }

        if (!isAllowedBlobPathname(pathname, payload.data.kind)) {
          throw new Error("Invalid upload pathname.");
        }

        const rules = getBlobUploadRules(payload.data.kind);

        return {
          ...rules,
          addRandomSuffix: false,
          allowOverwrite: false,
          cacheControlMaxAge: 60 * 60 * 24 * 30,
        };
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Blob upload token generation failed.",
      },
      { status: 400 },
    );
  }
}
