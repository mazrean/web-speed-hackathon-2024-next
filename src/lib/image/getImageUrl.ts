type Params = {
  format: "avif" | "webp" | "png" | "jpg" | "jxl";
  height?: number;
  imageId: string;
  width?: number;
};

export const useImage = ({
  height,
  imageId,
  width,
}: {
  height: number;
  imageId: string;
  width: number;
}) => {
  return getImageUrl({
    format: "webp",
    height: height,
    imageId,
    width: width,
  });
};

export function getImageUrl({
  format,
  height,
  imageId,
  width,
}: Params): string {
  const url = new URL(`http://localhost:3000/images/${imageId}`);

  url.searchParams.set("format", format);
  if (width != null) {
    url.searchParams.set("width", `${width}`);
  }
  if (height != null) {
    url.searchParams.set("height", `${height}`);
  }

  return url.href;
}
