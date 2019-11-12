// DEPENDENCY
// https://github.com/lovell/sharp//

import sharp from "sharp";

export const resize = async (buf: any, size: number, log: any) => {
  // size in pixels
  const n = size || 80;

  try {
    // Resize the image, then convert it back to buffer
    const data = await sharp(buf)
      .resize(n)
      .toBuffer();
    // Convert to data URI for network transfer
    const duri = data.toString("base64");
    // Prepend the scheme
    const response = duri ? `data:image/png;base64,${duri}` : null;
    return response;
  } catch (err) {
    log.error(`[ERROR][resizer] ${JSON.stringify(err)}`);
    return err;
  }
};
