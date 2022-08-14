import path from "path";
import { Argument, Option, program } from "commander";
import { createComponentDir } from "../libs/createComponentDir";
import { createComponentFile } from "../libs/createComponentFile";
import { getTemplates } from "../libs/getTemplates";

const proc = (
  name: string,
  {
    templatePath: templatePathSrc,
    outputPath: outputPathSrc,
  }: { templatePath?: string; outputPath?: string }
) => {
  const templatePath = templatePathSrc || "./templates";
  const outputPath = outputPathSrc || "./src/components";
  const componentPath = name.split("/");
  const componentName = componentPath.pop()!;
  const targetPath = path.resolve(outputPath, ...componentPath);
  createComponentDir(targetPath, componentName);

  //テンプレートからファイルの作成
  getTemplates(templatePath).forEach((template) =>
    createComponentFile(
      componentPath,
      componentName!,
      path.resolve(templatePath, `${template}.template`),
      path.resolve(
        targetPath,
        componentName!,
        template.replace(/{{{NAME}}}/, componentName!)
      )
    )
  );
};

export const create = program
  .createCommand("create")
  .description("Create component")
  .addArgument(new Argument("name", "ComponentName `PATH/NAME` "))
  .addOption(
    new Option(
      "-t, --templatePath <templatePath>",
      "TemplatePath (default:./templates)"
    )
  )
  .addOption(
    new Option(
      "-o, --outputPath <outputPath>",
      "OutputPath (default:./src/components)"
    )
  )
  .action(proc);
