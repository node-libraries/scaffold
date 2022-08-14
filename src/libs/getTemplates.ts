import fs from "fs";
import path from "path";

export const getTemplates = (templatePath: string) => {
  const files = fs.readdirSync(templatePath);
  return files
    .filter(
      (file) =>
        /\.template$/.test(file) &&
        !fs.statSync(path.resolve(templatePath, file)).isDirectory()
    )
    .map((file) => file.replace(/\.template$/, ""));
};
