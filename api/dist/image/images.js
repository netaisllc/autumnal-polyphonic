"use strict";
// Image endpoint helpers
// GET /display/:id?overlay=yes(parcel=:parcelColor&building=:buildingColor
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
const request_promise_1 = __importDefault(require("request-promise"));
const resizer_1 = require("../helpers/resizer");
const convertToString = (buffers, log) => __awaiter(void 0, void 0, void 0, function* () {
    // Convert images as buffers to dataURI
    let promises = [];
    promises.push(resizer_1.resize(buffers[0], 700, log));
    promises.push(resizer_1.resize(buffers[1], 700, log));
    const strings = yield Promise.all(promises);
    return strings;
});
const createOptions = (id, layers) => {
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
const developResults = (dataURIs, log) => {
    // Format better for the front-end
    return {
        withLayers: dataURIs[0],
        withoutLayers: dataURIs[1]
    };
};
const makeRequest = (options, log) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        log.info(`[GET][/display] ${options.uri}`);
        const results = yield request_promise_1.default(options);
        log.info(`[GET][/display] OK`);
        return results;
    }
    catch (err) {
        log.error(`[ERROR][/display] ${JSON.stringify(err)}`);
        return err;
    }
});
exports.getImages = (propId, log) => __awaiter(void 0, void 0, void 0, function* () {
    // Make two image requests for the property in @propId.
    // One image will have no overlays and the other will
    const requestLayers = createOptions(propId, true);
    const requestNoLayers = createOptions(propId, false);
    let promises = [];
    promises.push(makeRequest(requestLayers, log));
    promises.push(makeRequest(requestNoLayers, log));
    try {
        const buffers = yield Promise.all(promises);
        const dataURIs = yield convertToString(buffers, log);
        const images = developResults(dataURIs, log);
        return images;
    }
    catch (err) {
        log.error(`[ERROR][getImages] ${JSON.stringify(err)}`);
        return err;
    }
});
//# sourceMappingURL=images.js.map