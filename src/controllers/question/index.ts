import { Request, Response } from "express";
import { prisma } from "../..";

export const getQuestions = async (_: Request, res: Response) => {
  const question = {
    id: "1",
    text: "What is the capital of France?",
    optionA: "Paris",
    optionB: "London",
    optionC: "Berlin",
    optionD: "Madrid",
    correctOption: "A",
    responseTime: 10,
  };
  res.send({
    question,
  });
};

export const getQuestion = async (req: Request, res: Response) => {
  const { id } = req.params;
  const question = await prisma.question.findUnique({ where: { id } });
  res.send({
    question,
  });
};

export const createQuestion = async (req: Request, res: Response) => {
  const { optionA, optionB, optionC, optionD, correctOption, responseTime, text } =
    req.body;
  const newQuestion = await prisma.question.create({
    data: { optionA, optionB, optionC, optionD, correctOption, responseTime, text },
  });
  res.send({
    newQuestion,
  });
};
