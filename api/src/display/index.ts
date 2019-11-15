// Display endpoint helpers
// GET /display/:id?overlay=yes(parcel=:parcelColor&building=:buildingColor

import BluPromise from "bluebird";
import request from "request-promise";
import { resize } from "../helpers/resizer";
import placeholder from "../helpers/placeholder";

const createOptions = (id: string): any => {
  let o = {
    // Expect binary data
    encoding: null,
    method: "GET",
    uri: `http://localhost:1235/display/${id}`
  };
  o["Content-type:"] = "image/jpeg";
  return o;
};

const fetchImageURIs = async (propIds: string[], log: any) => {
  // Make a collection member with property id and image ldata

  // Helpers - - - - - - -
  const makeMember = async (id: string, results: any) => {
    // Convert the image buffer to a string representation
    // after reducing its overall size
    try {
      const data = await resize(results, 800, log);
      return {
        id: id,
        image: data ? data : null
      };
    } catch (err) {
      return {
        id: id,
        image: placeholder
      };
    }
  };

  // XHR helper
  const fetcher = async (id: string) => {
    const options = createOptions(id);

    try {
      log.info(`[GET][/display] ${options.uri}`);
      const results = await request(options);
      const member = await makeMember(id, results);
      log.info(`[GET][/display] OK`);
      return member;
    } catch (err) {
      return err;
    }
  };
  // - - - - - - - - - - -

  try {
    const members = await BluPromise.map(propIds, fetcher);
    return members;
  } catch (err) {
    return err;
  }
};

export const getDisplay = async (propIds: string[], log: any): Promise<any> => {
  if (!propIds || propIds.length === 0) return [];

  try {
    const members = await fetchImageURIs(propIds, log);
    return members;
  } catch (err) {
    log.error(`[ERROR][/display] ${JSON.stringify(err)}`);
    return err;
  }
};
