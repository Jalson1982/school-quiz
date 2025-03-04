import express from 'express';
import { getLeaderboard } from '../../controllers';
import { authMiddleware } from '../../middlewares';

export const leaderboardRouter = express.Router();

leaderboardRouter.get('/leaderboard', authMiddleware, getLeaderboard);
