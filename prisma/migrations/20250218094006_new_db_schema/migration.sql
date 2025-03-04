-- CreateEnum
CREATE TYPE "GameStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "GameSession" ADD COLUMN     "status" "GameStatus" NOT NULL DEFAULT 'ACTIVE';
