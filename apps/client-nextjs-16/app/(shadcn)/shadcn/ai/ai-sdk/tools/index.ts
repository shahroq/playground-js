import { ToolSet } from "ai";
import { timeTool } from "./time.tool";
import { calculatorTool } from "./calculator.tool";
import { productSearchTool } from "./product-search.tool";
import { weatherTool } from "./weather";
import { fsTools } from "./file-system.tool";

const tools = {
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

export { tools };
