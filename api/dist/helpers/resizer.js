"use strict";
// DEPENDENCY
// https://github.com/lovell/sharp//
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
const sharp_1 = __importDefault(require("sharp"));
exports.resize = (buf, size, log) => __awaiter(void 0, void 0, void 0, function* () {
    // size in pixels
    const n = size || 80;
    try {
        // Resize the image, then convert it back to buffer
        const data = yield sharp_1.default(buf)
            .resize(n)
            .toBuffer();
        // Convert to data URI for network transfer
        const duri = data.toString("base64");
        // Prepend the scheme
        const response = duri ? `data:image/png;base64,${duri}` : null;
        return response;
    }
    catch (err) {
        log.error(`[ERROR][resizer] ${JSON.stringify(err)}`);
        return err;
    }
});
//# sourceMappingURL=resizer.js.map