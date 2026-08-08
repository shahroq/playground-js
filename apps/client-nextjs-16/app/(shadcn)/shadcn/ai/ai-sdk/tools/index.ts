import { ToolSet } from "ai";
import { timeTool } from "./time.tool";
import { calculatorTool } from "./calculator.tool";
import { productSearchTool } from "./product-search.tool";
import { weatherTool } from "./weather";
import { fsTools } from "./file-system.tool";

const allTools = {
  time: timeTool,
  calculator: calculatorTool,
  productSearch: productSearchTool,
  weather: weatherTool,
  fsWriteFile: fsTools.writeFile,
  fsReadFile: fsTools.readFile,
  fsDeletePath: fsTools.deletePath,
  fsListDirectory: fsTools.listDirectory,
  fsCreateDirectory: fsTools.createDirectory,
  fsExists: fsTools.exists,
  fsSearchFiles: fsTools.searchFiles,
} satisfies ToolSet;

type ToolName = keyof typeof allTools;

/**
 * Returns a subset of the tool registry by name.
 * Call with no args (or omit) to get every tool.
 */
function getTools<TName extends ToolName>(
  names?: readonly TName[],
): Pick<typeof allTools, TName> {
  if (!names || names.length === 0) {
    return allTools as Pick<typeof allTools, TName>;
  }

  return names.reduce(
    (acc, name) => {
      acc[name] = allTools[name];
      return acc;
    },
    {} as Pick<typeof allTools, TName>,
  );
}

export { getTools, allTools };
export type { ToolName };
