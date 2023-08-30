/*
  Warnings:

  - You are about to drop the column `profileId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `userInfoId` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `profileId`,
    DROP COLUMN `userInfoId`;
