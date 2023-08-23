/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `Nav` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Nav` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[key]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Nav_key_key` ON `Nav`(`key`);

-- CreateIndex
CREATE UNIQUE INDEX `Nav_name_key` ON `Nav`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Tag_key_key` ON `Tag`(`key`);

-- CreateIndex
CREATE UNIQUE INDEX `Tag_name_key` ON `Tag`(`name`);
