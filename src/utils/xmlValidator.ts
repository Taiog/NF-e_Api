import path from "path";
import xsdValidator from "xsd-schema-validator";
import { BadRequestError } from "../errors/AppError";
import { ErrorMessages } from "../constants/errorMessages";
import { formatErrorMessage } from "./formatErrorMessage";

export async function validateXML(xml: string): Promise<void> {
  const schemaPath = "../../public/schemas/nfe_v4.00.xsd";
  const xsdPath = path.resolve(__dirname, schemaPath);

  let isValid;
  let errorMessages;
  try {
    const { valid, messages } = await xsdValidator.validateXML(xml, xsdPath);
    isValid = valid;
    errorMessages = messages;
  } catch (err: any) {
    throw new BadRequestError(ErrorMessages.XML_PARSE_FAILED, {
      detail: err.messages.map((message: string) => formatErrorMessage(message).message),
      originalMessages: err.messages,
    });
  }
  if (!isValid)
    throw new BadRequestError(
      ErrorMessages.XML_PARSE_FAILED,
      errorMessages?.map((message: string) => formatErrorMessage(message).message),
    );
  return;
}
