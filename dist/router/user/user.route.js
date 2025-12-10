"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.get('/api/users', user_controller_1.getUsers);
router.post('/api/users', user_controller_1.addUser);
router.delete('/api/user/:id', user_controller_1.deleteUser);
exports.default = router;
//# sourceMappingURL=user.route.js.map