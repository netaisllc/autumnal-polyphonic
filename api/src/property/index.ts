import { Member, Property } from "./Property";
import { Request, Response } from "express";
import { findProperties } from "../find/index";
import { getDisplay } from "../display/index";
import { getStatistics } from "../statistic/index";

// Entry point
const main = async (req: Request, res: Response, next: any, log: any) => {
  log.info(`[GET][/property] ${JSON.stringify(req.query)}`);

  let properties: Property[] = [];

  // Helper
  const cacheCoordinates = (props: any[]) => {
    const cacher = (prop: any) => {
      const o = {
        id: prop.propertyId,
        coordinates: prop.coordinates
      };
      properties.push(o);
      return prop.propertyId;
    };

    return props.map(cacher);
  };

  const decorate = (props: Property[]) => {
    // Add back the cached lat/lng
    const decorator = (prop: any) => {
      const p: Property = properties.find(member => {
        return prop.id === member.id;
      });
      prop.coordinates = p.coordinates;
      return prop;
    };

    return props.map(decorator);
  };

  try {
    // Get a collection of ids for properties that fall within the specified @radius
    // around the geo point specified by @latitude and @longtitude.
    const results = await findProperties(
      req.query.latitude,
      req.query.longitude,
      req.query.radius,
      log
    );

    // @results now holds 0-n  property ids. Decorate ids into property objects...
    // For each propId, save it and it's cordinates
    const propIds: string[] = cacheCoordinates(results);

    // For each property id, acquire its image data
    const members: Member[] = await getDisplay(propIds, log);

    // For each property id as @member, acquire its statistics
    const semiProperties: Property[] = await getStatistics(members, log);

    // Decorate and return property collection
    const finalProperties = decorate(semiProperties);
    res.json(finalProperties);
  } catch (err) {
    next(err);
  }
};

export { main as propertyHandler };
