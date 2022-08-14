import fs from "fs";
import path from "path";

//ディレクトリ作成
export const createComponentDir = (
  targetPath: string,
  componentName: string
) => {
  const p = path
    .resolve(targetPath, componentName)
    .replace(/\\/g, "/")
    .split("/");
  p.reduce((a, b) => {
    const p = `${a}/${b}`;
    try {
      fs.statSync(p);
    } catch (e) {
      fs.mkdirSync(p);
    }
    return p;
  });
};
