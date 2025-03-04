"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSession = void 0;
const __1 = require("../..");
const createSession = async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).json({ error: "userId is required" });
        }
        const questions = await __1.prisma.$queryRaw `
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
    }
    catch (error) {
        console.error("Error creating session:", error);
        return res.status(500).json({ error: "Failed to create session" });
    }
};
exports.createSession = createSession;
