import fs from "fs";

export const createComponentFile = async (
  componentPath: string[],
  componentName: string,
  src: string,
  dest: string
) => {
  const text = await fs.promises.readFile(src, "utf8");
  fs.promises.writeFile(
    dest,
    text
      .replace(/{{{NAME}}}/g, componentName)
      .replace(
        /{{{PATH}}}/g,
        componentPath.length ? componentPath.join("/") + "/" : ""
      ),
    "utf8"
  );
  console.log("output: %s", dest);
};
