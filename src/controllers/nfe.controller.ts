import { Request, Response } from 'express';
import { buildXmlFromJson } from '../utils/xml';
import { validateXML } from '../utils/xmlValidator';

export const uploadNFe = async (req: Request, res: Response) => {
  const file = req.file;
  if (!file) {
    res.status(400).json({ error: 'Arquivo XML não enviado.' })
    return
    };

    try {
    const parsed = await validateXML(file.buffer.toString());
    res.status(200).json({ message: 'XML recebido com sucesso.', parsed });
  } catch (err) {
    console.error('Erro ao ler XML:', err);
    res.status(500).json({ error: 'Falha ao processar XML.', detail: err });
  }
};

export const generateNFe = async (req: Request, res: Response) => {
  const json = req.body;

  try {
    const xml = buildXmlFromJson(json);
    res.status(200).type('application/xml').send(xml);
  } catch (err) {
    console.error('Erro ao gerar XML:', err);
    res.status(500).json({ error: 'Erro ao gerar XML.', detail: err });
  }
};
