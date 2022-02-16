-- AlterTable
ALTER TABLE `aditivo` MODIFY `docAditivo` VARCHAR(60000) NULL;

-- AlterTable
ALTER TABLE `contrato` MODIFY `resumo` VARCHAR(191) NULL,
    MODIFY `docContrato` VARCHAR(60000) NULL;
