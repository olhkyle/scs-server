"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const dns_1 = __importDefault(require("dns"));
const router_1 = require("./router");
const constants_1 = require("./constants");
const mongoose_1 = require("./lib/mongoose");
class Server {
    app;
    port;
    constructor() {
        dotenv_1.default.config();
        dns_1.default.setDefaultResultOrder('ipv4first');
        const app = (0, express_1.default)();
        this.app = app;
        this.port = Number(process.env.PORT) || 8080;
    }
    setRoute() {
        const router = express_1.default.Router();
        this.app.use(router_1.AuthRouter);
        this.app.use(router_1.UserRouter);
        this.app.use(router.get('/', (_, response) => {
            response.status(200).send({ message: '✅ Successfully connect SCS server' });
        }));
    }
    async setMiddleware() {
        this.app.use((req, _, next) => {
            console.log(`middleware * ${req.rawHeaders[1]}`);
            next();
        });
        this.app.use((0, cors_1.default)({ origin: constants_1.allowedOrigins, credentials: true }));
        this.app.use(express_1.default.static('public'));
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use((0, cookie_parser_1.default)());
        await (0, mongoose_1.connectDB)();
        this.setRoute();
        // Last 404 Middleare
        this.app.use((_, res, __) => {
            res.send({ error: '404 Not-Found Error' });
        });
    }
    listen() {
        this.setMiddleware();
        this.app.listen(this.port, () => {
            console.log(`----- SCS - Spatial Context Strategy -----`);
            console.log(`----- ✅ Successfully Connected -----`);
            console.log(`----- Server listening on http://localhost:${this.port} -----`);
            console.log(`----------`);
        });
    }
}
const init = () => {
    const server = new Server();
    server.listen();
};
init();
//# sourceMappingURL=app.js.map