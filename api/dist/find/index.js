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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Find endpoint helpers
const request_promise_1 = __importDefault(require("request-promise"));
exports.createOptions = (payload, log) => {
    // Develop the HTTP call to find properties
    return {
        method: "POST",
        uri: "http://localhost:1235/find",
        body: payload,
        json: true
    };
};
exports.createPayload = (lat, lng, radius) => {
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
exports.findProperties = (lat, lng, radius, log) => __awaiter(void 0, void 0, void 0, function* () {
    // Make XHR options and POST payload for a call to /find endpoint.
    const payload = exports.createPayload(lat, lng, radius);
    const options = exports.createOptions(payload, log);
    try {
        log.info(`[POST][/find] ${options.uri}, ${JSON.stringify(payload)}`);
        const results = yield request_promise_1.default(options);
        log.info(`[POST][/find] OK`);
        return results;
    }
    catch (err) {
        log.error(`[POST][/property] ${JSON.stringify(err)}`);
        return err;
    }
});
//# sourceMappingURL=index.js.map