-- CreateTable
CREATE TABLE `CONTRATO` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dataInicio` VARCHAR(191) NOT NULL,
    `dataFim` VARCHAR(191) NOT NULL,
    `documento` VARCHAR(191) NULL,
    `natureza` VARCHAR(191) NULL DEFAULT '',
    `pec` VARCHAR(191) NOT NULL DEFAULT '',
    `grupoCliente` VARCHAR(191) NOT NULL DEFAULT '',
    `empresa` VARCHAR(1200) NOT NULL DEFAULT '',
    `negocio` VARCHAR(191) NOT NULL DEFAULT '',
    `docSolid` VARCHAR(1200) NULL DEFAULT '',
    `retencaoContrato` VARCHAR(191) NULL DEFAULT '',
    `faturamento` VARCHAR(191) NULL DEFAULT '',
    `seguros` VARCHAR(191) NULL DEFAULT '',
    `reajuste` VARCHAR(191) NOT NULL DEFAULT '',
    `tipoFaturamento` VARCHAR(191) NULL DEFAULT '',
    `mesReajuste` VARCHAR(191) NOT NULL DEFAULT '',
    `tipoAss` VARCHAR(191) NULL DEFAULT '',
    `status` VARCHAR(191) NULL DEFAULT '',
    `resumo` VARCHAR(191) NULL DEFAULT '',
    `lgpd` BOOLEAN NULL DEFAULT false,
    `limiteResponsabilidade` BOOLEAN NULL DEFAULT false,
    `valor` DECIMAL(11, 2) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `updatedJuridico` DATETIME(3) NULL,
    `valorComparar` DECIMAL(11, 2) NULL,
    `reajusteComparar` VARCHAR(191) NULL DEFAULT '',
    `dataInicioComparar` VARCHAR(191) NULL DEFAULT '',
    `dataFimComparar` VARCHAR(191) NULL DEFAULT '',
    `D_E_L_E_T_` VARCHAR(191) NULL DEFAULT '',

    UNIQUE INDEX `CONTRATO_documento_key`(`documento`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DADOS_ARQUIVO` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `originalName` VARCHAR(191) NOT NULL,
    `mediaName` VARCHAR(191) NOT NULL,
    `contentType` VARCHAR(191) NOT NULL,
    `sizeFile` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `contratoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CENTRO_CUSTO` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cr` VARCHAR(191) NOT NULL,
    `descricaoCr` VARCHAR(191) NOT NULL,
    `pecCr` VARCHAR(191) NOT NULL,
    `descricaoPecCr` VARCHAR(191) NOT NULL,
    `regionalCr` VARCHAR(191) NOT NULL,
    `supervisorCr` VARCHAR(191) NOT NULL,
    `gerenteCr` VARCHAR(191) NOT NULL,
    `diretorCr` VARCHAR(191) NOT NULL,
    `diretorExecCr` VARCHAR(191) NOT NULL,
    `gerenteRegCr` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `CENTRO_CUSTO_cr_key`(`cr`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CR_CONTRATO` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pecCr` VARCHAR(191) NULL,
    `descricaoPecCr` VARCHAR(191) NULL,
    `cr` VARCHAR(191) NULL,
    `descricaoCr` VARCHAR(191) NULL,
    `regionalCr` VARCHAR(191) NULL,
    `diretorCr` VARCHAR(191) NULL,
    `diretorExecCr` VARCHAR(191) NULL,
    `gerenteRegCr` VARCHAR(191) NULL,
    `gerenteCr` VARCHAR(191) NULL,
    `supervisorCr` VARCHAR(191) NULL,
    `valorCr` DECIMAL(11, 2) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `numContratoId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PEC_CONTRATO` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pec` VARCHAR(191) NULL,
    `descricaoPec` VARCHAR(191) NULL,
    `grupoClienteId` VARCHAR(191) NULL,
    `grupoCliente` VARCHAR(191) NULL,
    `dataInicio` VARCHAR(191) NULL,
    `dataFim` VARCHAR(191) NULL,
    `negocioId` VARCHAR(191) NULL,
    `negocio` VARCHAR(191) NULL,
    `crReduzido` VARCHAR(191) NULL,
    `descricaoCr` VARCHAR(191) NULL,
    `regional` VARCHAR(191) NULL,
    `diretorRegional` VARCHAR(191) NULL,
    `diretorExecutivo` VARCHAR(191) NULL,
    `gerenteExecutivo` VARCHAR(191) NULL,
    `gerenteRegional` VARCHAR(191) NULL,
    `supervisor` VARCHAR(191) NULL,
    `empresaId` VARCHAR(191) NULL,
    `mesReajuste` VARCHAR(191) NULL,
    `empresa` VARCHAR(1200) NULL,
    `indiceReajuste` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `D_E_L_E_T_` VARCHAR(191) NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PEC_API` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pec` VARCHAR(191) NULL,
    `descricaoPec` VARCHAR(191) NULL,
    `grupoClienteId` VARCHAR(191) NULL,
    `grupoCliente` VARCHAR(191) NULL,
    `dataInicio` VARCHAR(191) NULL,
    `dataFim` VARCHAR(191) NULL,
    `negocioId` VARCHAR(191) NULL,
    `negocio` VARCHAR(191) NULL,
    `crReduzido` VARCHAR(191) NULL,
    `descricaoCr` VARCHAR(191) NULL,
    `regional` VARCHAR(191) NULL,
    `diretorRegional` VARCHAR(191) NULL,
    `diretorExecutivo` VARCHAR(191) NULL,
    `gerenteExecutivo` VARCHAR(191) NULL,
    `gerenteRegional` VARCHAR(191) NULL,
    `supervisor` VARCHAR(191) NULL,
    `empresaId` VARCHAR(191) NULL,
    `mesReajuste` VARCHAR(191) NULL,
    `empresa` VARCHAR(1200) NULL,
    `indiceReajuste` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL,
    `D_E_L_E_T_` VARCHAR(191) NULL DEFAULT '',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LOG_JOB` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `infoLog` LONGTEXT NOT NULL,
    `dataInicio` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataFim` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SEGUROS` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DOC_SOLIDARIA` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RETENC_CONTRATUAL` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DADOS_ARQUIVO` ADD CONSTRAINT `DADOS_ARQUIVO_contratoId_fkey` FOREIGN KEY (`contratoId`) REFERENCES `CONTRATO`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CR_CONTRATO` ADD CONSTRAINT `CR_CONTRATO_numContratoId_fkey` FOREIGN KEY (`numContratoId`) REFERENCES `CONTRATO`(`documento`) ON DELETE RESTRICT ON UPDATE CASCADE;
