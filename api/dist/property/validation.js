"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const express_joi_validation_1 = require("express-joi-validation");
exports.PropertySchema = joi_1.default.object({
    latitude: joi_1.default.number()
        .min(-85.05112878)
        .max(85.05112878)
        .required(),
    longitude: joi_1.default.number()
        .min(-180)
        .max(180)
        .required(),
    radius: joi_1.default.number()
        .min(0)
        .max(256000)
        .required()
});
//# sourceMappingURL=validation.js.map