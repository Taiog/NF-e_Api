import { Prisma } from "@prisma/client";
import { parseXml } from "libxmljs2";

export function extractNFeData(xmlString: string): Omit<Prisma.NFeCreateInput, "xml"> {
  const xmlDoc = parseXml(xmlString);

  const ns = { nfe: "http://www.portalfiscal.inf.br/nfe" };

  const getText = (path: string) => {
    const fullPath = `//nfe:infNFe/${path
      .split("/")
      .map((segment) => `nfe:${segment}`)
      .join("/")}`;
    const node = xmlDoc.get(fullPath, ns);
    const text = node?.toString();
    const content = text?.match(/>([^<]+)</)?.[1];
    return content;
  };

  return {
    chave: getText("ide/nNF")!,
    emitente: getText("emit/CNPJ")!,
    destinatario: getText("dest/CPF") || getText("dest/CNPJ")!,
    valorTotal: parseFloat(getText("total/ICMSTot/vNF")!),
    dataEmissao: new Date(getText("ide/dhEmi")!),
  };
}
