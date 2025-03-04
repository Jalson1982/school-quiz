import express from 'express';
import cors from 'cors';
import { userRouter } from './routes/index';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';
import { leaderboardRouter } from './routes/leaderboard';
import { questionRouter } from './routes/question';
export const prisma = new PrismaClient();

const app = express();

// Enable CORS for all origins (or specify allowed origins)
app.use(cors({
  origin: ['http://127.0.0.1:5500', 'http://127.0.0.1:5505', 'http://127.0.0.1:5501'],
}));

app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

async function main() {
  app.get('/', (_, res) => {
    res.send({ message: 'Hello I am very healthy today :)' });
  });

  const routes = [userRouter, leaderboardRouter, questionRouter];

  routes.forEach((router) => {
    app.use(router);
  });

  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
