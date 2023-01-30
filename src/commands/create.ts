import path from "path";
import { Argument, Option, program } from "commander";
import { getGitHubFileList } from "github-files";
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

  if (/^https:\/\/github.com\//.test(templatePath)) {
    getGitHubFileList(templatePath).then((files) => {
      const templates = files?.filter((file) =>
        /\.template$/.test(file.relativePath)
      );
      templates?.forEach(({ url, relativePath }) =>
        createComponentFile(
          componentPath,
          componentName,
          url,
          path.resolve(
            targetPath,
            componentName,
            relativePath
              .replace(/\.template$/, "")
              .replace(/{{{NAME}}}/, componentName)
          )
        )
      );
    });
  } else {
    //テンプレートからファイルの作成
    getTemplates(templatePath)
      .filter((file) => /\.template$/.test(file))
      .forEach((template) => {
        createComponentFile(
          componentPath,
          componentName,
          path.resolve(templatePath, template),
          path.resolve(
            targetPath,
            componentName,
            template
              .replace(/\.template$/, "")
              .replace(/{{{NAME}}}/, componentName)
          )
        );
      });
  }
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
