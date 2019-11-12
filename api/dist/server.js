"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
// Route handlers
const index_1 = require("./image/index");
const index_2 = require("./property/index");
// Route validations
const validation_1 = require("./property/validation");
const validation_2 = require("./image/validation");
// Route parameters are validated before calling their handler.
// Here we implement some resources to do that.
const express_joi_validation_1 = require("express-joi-validation");
// This is optional, but without it you need to manually generate
// a type or interface for ValidatedRequestSchema members
require("joi-extract-type");
// Make the validation service
const validator = express_joi_validation_1.createValidator();
// Set up logger
const SimpleNodeLogger = require('simple-node-logger');
const logopts = {
    timestampFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
};
const log = SimpleNodeLogger.createSimpleLogger(logopts);
log.setLevel('debug');
// Setup CORS handling
const corsOptions = {
    origin: function (origin, callback) {
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
const app = express_1.default();
app.use(compression_1.default());
app.use(cors_1.default(corsOptions));
app.use(express_1.default.json()); // for parsing application/json
app.use('/static', express_1.default.static(path_1.default.join(__dirname, 'static')));
// Identity route: Dump name, rank and serial number
app.get(routes.identity, (req, res) => {
    return res.json({
        service: 'Proper.ty API',
        version: '0.0',
        message: 'Browse all the roofs',
    });
});
// Image route: return two browser renderable images for a property, one with
// decorations (overlays) and one without
app.get(routes.image, 
// Validate request parameters vs schema
validator.query(validation_2.ImageSchema), 
// Yay, we're validated, so handle the request
(req, res, next) => {
    // Handler is guranteed valid parameters
    return index_1.imageHandler(req, res, next, log);
});
// Nearby Property route: return a rich object for each property located near  given Lat/Lng
app.get(routes.property, 
// Validate request parameters vs schema
validator.query(validation_1.PropertySchema), 
// Yay, we're validated, so handle the request
(req, res, next) => {
    // Handler is guranteed valid parameters
    return index_2.propertyHandler(req, res, next, log);
});
// Boot
app.listen(port, () => log.info(`[Proper.ty API v0.0] Listening on port ${port}.`));
//# sourceMappingURL=server.js.map