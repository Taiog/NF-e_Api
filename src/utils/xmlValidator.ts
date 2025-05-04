import libxmljs from 'libxmljs2';
import fs from 'fs';
import path from 'path';

export async function validateXML(xml: string): Promise<{ valid: boolean; errors?: string[] }> {
  try {
    const xsdPath = path.resolve(__dirname, '../../public/schemas/NFe_v4.00.xsd');
    const xsdContent = fs.readFileSync(xsdPath, 'utf8');

    const xmlDoc = libxmljs.parseXml(xml);
    const xsdDoc = libxmljs.parseXml(xsdContent);

    const valid = xmlDoc.validate(xsdDoc);

    const errors = xmlDoc.validationErrors.map(e => e.message);

    return { valid, errors };
  } catch (err) {
    console.log(err)
    return { valid: false, errors: ['Erro ao validar o XML'] };
  }
}
