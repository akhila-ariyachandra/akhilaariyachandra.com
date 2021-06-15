/*
  Warnings:

  - The primary key for the `Reactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Changed the type of `type` on the `Reactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ReactionType" AS ENUM ('PlusOne', 'MinusOne', 'Laugh', 'Hooray', 'Confused', 'Heart', 'Rocket', 'Eyes');

-- AlterTable
ALTER TABLE "Reactions"
ALTER COLUMN "type" TYPE "ReactionType" USING "type"::"ReactionType";
