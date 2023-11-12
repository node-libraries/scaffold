import fs from "fs";
import path from "path";

export const createComponentFile = async (
  componentPath: string[],
  componentName: string,
  src: string,
  dest: string,
) => {
  const text = /^https:/.test(src)
    ? await fetch(src).then((v) => v.text())
    : await fs.promises.readFile(src, "utf8");
  const targetDir = path.dirname(dest);
  await fs.promises
    .mkdir(targetDir, { recursive: true })
    .catch(() => undefined);
  fs.promises.writeFile(
    dest,
    text
      .replace(/{{{NAME}}}/g, componentName)
      .replace(
        /{{{PATH}}}/g,
        componentPath.length ? componentPath.join("/") + "/" : "",
      ),
    "utf8",
  );
  console.log("output: %s", dest);
};
