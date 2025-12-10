"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.addUser = exports.getUsers = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../../models");
const getUsers = async () => {
    const users = await models_1.User.find();
    return users;
};
exports.getUsers = getUsers;
const addUser = async ({ name, email, course, skills }) => {
    const newUser = await models_1.User.create({ name, email, course, skills });
    return newUser;
};
exports.addUser = addUser;
const deleteUser = async ({ id }) => {
    console.log(id);
    return await models_1.User.deleteOne({ _id: new mongoose_1.default.Types.ObjectId(id) });
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.service.js.map