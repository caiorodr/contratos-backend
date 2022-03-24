/*
  Warnings:

  - You are about to drop the column `dataReajuste` on the `CONTRATO` table. All the data in the column will be lost.
  - Added the required column `mesReajuste` to the `CONTRATO` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CONTRATO` DROP COLUMN `dataReajuste`,
    ADD COLUMN `mesReajuste` VARCHAR(191) NOT NULL;
