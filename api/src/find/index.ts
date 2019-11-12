// Find endpoint helpers
import request from "request-promise";

export const createOptions = (payload: any, log: any) => {
  // Develop the HTTP call to find properties
  return {
    method: "POST",
    uri: "http://localhost:1235/find",
    body: payload,
    json: true
  };
};

export const createPayload = (lat: number, lng: number, radius: number) => {
  // Develop a payload specifying a coordinate point in GeoJson.
  return {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [lng, lat]
    },
    "x-distance": radius
  };
};

export const findProperties = async (
  lat: number,
  lng: number,
  radius: number,
  log: any
): Promise<any> => {
  // Make XHR options and POST payload for a call to /find endpoint.
  const payload = createPayload(lat, lng, radius);
  const options = createOptions(payload, log);

  try {
    log.info(`[POST][/find] ${options.uri}, ${JSON.stringify(payload)}`);
    const results = await request(options);
    log.info(`[POST][/find] OK`);
    return results;
  } catch (err) {
    log.error(`[POST][/property] ${JSON.stringify(err)}`);
    return err;
  }
};
