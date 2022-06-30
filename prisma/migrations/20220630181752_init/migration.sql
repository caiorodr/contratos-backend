-- CreateTable
CREATE TABLE "CONTRATO" (
    "id" SERIAL NOT NULL,
    "data_inicio" TEXT NOT NULL DEFAULT '20002202',
    "data_fim" TEXT NOT NULL DEFAULT '20002202',
    "natureza" TEXT DEFAULT '',
    "pec" TEXT NOT NULL DEFAULT '',
    "descricao_pec" TEXT NOT NULL DEFAULT '',
    "grupo_cliente" TEXT NOT NULL DEFAULT '',
    "empresa" TEXT NOT NULL DEFAULT '',
    "negocio" TEXT NOT NULL DEFAULT '',
    "seguros" VARCHAR(1200) NOT NULL DEFAULT '',
    "doc_solid" VARCHAR(1200) NOT NULL DEFAULT '',
    "retencao_contrato" TEXT NOT NULL DEFAULT '',
    "faturamento" TEXT NOT NULL DEFAULT '',
    "tipo_faturamento" TEXT NOT NULL DEFAULT '',
    "reajuste1" TEXT NOT NULL DEFAULT '',
    "mes_reajuste1" TEXT NOT NULL DEFAULT '',
    "perc_reajuste1" DECIMAL(15,2),
    "reajuste2" TEXT NOT NULL DEFAULT '',
    "mes_reajuste2" TEXT NOT NULL DEFAULT '',
    "perc_reajuste2" DECIMAL(15,2),
    "reajuste3" TEXT NOT NULL DEFAULT '',
    "mes_reajuste3" TEXT NOT NULL DEFAULT '',
    "perc_reajuste3" DECIMAL(15,2),
    "tipo_ass" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT '',
    "status_pec" INTEGER DEFAULT 0,
    "resumo" TEXT NOT NULL DEFAULT '',
    "lgpd" BOOLEAN NOT NULL DEFAULT false,
    "limite_responsabilidade" BOOLEAN NOT NULL DEFAULT false,
    "valor" DECIMAL(15,2),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "updated_juridico" TIMESTAMP(3),
    "valor_comparar" DECIMAL(15,2),
    "id_reajuste_comparar1" INTEGER NOT NULL DEFAULT 0,
    "reajuste_comparar1" TEXT NOT NULL DEFAULT '',
    "mes_reajuste_comparar1" TEXT NOT NULL DEFAULT '',
    "perc_reajuste_comparar1" DECIMAL(15,2),
    "id_reajuste_comparar2" INTEGER NOT NULL DEFAULT 0,
    "reajuste_comparar2" TEXT NOT NULL DEFAULT '',
    "mes_reajuste_comparar2" TEXT NOT NULL DEFAULT '',
    "perc_reajuste_comparar2" DECIMAL(15,2),
    "id_reajuste_comparar3" INTEGER NOT NULL DEFAULT 0,
    "reajuste_comparar3" TEXT NOT NULL DEFAULT '',
    "mes_reajuste_comparar3" TEXT NOT NULL DEFAULT '',
    "perc_reajuste_comparar3" DECIMAL(15,2),
    "data_inicio_comparar" TEXT NOT NULL DEFAULT '',
    "data_fim_comparar" TEXT NOT NULL DEFAULT '',
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "id_siga" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "CONTRATO_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DADOS_ARQUIVO" (
    "id" SERIAL NOT NULL,
    "original_name" TEXT NOT NULL,
    "media_name" TEXT NOT NULL,
    "content_type" TEXT NOT NULL,
    "size_file" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "contrato_id" INTEGER NOT NULL,

    CONSTRAINT "DADOS_ARQUIVO_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CR_CONTRATO" (
    "id" SERIAL NOT NULL,
    "pec_cr" TEXT,
    "descricao_pec_cr" TEXT,
    "cr" TEXT,
    "descricao_cr" TEXT,
    "regional_cr" TEXT,
    "diretor_cr" TEXT,
    "diretor_exec_cr" TEXT,
    "gerente_reg_cr" TEXT,
    "gerente_cr" TEXT,
    "supervisor_cr" TEXT,
    "valor_cr" DECIMAL(15,2),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "num_contrato_id" INTEGER NOT NULL,

    CONSTRAINT "CR_CONTRATO_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PEC_CONTRATO" (
    "id" SERIAL NOT NULL,
    "pec_cr" TEXT,
    "descricao_pec" TEXT,
    "grupo_cliente_id" TEXT,
    "grupo_cliente" TEXT,
    "data_inicio" TEXT,
    "data_fim" TEXT,
    "negocio_id" TEXT,
    "negocio" TEXT,
    "cr" TEXT,
    "descricao_cr" TEXT,
    "regional_cr" TEXT,
    "diretor_cr" TEXT,
    "diretor_exec_cr" TEXT,
    "gerente_reg_cr" TEXT,
    "gerente_cr" TEXT,
    "supervisor_cr" TEXT,
    "empresa_id" TEXT,
    "mes_reajuste1" TEXT,
    "indice_reajuste1" TEXT,
    "perc_reajuste1" DECIMAL(15,2),
    "mes_reajuste2" TEXT,
    "indice_reajuste2" TEXT,
    "perc_reajuste2" DECIMAL(15,2),
    "mes_reajuste3" TEXT,
    "indice_reajuste3" TEXT,
    "perc_reajuste3" DECIMAL(15,2),
    "empresa" VARCHAR(1200),
    "status" INTEGER,
    "valor_cr" DECIMAL(15,2),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PEC_CONTRATO_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LOG_JOB" (
    "id" SERIAL NOT NULL,
    "info_log" TEXT NOT NULL,
    "data_inicio" TIMESTAMP(3),
    "data_fim" TIMESTAMP(3),

    CONSTRAINT "LOG_JOB_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SEGUROS" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "SEGUROS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DOC_SOLIDARIA" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "DOC_SOLIDARIA_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RETENC_CONTRATUAL" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "RETENC_CONTRATUAL_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TIPO_FATURAMENTO" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "TIPO_FATURAMENTO_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TIPO_ASS" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "TIPO_ASS_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "REAJUSTE" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "REAJUSTE_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DADOS_ARQUIVO" ADD CONSTRAINT "DADOS_ARQUIVO_contrato_id_fkey" FOREIGN KEY ("contrato_id") REFERENCES "CONTRATO"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CR_CONTRATO" ADD CONSTRAINT "CR_CONTRATO_num_contrato_id_fkey" FOREIGN KEY ("num_contrato_id") REFERENCES "CONTRATO"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
