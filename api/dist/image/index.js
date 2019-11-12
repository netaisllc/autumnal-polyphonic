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
const images_1 = require("./images");
// Entry point
const main = (req, res, next, log) => __awaiter(void 0, void 0, void 0, function* () {
    log.info(`[GET][/image] ${JSON.stringify(req.query)}`);
    try {
        const images = yield images_1.getImages(req.query.id, log);
        log.info(`[GET][/image] OK`);
        res.json(images);
    }
    catch (err) {
        log.error(`[ERROR][/image] ${JSON.stringify(req.query)}, ${JSON.stringify(err)}`);
        next(err);
    }
});
exports.imageHandler = main;
//# sourceMappingURL=index.js.map