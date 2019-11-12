"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../find/index");
const index_2 = require("../display/index");
const index_3 = require("../statistic/index");
// Entry point
const main = (req, res, next, log) => __awaiter(void 0, void 0, void 0, function* () {
    log.info(`[GET][/property] ${JSON.stringify(req.query)}`);
    let properties = [];
    // Helper
    const cacheCoordinates = (props) => {
        const cacher = (prop) => {
            const o = {
                id: prop.propertyId,
                coordinates: prop.coordinates
            };
            properties.push(o);
            return prop.propertyId;
        };
        return props.map(cacher);
    };
    const decorate = (props) => {
        // Add back the cached lat/lng
        const decorator = (prop) => {
            const p = properties.find(member => {
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
        const results = yield index_1.findProperties(req.query.latitude, req.query.longitude, req.query.radius, log);
        // @results now holds 0-n  property ids. Decorate ids into property objects...
        // For each propId, save it and it's cordinates
        const propIds = cacheCoordinates(results);
        // For each property id, acquire its image data
        const members = yield index_2.getDisplay(propIds, log);
        // For each property id as @member, acquire its statistics
        const semiProperties = yield index_3.getStatistics(members, log);
        // Decorate and return property collection
        const finalProperties = decorate(semiProperties);
        res.json(finalProperties);
    }
    catch (err) {
        next(err);
    }
});
exports.propertyHandler = main;
//# sourceMappingURL=index.js.map