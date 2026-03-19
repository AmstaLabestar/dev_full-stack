import { describe, expect, it } from "vitest";

import { getUploadConstraints, validateUploadFile } from "@/schemas/upload";

describe("validateUploadFile", () => {
  it("accepts a valid pdf cv", () => {
    const result = validateUploadFile("cv", {
      name: "hamza-cv.pdf",
      size: 120_000,
      type: "application/pdf",
    });

    expect(result.success).toBe(true);
  });

  it("rejects an oversized image", () => {
    const result = validateUploadFile("image", {
      name: "cover.png",
      size: getUploadConstraints("image").maxSize + 1,
      type: "image/png",
    });

    expect(result.success).toBe(false);
  });
});
