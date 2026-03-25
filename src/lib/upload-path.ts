export const uploadDirectories = {
  cv: "cv",
  image: "images",
  video: "videos",
} as const;

export type UploadDirectoryKind = keyof typeof uploadDirectories;

export function slugifyUploadSegment(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function getUploadPathPrefix(kind: UploadDirectoryKind) {
  return `uploads/${uploadDirectories[kind]}`;
}

export function buildUploadPath(kind: UploadDirectoryKind, originalFileName: string) {
  const extension = getFileExtension(originalFileName);
  const baseName = extension
    ? originalFileName.slice(0, -extension.length)
    : originalFileName;
  const safeName = slugifyUploadSegment(baseName) || kind;
  const fileName = `${Date.now()}-${safeName}${extension}`;

  return `${getUploadPathPrefix(kind)}/${fileName}`;
}

export function getUploadFileName(pathname: string) {
  const parts = pathname.split("/");
  return parts.at(-1) ?? pathname;
}

function getFileExtension(fileName: string) {
  const lastDotIndex = fileName.lastIndexOf(".");

  if (lastDotIndex <= 0) {
    return "";
  }

  return fileName.slice(lastDotIndex).toLowerCase();
}
