/*
  Warnings:

  - Added the required column `sizeFile` to the `DADOS_ARQUIVO` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `DADOS_ARQUIVO` ADD COLUMN `sizeFile` INTEGER NOT NULL;
