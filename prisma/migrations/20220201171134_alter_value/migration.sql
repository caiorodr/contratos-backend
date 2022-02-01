/*
  Warnings:

  - You are about to alter the column `valor` on the `aditivo` table. The data in that column could be lost. The data in that column will be cast from `Decimal(9,2)` to `Decimal(11,2)`.
  - You are about to alter the column `valor` on the `contrato` table. The data in that column could be lost. The data in that column will be cast from `Decimal(9,2)` to `Decimal(11,2)`.

*/
-- AlterTable
ALTER TABLE `aditivo` MODIFY `valor` DECIMAL(11, 2) NOT NULL,
    MODIFY `docAditivo` VARCHAR(60000) NULL;

-- AlterTable
ALTER TABLE `contrato` MODIFY `valor` DECIMAL(11, 2) NOT NULL,
    MODIFY `docContrato` VARCHAR(60000) NULL;
