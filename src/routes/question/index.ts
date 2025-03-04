import express from 'express';
import { getQuestion, createQuestion, getQuestions } from '../../controllers';
import { authMiddleware } from '../../middlewares';

export const questionRouter = express.Router();

questionRouter.get('/questions', authMiddleware, getQuestions);
questionRouter.post('/questions', createQuestion);
questionRouter.get('/questions/:id', authMiddleware, getQuestion);
