import { Request, Response } from "express";
import { prisma } from "../..";
export const getLeaderboard = async (req: Request, res: Response) => {
  const { limit = 10 } = req.query;

};
