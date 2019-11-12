import * as Joi from '@hapi/joi';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import path from 'path';

// Route handlers
import { imageHandler } from './image/index';
import { propertyHandler } from './property/index';

// Route validations
import { PropertySchema, PropertyRequestSchema } from './property/validation';
import { ImageSchema, ImageRequestSchema } from './image/validation';

// Route parameters are validated before calling their handler.
// Here we implement some resources to do that.
import {
	createValidator,
	// Use this as a replacement for express.Request
	ValidatedRequest,
} from 'express-joi-validation';

// This is optional, but without it you need to manually generate
// a type or interface for ValidatedRequestSchema members
import 'joi-extract-type';

// Make the validation service
const validator = createValidator();

// Set up logger
const SimpleNodeLogger = require('simple-node-logger');
const logopts = {
	timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
};
const log = SimpleNodeLogger.createSimpleLogger(logopts);
log.setLevel('debug');

// Setup CORS handling
const corsOptions = {
	origin: function(origin: any, callback: any) {
		return callback(null, true);
	},
	credentials: true,
};

const routes = {
	identity: '/',
	image: '/image',
	property: '/property',
};

// Make server
const port = 3000;
const app: express.Application = express();
app.use(compression());
app.use(cors(corsOptions));
app.use(express.json()); // for parsing application/json
app.use('/static', express.static(path.join(__dirname, 'static')));

// Identity route: Dump name, rank and serial number
app.get(routes.identity, (req: express.Request, res: express.Response) => {
	return res.json({
		service: 'Proper.ty API',
		version: '0.0',
		message: 'Browse all the roofs',
	});
});

// Image route: return two browser renderable images for a property, one with
// decorations (overlays) and one without
app.get(
	routes.image,
	// Validate request parameters vs schema
	validator.query(ImageSchema),
	// Yay, we're validated, so handle the request
	(req: ValidatedRequest<ImageRequestSchema>, res: express.Response, next: express.NextFunction) => {
		// Handler is guranteed valid parameters
		return imageHandler(req, res, next, log);
	}
);

// Nearby Property route: return a rich object for each property located near  given Lat/Lng
app.get(
	routes.property,
	// Validate request parameters vs schema
	validator.query(PropertySchema),
	// Yay, we're validated, so handle the request
	(req: ValidatedRequest<PropertyRequestSchema>, res: express.Response, next: express.NextFunction) => {
		// Handler is guranteed valid parameters
		return propertyHandler(req, res, next, log);
	}
);

// Boot
app.listen(port, () => log.info(`[Proper.ty API v0.0] Listening on port ${port}.`));
