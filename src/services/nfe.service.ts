import { saveNFe } from "../repositories/nfe.repository";
import { uploadToS3 } from "../utils/uploadToS3";
import { extractNFeData } from "./nfeParse.service";

export async function processNFeUpload(xml: string, file: Express.Multer.File) {
    const parsed = extractNFeData(xml);
    
    const s3Path = await uploadToS3({
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: `notas-fiscais/${file.originalname}`,
        Body: file.buffer,
        ContentType: 'application/xml'
    });

    await saveNFe({ ...parsed, xml: s3Path });
    return console.log('Nota fiscal salva com sucesso!')
  }