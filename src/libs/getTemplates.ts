import fs from "fs";
import path from "path";

export const getTemplates = (templatePath: string): string[] => {
  const files = fs.readdirSync(templatePath);
  return files.flatMap((file) => {
    const filePath = path.join(templatePath, file);
    return fs.statSync(filePath).isDirectory()
      ? getTemplates(filePath).map((children) => path.join(file, children))
      : file;
  });
};
