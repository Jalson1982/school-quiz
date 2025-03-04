"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../controllers");
const middlewares_1 = require("../../middlewares");
exports.questionRouter = express_1.default.Router();
exports.questionRouter.get('/questions', middlewares_1.authMiddleware, controllers_1.getQuestions);
exports.questionRouter.post('/questions', controllers_1.createQuestion);
exports.questionRouter.get('/questions/:id', middlewares_1.authMiddleware, controllers_1.getQuestion);
