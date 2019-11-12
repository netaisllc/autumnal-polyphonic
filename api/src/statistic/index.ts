// Display endpoint helpers
// GET localhost:1235/statistics/:id?distance=:distance

import { Member, Property } from "../property/Property";
import request from "request-promise";

interface Result {
  status: string;
  value?: Property;
  reason?: string;
}

const additionalData = [
  {
    id: "f1650f2a99824f349643ad234abff6a2",
    address: `8 Prospect Avenue, Larchmont, New York 10538`,
    estimatedValue: `$2,593,268.00`,
    hasNotes: false
  },
  {
    id: "f853874999424ad2a5b6f37af6b56610",
    address: `419 E Coconut Palm Rd, Boca Raton, FL 33432`,
    estimatedValue: `$5,515,749.00`,
    hasNotes: false
  },
  {
    id: "3290ec7dd190478aab124f6f2f32bdd7",
    address: `Palm Beach County, Florida`,
    estimatedValue: `n/a`,
    hasNotes: true
  },
  {
    id: "622088210a6f43fca2a1824e8610df03",
    address: `707 Northeast 40th Road, Boca Raton, Florida 33431`,
    estimatedValue: "n/a",
    hasNotes: false
  },
  {
    id: "5e25c841f0ca47ac8215b5fd0076259a",
    address: `2233 N Geneva Terrace Chicago, IL 60614`,
    estimatedValue: `$2,547,432.00`,
    hasNotes: true
  }
];

const Promise_allSettled = promises => {
  return Promise.all(
    promises.map((promise, i) => {
      return promise
        .then(value => ({
          status: "fulfilled",
          value
        }))
        .catch(reason => ({
          status: "rejected",
          reason
        }));
    })
  );
};

const createOptions = (id: string) => {
  return {
    method: "GET",
    uri: `http://localhost:1235/statistics/${id}?distance=50000`,
    json: true
  };
};

const developProperty = (member: Member, results?: any) => {
  const prop: Property = additionalData.find(p => {
    return p.id === member.id;
  });

  return {
    address: prop.address,
    estimatedValue: prop.estimatedValue,
    id: member.id,
    imageURI: member.image,
    buildingAreas: results.buildingAreas ? results.buildingAreas : [],
    buildingDistances: results.buldingDistances ? results.buldingDistances : [],
    hasNotes: prop.hasNotes,
    parcelArea: results.parcelArea ? results.parcelArea : 0,
    zoneDensity: results.zone_density ? results.zone_density : 0
  };
};

const fetchDetails = async (members: Member[], log: any): Promise<any> => {
  // Make a collection member with property id and image data

  // XHR helper - - - - - - - - - - -
  const fetcher = async (member: Member) => {
    const options = createOptions(member.id);
    log.info(`[GET][/statistics] ${options.uri}`);

    try {
      const results = await request(options);
      log.info(`[GET][/statistics] OK`);
      return developProperty(member, results);
    } catch (err) {
      log.error(
        `[GET][/statistics] Error statusCode ${err.statusCode || "n/a"}`
      );
      return {
        state: "error",
        statusCode: err.statusCode || 1
      };
    }
  };
  // - - - - - - - - - - - - - - - -

  const promises = members.map(member => {
    return fetcher(member);
  });

  const results = await Promise_allSettled(promises);

  // Only consider the requests that actually succeeded
  const fulfilled = results.filter((result: Result) => {
    return result.status === "fulfilled" && result.value.address;
  });

  // Format for downstream consumers
  const properties = fulfilled.map((filled: Result) => {
    return filled.value;
  });

  // If there's a fulfilled request for each original member, we're done.
  if (members.length === properties.length) {
    return properties;
  }

  // Otherwise, we need to substitute a member object for the requests that failed.
  // Start by making a collection of members whose /stat request failed
  const missing = [];
  members.forEach(member => {
    const i = properties.findIndex(prop => {
      return prop.id === member.id;
    });
    if (i < 0) missing.push(member);
  });

  // Next, iterate missing and handle missing statistics
  const substitutes = [];
  missing.forEach(member => {
    const mem = developProperty(member, {});
    substitutes.push(mem);
  });

  // Now return
  const combined = properties.concat(substitutes);
  return combined;
};

export const getStatistics = async (
  members: Member[],
  log: any
): Promise<any> => {
  if (!members || members.length === 0) return [];

  try {
    const properties = await fetchDetails(members, log);
    return properties;
  } catch (err) {
    log.error(`[ERROR][getStatistics] ${JSON.stringify(err)}`);
    return err;
  }
};
