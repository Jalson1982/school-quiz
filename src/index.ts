import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/index';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import { leaderboardRouter } from './routes/leaderboard';
import { questionRouter } from './routes/question';

export const prisma = new PrismaClient();

const app = express();

// Middlewares
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://127.0.0.1:5505', 'http://127.0.0.1:5501'],
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (_, res) => {
  res.send({ message: 'Hello I am very healthy today :)' });
});

app.use(userRouter);
app.use(leaderboardRouter);
app.use(questionRouter);

export default async (req: any, res: any) => {
  try {
    await prisma.$connect();
    // Pass the incoming request/res to Express
    app(req, res);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).send('Internal Server Error');
  } finally {
    await prisma.$disconnect();
  }
};
