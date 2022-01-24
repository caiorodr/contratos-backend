-- AlterTable
ALTER TABLE `aditivo` MODIFY `docAditivo` VARCHAR(60000) NULL;

-- AlterTable
ALTER TABLE `contrato` ADD COLUMN `D_E_L_E_T_` VARCHAR(191) NULL DEFAULT '',
    MODIFY `docContrato` VARCHAR(60000) NULL;
