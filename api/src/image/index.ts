import { Request, Response } from "express";
import { getImages } from "./images";

// Entry point
const main = async (req: Request, res: Response, next: any, log: any) => {
  log.info(`[GET][/image] ${JSON.stringify(req.query)}`);

  try {
    const images = await getImages(req.query.id, log);
    log.info(`[GET][/image] OK`);
    res.json(images);
  } catch (err) {
    log.error(
      `[ERROR][/image] ${JSON.stringify(req.query)}, ${JSON.stringify(err)}`
    );
    next(err);
  }
};

export { main as imageHandler };
