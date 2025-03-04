"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../controllers");
const middlewares_1 = require("../../middlewares");
exports.userRouter = express_1.default.Router();
exports.userRouter.get('/users', middlewares_1.authMiddleware, controllers_1.getUsers);
exports.userRouter.post('/users', controllers_1.addNewUser);
exports.userRouter.post('/login', controllers_1.login);
exports.userRouter.get('/user', middlewares_1.authMiddleware, controllers_1.getUser);
exports.userRouter.patch('/user', middlewares_1.authMiddleware, controllers_1.updateUser);
