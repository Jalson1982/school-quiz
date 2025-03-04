"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaderboardRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../../controllers");
const middlewares_1 = require("../../middlewares");
exports.leaderboardRouter = express_1.default.Router();
exports.leaderboardRouter.get('/leaderboard', middlewares_1.authMiddleware, controllers_1.getLeaderboard);
