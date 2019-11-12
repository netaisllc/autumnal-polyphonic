import Joi from "@hapi/joi";
import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";

export const PropertySchema = Joi.object({
  latitude: Joi.number()
    .min(-85.05112878)
    .max(85.05112878)
    .required(),
  longitude: Joi.number()
    .min(-180)
    .max(180)
    .required(),
  radius: Joi.number()
    .min(0)
    .max(256000)
    .required()
});

export interface PropertyRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: Joi.extractType<typeof PropertySchema>;
}
