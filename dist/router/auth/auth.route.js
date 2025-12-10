"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_service_1 = require("./auth.service");
const router = express_1.default.Router();
router.get('/api/auth', auth_service_1.checkAuth);
router.post('/api/signin', auth_service_1.signIn);
router.post('/api/signup', auth_service_1.signUp);
router.post('/api/signout', auth_service_1.signOut);
exports.default = router;
//# sourceMappingURL=auth.route.js.map