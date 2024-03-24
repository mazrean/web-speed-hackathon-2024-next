import { encode, decode } from "@jsquash/jxl";

export const jpegXlConverter = {
  async decode(data: Uint8Array): Promise<ImageData> {
    return decode(data);
  },
  async encode(data: ImageData): Promise<Uint8Array> {
    return encode(data, {
      effort: 0,
      quality: 100,
    }).then((data) => new Uint8Array(data));
  },
};
