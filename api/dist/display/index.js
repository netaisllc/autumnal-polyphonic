"use strict";
// Display endpoint helpers
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
const bluebird_1 = __importDefault(require("bluebird"));
const request_promise_1 = __importDefault(require("request-promise"));
const resizer_1 = require("../helpers/resizer");
const placeholder_1 = __importDefault(require("../helpers/placeholder"));
const createOptions = (id) => {
    let o = {
        // Expect binary data
        encoding: null,
        method: "GET",
        uri: `http://localhost:1235/display/${id}`
    };
    o["Content-type:"] = "image/jpeg";
    return o;
};
const fetchImageURIs = (propIds, log) => __awaiter(void 0, void 0, void 0, function* () {
    // Make a collection member with property id and image ldata
    // Helpers - - - - - - -
    const makeMember = (id, results) => __awaiter(void 0, void 0, void 0, function* () {
        // Convert the image buffer to a string representation
        // after reducing its overall size
        try {
            const data = yield resizer_1.resize(results, 800, log);
            return {
                id: id,
                image: data ? data : null
            };
        }
        catch (err) {
            return {
                id: id,
                image: placeholder_1.default
            };
        }
    });
    // XHR helper
    const fetcher = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const options = createOptions(id);
        try {
            log.info(`[GET][/display] ${options.uri}`);
            const results = yield request_promise_1.default(options);
            const member = yield makeMember(id, results);
            log.info(`[GET][/display] OK`);
            return member;
        }
        catch (err) {
            return err;
        }
    });
    // - - - - - - - - - - -
    try {
        const members = yield bluebird_1.default.map(propIds, fetcher);
        return members;
    }
    catch (err) {
        return err;
    }
});
exports.getDisplay = (propIds, log) => __awaiter(void 0, void 0, void 0, function* () {
    if (!propIds || propIds.length === 0)
        return [];
    try {
        const members = yield fetchImageURIs(propIds, log);
        return members;
    }
    catch (err) {
        log.error(`[ERROR][/display] ${JSON.stringify(err)}`);
        return err;
    }
});
//# sourceMappingURL=index.js.map