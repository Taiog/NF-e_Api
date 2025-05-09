import { NextFunction, Request, Response } from "express";
import { buildXmlFromJson } from "../utils/xml";
import { validateXML } from "../utils/xmlValidator";
import { processNFeUpload } from "../services/nfe.service";
import { deleteNFeById, getAllNFes, getNFeById } from "../repositories/nfe.repository";
import { ErrorMessages } from "../constants/errorMessages";
import { SuccessMessages } from "../constants/successMessages";
import { HttpStatus } from "../constants/httpStatus";
import { NotFoundError } from "../errors/AppError";

export const uploadNFe = async (req: Request, res: Response, next: NextFunction) => {
  const file = req.file;
  if (!file) {
    res.status(HttpStatus.BAD_REQUEST).json({ error: ErrorMessages.XML_NOT_SENT });
    return;
  }

  try {
    await validateXML(file.buffer.toString());

    await processNFeUpload(file);
    res.status(HttpStatus.OK).json(SuccessMessages.FILE_UPLOADED);
  } catch (err) {
    next(err);
  }
};

export const generateNFe = async (req: Request, res: Response, next: NextFunction) => {
  const json = req.body;

  try {
    const xml = buildXmlFromJson(json);
    res.status(HttpStatus.OK).type("application/xml").send(xml);
  } catch (err) {
    next(err);
  }
};

export async function listNFes(_: Request, res: Response, next: NextFunction) {
  try {
    const nFes = await getAllNFes();
    res.json(nFes);
  } catch (err) {
    next(err);
  }
}

export async function getNFe(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const nFe = await getNFeById(id);

    if (!nFe) {
      throw new NotFoundError(ErrorMessages.NFE_NOT_FOUND);
    }

    res.json(nFe);
  } catch (err) {
    next(err);
  }
}

export async function deleteNFe(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  try {
    const nFe = await getNFeById(id);

    if (!nFe) {
      throw new NotFoundError(ErrorMessages.NFE_NOT_FOUND);
    }

    await deleteNFeById(id);

    res.status(200).json({ message: SuccessMessages.NFE_DELETED });
  } catch (err) {
    next(err);
  }
}
