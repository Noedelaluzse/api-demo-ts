import fs from 'fs';
import { CustomError } from '../../domain/dtos/errors/custom.error';
import path from "path";

type OptionsTemplate = {
  [key: string]: string;
}

export const Utils = {

  getTemplate : (html: string,) => {
    // contruir el path del archivo
    const filePath = path.join(__dirname, `../../domain/templates/${html}`)
    // leer el archivo
    const template = fs.readFileSync(filePath, 'utf8');

    if (!template) {
      throw CustomError.internalServer('Template not found');
    } 
    return template;
  },
  replaceParams: (htmlTemplate: string, obj: OptionsTemplate) => {
    const htmlReplaced = htmlTemplate.replace(/\[(\w+)\]/g, (_, key: string) => obj[key.toLowerCase()] || '');
    return htmlReplaced;
  }

} 