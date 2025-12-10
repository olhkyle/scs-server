"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.addUser = exports.getUsers = void 0;
const _1 = require(".");
const getUsers = async (_request, response) => {
    try {
        const users = await _1.UserService.getUsers();
        console.log(users);
        response.status(200).send({ data: users });
    }
    catch (error) {
        const e = error;
        if (e.code === 11000) {
            // unique error
        }
        console.error('[ERROR] users', error);
        response.status(500).send({ auth: 'fail' });
    }
};
exports.getUsers = getUsers;
const addUser = async (request, response) => {
    try {
        const { name, email, course, skills } = request.body;
        console.log(name, email, course, skills);
        const newUser = await _1.UserService.addUser({ name, email, course, createdAt: new Date(), updatedAt: new Date(), skills: { ...skills } });
        response.status(201).send({ data: newUser, message: 'Successfully add user' });
    }
    catch (error) {
        const e = error;
        if (e.code === 11000) {
            // unique error
        }
        console.error('[ERROR] users', error);
        response.status(500).send({ auth: 'fail' });
    }
};
exports.addUser = addUser;
const deleteUser = async (request, response) => {
    const { id } = request.params;
    console.log(id);
    if (!id) {
        return response.status(401);
    }
    try {
        const result = await _1.UserService.deleteUser({ id });
        console.log(result);
        console.log('[DELETE]', result);
        response.status(200).send({ message: 'Successfully delete one' });
    }
    catch (error) {
        console.error(error);
        response.status(500).send({ auth: 'fail' });
    }
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.controller.js.map