"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const allowedOrigins = [process.env.CLIENT_SIDE_DEV_URL, process.env.CLIENT_SIDE_PRODUCTION_URL].filter((url) => !!url);
exports.default = allowedOrigins;
//# sourceMappingURL=allowedOrigins.js.map