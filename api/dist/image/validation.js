"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const express_joi_validation_1 = require("express-joi-validation");
exports.ImageSchema = joi_1.default.object({
    id: joi_1.default.string()
        .min(32)
        .max(32)
        .required()
});
//# sourceMappingURL=validation.js.map