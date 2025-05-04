-- CreateTable
CREATE TABLE "NFe" (
    "id" TEXT NOT NULL,
    "chave" TEXT NOT NULL,
    "emitente" TEXT NOT NULL,
    "destinatario" TEXT NOT NULL,
    "dataEmissao" TIMESTAMP(3) NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "xml" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NFe_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NFe_chave_key" ON "NFe"("chave");
