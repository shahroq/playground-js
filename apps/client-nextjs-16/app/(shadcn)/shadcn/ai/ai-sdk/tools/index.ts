import { ToolSet } from "ai";
import { timeTool } from "./time.tool";
import { calculatorTool } from "./calculator.tool";
import { productSearchTool } from "./product-search.tool";

const tools = {} as ToolSet;

tools.time = timeTool;
if (true) tools.calculator = calculatorTool;
if (true) tools.productSearch = productSearchTool;

// export * from "./time.tool";
// export * from "./calculator.tool";
// export * from "./product-search.tool";
export { tools };
