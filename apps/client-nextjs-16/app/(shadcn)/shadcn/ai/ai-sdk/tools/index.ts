import { ToolSet } from "ai";
import { timeTool } from "./time.tool";
import { calculatorTool } from "./calculator.tool";
import { productSearchTool } from "./product-search.tool";
import { weatherTool } from "./weather";
import { fsTools } from "./file-system.tool";

const tools = {} as ToolSet;

tools.time = timeTool;
if (0) tools.calculator = calculatorTool;
if (0) tools.productSearch = productSearchTool;
if (0) tools.weather = weatherTool;
// if (true) Object.assign(tools, fsTools);
if (1) {
  tools.fsWriteFile = fsTools.writeFile;
  tools.fsReadFile = fsTools.readFile;
  tools.fsDeletePath = fsTools.deletePath;
  tools.fsListDirectory = fsTools.listDirectory;
  tools.fsCreateDirectory = fsTools.createDirectory;
  tools.fsExists = fsTools.exists;
  tools.fsSearchFiles = fsTools.searchFiles;
}

// export * from "./time.tool";
export { tools };
