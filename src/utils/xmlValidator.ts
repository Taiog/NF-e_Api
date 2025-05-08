import path from "path";
import xsdValidator from "xsd-schema-validator";

export async function validateXML(xml: string): Promise<{ valid: boolean; errors?: string[] }> {
  const schemaPath = "../../public/schemas/nfe_v4.00.xsd";
  const xsdPath = path.resolve(__dirname, schemaPath);

  await xsdValidator.validateXML(xml, xsdPath);

  return { valid: true };
}
