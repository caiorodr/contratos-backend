-- AlterTable
ALTER TABLE `aditivo` MODIFY `docAditivo` VARCHAR(60000) NULL;

-- AlterTable
ALTER TABLE `contrato` MODIFY `diretor` VARCHAR(1200) NOT NULL,
    MODIFY `gerente` VARCHAR(1200) NOT NULL,
    MODIFY `supervisor` VARCHAR(1200) NOT NULL,
    MODIFY `cr` VARCHAR(1200) NOT NULL,
    MODIFY `empresa` VARCHAR(1200) NOT NULL,
    MODIFY `docSolid` VARCHAR(1200) NOT NULL,
    MODIFY `docContrato` VARCHAR(60000) NULL;
