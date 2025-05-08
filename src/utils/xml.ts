import { parseStringPromise, Builder } from "xml2js";
import { NFeInput } from "../types/nfe";

export const parseXmlBuffer = async (buffer: Buffer) => {
  return parseStringPromise(buffer.toString());
};

export const buildXmlFromJson = (data: NFeInput) => {
  const builder = new Builder({ headless: true, rootName: "NFe" });
  return builder.buildObject(data);
};
