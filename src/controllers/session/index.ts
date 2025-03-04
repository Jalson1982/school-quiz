import { prisma } from "../..";
import { Request, Response } from "express";

// Define an interface for the Question type to type the raw query result.
interface QuestionType {
  id: string;
  text: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctOption: string;
  responseTime: number;
}

export const createSession = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }
    
    const questions = await prisma.$queryRaw<QuestionType[]>`
      SELECT * FROM "Question"
      ORDER BY RANDOM()
      LIMIT 1
    `;
    
    if (questions.length === 0) {
      return res.status(404).json({ error: "No questions available" });
    }
    
    const question = questions[0];
    
    // Create a new game session.
    // Do not include totalQuestions since you don't need it.

    

  } catch (error) {
    console.error("Error creating session:", error);
    return res.status(500).json({ error: "Failed to create session" });
  }
};
