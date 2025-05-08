import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { Readable } from "stream";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

interface UploadParams {
  Bucket: string;
  Key: string;
  Body: Buffer | Readable;
  ContentType: string;
}

export async function uploadToS3(params: UploadParams): Promise<string> {
  const command = new PutObjectCommand(params);
  await s3.send(command);

  return `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
}
