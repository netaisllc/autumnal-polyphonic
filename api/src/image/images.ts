// Image endpoint helpers
// GET /display/:id?overlay=yes(parcel=:parcelColor&building=:buildingColor

import request from "request-promise";
import { resize } from "../helpers/resizer";

const convertToString = async (buffers: any[], log: any) => {
  // Convert images as buffers to dataURI
  let promises = [];
  promises.push(resize(buffers[0], 700, log));
  promises.push(resize(buffers[1], 700, log));
  const strings = await Promise.all(promises);
  return strings;
};

const createOptions = (id: string, layers: boolean): any => {
  const excludeLayers = `http://localhost:1235/display/${id}?overlay=no`;
  const includeLayers = `http://localhost:1235/display/${id}?overlay=yes`;
  let o = {
    // Expect binary data
    encoding: null,
    method: "GET",
    uri: layers ? includeLayers : excludeLayers
  };
  o["Content-type:"] = "image/jpeg";
  return o;
};

const developResults = (dataURIs: string[], log: any) => {
  // Format better for the front-end
  return {
    withLayers: dataURIs[0],
    withoutLayers: dataURIs[1]
  };
};

const makeRequest = async (options, log) => {
  try {
    log.info(`[GET][/display] ${options.uri}`);
    const results = await request(options);
    log.info(`[GET][/display] OK`);
    return results;
  } catch (err) {
    log.error(`[ERROR][/display] ${JSON.stringify(err)}`);
    return err;
  }
};

export const getImages = async (propId: string, log: any): Promise<any> => {
  // Make two image requests for the property in @propId.
  // One image will have no overlays and the other will
  const requestLayers = createOptions(propId, true);
  const requestNoLayers = createOptions(propId, false);

  let promises = [];
  promises.push(makeRequest(requestLayers, log));
  promises.push(makeRequest(requestNoLayers, log));

  try {
    const buffers = await Promise.all(promises);
    const dataURIs = await convertToString(buffers, log);
    const images = developResults(dataURIs, log);
    return images;
  } catch (err) {
    log.error(`[ERROR][getImages] ${JSON.stringify(err)}`);
    return err;
  }
};
