-- AlterTable
ALTER TABLE `CONTRATO` MODIFY `documento` VARCHAR(191) NULL,
    MODIFY `natureza` VARCHAR(191) NULL DEFAULT '',
    MODIFY `docSolid` VARCHAR(1200) NULL,
    MODIFY `retencaoContrato` VARCHAR(191) NULL,
    MODIFY `faturamento` VARCHAR(191) NULL,
    MODIFY `seguros` VARCHAR(191) NULL,
    MODIFY `tipoAss` VARCHAR(191) NULL,
    MODIFY `status` VARCHAR(191) NULL,
    MODIFY `lgpd` BOOLEAN NULL,
    MODIFY `limiteResponsabilidade` BOOLEAN NULL;
