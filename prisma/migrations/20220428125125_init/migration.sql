/*
  Warnings:

  - You are about to drop the column `gereteneExecutivo` on the `pec_api` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `pec_api` DROP COLUMN `gereteneExecutivo`,
    ADD COLUMN `gerenteExecutivo` VARCHAR(191) NULL;
