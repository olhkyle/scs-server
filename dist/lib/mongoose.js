"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        if (mongoose_1.default.connection.readyState === 1) {
            console.log('Already Connected to DB');
            return;
        }
        await mongoose_1.default.connect(process.env.MONGODB_URI || '', {
            dbName: process.env.MONGODB_DB_NAME,
        });
        console.log('Connected to DB');
    }
    catch (error) {
        console.log('Error happened to connect DB', error);
        throw new Error(String(error));
    }
};
exports.connectDB = connectDB;
//# sourceMappingURL=mongoose.js.map