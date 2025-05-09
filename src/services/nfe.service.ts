import { ErrorMessages } from "../constants/errorMessages";
import { SuccessMessages } from "../constants/successMessages";
import { BadRequestError } from "../errors/AppError";
import { saveNFe } from "../repositories/nfe.repository";
import { uploadToS3 } from "../utils/uploadToS3";
import { extractNFeData } from "./nfeParse.service";

export async function processNFeUpload(file: Express.Multer.File) {
  try {
    const s3Path = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/notas-fiscais/${file.originalname}`;
    const parsed = extractNFeData(file.buffer.toString());

    await saveNFe({ ...parsed, xml: s3Path });
    await uploadToS3({
      Bucket: process.env.AWS_S3_BUCKET!,
      Key: `notas-fiscais/${file.originalname}`,
      Body: file.buffer,
      ContentType: "application/xml",
    });

    console.log(SuccessMessages.FILE_UPLOADED);
    return;
  } catch (err: any) {
    throw new BadRequestError(ErrorMessages.FILE_UPLOAD_FAILED, {
      detail: err.message,
      originalError: err,
    });
  }
}
