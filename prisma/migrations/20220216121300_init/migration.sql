-- CreateTable
CREATE TABLE `Contrato` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `diretor` VARCHAR(1200) NOT NULL,
    `gerente` VARCHAR(1200) NOT NULL,
    `supervisor` VARCHAR(1200) NOT NULL,
    `cr` VARCHAR(1200) NOT NULL,
    `dataInicio` VARCHAR(191) NOT NULL,
    `dataFim` VARCHAR(191) NOT NULL,
    `documento` VARCHAR(191) NOT NULL,
    `natureza` VARCHAR(191) NOT NULL,
    `grupoCliente` VARCHAR(191) NOT NULL,
    `empresa` VARCHAR(1200) NOT NULL,
    `negocio` VARCHAR(191) NOT NULL,
    `docSolid` VARCHAR(1200) NOT NULL,
    `retencaoContrato` VARCHAR(191) NOT NULL,
    `faturamento` VARCHAR(191) NOT NULL,
    `seguros` VARCHAR(191) NOT NULL,
    `reajuste` VARCHAR(191) NOT NULL,
    `dataReajuste` VARCHAR(191) NOT NULL,
    `tipoAss` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `chamado` VARCHAR(191) NOT NULL,
    `resumo` VARCHAR(191) NOT NULL,
    `lgpd` BOOLEAN NOT NULL,
    `limiteResponsabilidade` BOOLEAN NOT NULL,
    `valor` DECIMAL(11, 2) NOT NULL,
    `docContrato` VARCHAR(60000) NULL,
    `D_E_L_E_T_` VARCHAR(191) NULL DEFAULT '',

    UNIQUE INDEX `Contrato_documento_key`(`documento`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Aditivo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `diretor` VARCHAR(191) NOT NULL,
    `gerente` VARCHAR(191) NOT NULL,
    `supervisor` VARCHAR(191) NOT NULL,
    `cr` VARCHAR(191) NOT NULL,
    `dataInicio` VARCHAR(191) NOT NULL,
    `dataFim` VARCHAR(191) NOT NULL,
    `natureza` VARCHAR(191) NOT NULL,
    `grupoCliente` VARCHAR(191) NOT NULL,
    `empresa` VARCHAR(191) NOT NULL,
    `negocio` VARCHAR(191) NOT NULL,
    `docSolid` VARCHAR(191) NOT NULL,
    `retencaoContrato` VARCHAR(191) NOT NULL,
    `faturamento` VARCHAR(191) NOT NULL,
    `reajuste` VARCHAR(191) NOT NULL,
    `dataReajuste` VARCHAR(191) NOT NULL,
    `tipoAss` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `lgpd` BOOLEAN NOT NULL,
    `limiteResponsabilidade` BOOLEAN NOT NULL,
    `valor` DECIMAL(11, 2) NOT NULL,
    `docAditivo` VARCHAR(60000) NULL,
    `numDocumento` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Aditivo` ADD CONSTRAINT `Aditivo_numDocumento_fkey` FOREIGN KEY (`numDocumento`) REFERENCES `Contrato`(`documento`) ON DELETE RESTRICT ON UPDATE CASCADE;
