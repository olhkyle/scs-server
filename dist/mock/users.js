"use strict";
// import bcrypt from 'bcrypt';
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = exports.findUser = exports.createUser = exports.getUsers = exports.users = void 0;
let users = [{ email: 'test@gmail.com', password: 'test1234', name: 'admin' }];
exports.users = users;
const getUsers = () => users;
exports.getUsers = getUsers;
const createUser = ({ email, password, name }) => {
    exports.users = users = [...users, { email, password, name }];
};
exports.createUser = createUser;
const findUser = ({ email, password }) => {
    // users.find(user => user.userid === userid && bcrypt.compareSync(password, user.password));
    return users.find(user => user.email === email && user.password === password);
};
exports.findUser = findUser;
const findUserByEmail = (email) => {
    return users.find(user => user.email === email);
};
exports.findUserByEmail = findUserByEmail;
//# sourceMappingURL=users.js.map