import { Request, Response } from "express";
import { buildXmlFromJson } from "../utils/xml";
import { validateXML } from "../utils/xmlValidator";
import { processNFeUpload } from "../services/nfe.service";
import { getAllNFes, getNFeById } from "../repositories/nfe.repository";
import { formatErrorMessage } from "../utils/formatErrorMessage";

export const uploadNFe = async (req: Request, res: Response) => {
  const file = req.file;
  if (!file) {
    res.status(400).json({ error: "Arquivo XML não enviado." });
    return;
  }

  try {
    await validateXML(file.buffer.toString());

    await processNFeUpload(file.buffer.toString(), file);
  } catch (err: any) {
    res.status(500).json({
      error: "Falha ao processar XML.",
      detail: err.messages.map((m: string) => formatErrorMessage(m).message),
      originalMessage: err.messages,
    });
  }
};

export const generateNFe = async (req: Request, res: Response) => {
  const json = req.body;

  try {
    const xml = buildXmlFromJson(json);
    res.status(200).type("application/xml").send(xml);
  } catch (err) {
    console.error("Erro ao gerar XML:", err);
    res.status(500).json({ error: "Erro ao gerar XML.", detail: err });
  }
};

export async function listNFes(_: Request, res: Response) {
  try {
    const notas = await getAllNFes();
    res.json(notas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar notas fiscais." });
  }
}

export async function getNFe(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const nota = await getNFeById(id);

    if (!nota) {
      res.status(404).json({ error: "Nota fiscal não encontrada." });
      return;
    }

    res.json(nota);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar a nota fiscal." });
  }
}
