/*
  Warnings:

  - Added the required column `totalQuestions` to the `GameSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Leaderboard` table without a default value. This is not possible if the table is not empty.
  - Added the required column `questionOrder` to the `UserAnswer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Leaderboard" DROP CONSTRAINT "Leaderboard_userId_fkey";

-- AlterTable
ALTER TABLE "GameSession" ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "currentQuestion" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalQuestions" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Leaderboard" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "UserAnswer" ADD COLUMN     "questionOrder" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "GameSessionQuestion" (
    "id" TEXT NOT NULL,
    "gameSessionId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GameSessionQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GameSessionQuestion_gameSessionId_idx" ON "GameSessionQuestion"("gameSessionId");

-- CreateIndex
CREATE UNIQUE INDEX "GameSessionQuestion_gameSessionId_order_key" ON "GameSessionQuestion"("gameSessionId", "order");

-- CreateIndex
CREATE INDEX "GameSession_userId_idx" ON "GameSession"("userId");

-- CreateIndex
CREATE INDEX "Leaderboard_highScore_idx" ON "Leaderboard"("highScore");

-- CreateIndex
CREATE INDEX "Question_createdAt_idx" ON "Question"("createdAt");

-- CreateIndex
CREATE INDEX "UserAnswer_gameSessionId_idx" ON "UserAnswer"("gameSessionId");

-- CreateIndex
CREATE INDEX "UserAnswer_questionId_idx" ON "UserAnswer"("questionId");

-- AddForeignKey
ALTER TABLE "GameSessionQuestion" ADD CONSTRAINT "GameSessionQuestion_gameSessionId_fkey" FOREIGN KEY ("gameSessionId") REFERENCES "GameSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameSessionQuestion" ADD CONSTRAINT "GameSessionQuestion_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leaderboard" ADD CONSTRAINT "Leaderboard_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
