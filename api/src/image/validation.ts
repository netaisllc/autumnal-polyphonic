import Joi from "@hapi/joi";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";

export const ImageSchema = Joi.object({
  id: Joi.string()
    .min(32)
    .max(32)
    .required()
});

export interface ImageRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: Joi.extractType<typeof ImageSchema>;
}
