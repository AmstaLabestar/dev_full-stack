import { describe, expect, it } from "vitest";

import {
  buildUploadPath,
  getUploadFileName,
  getUploadPathPrefix,
  slugifyUploadSegment,
} from "@/lib/upload-path";

describe("upload-path", () => {
  it("builds upload paths using the expected folder", () => {
    const pathname = buildUploadPath("video", "Tailor Pro Demo.MP4");

    expect(pathname).toMatch(/^uploads\/videos\/\d+-tailor-pro-demo\.mp4$/);
  });

  it("exposes stable helpers for file names and prefixes", () => {
    expect(getUploadPathPrefix("image")).toBe("uploads/images");
    expect(getUploadFileName("uploads/cv/123-hamza-cv.pdf")).toBe(
      "123-hamza-cv.pdf",
    );
    expect(slugifyUploadSegment("Photo de Profil 2026")).toBe(
      "photo-de-profil-2026",
    );
  });
});
