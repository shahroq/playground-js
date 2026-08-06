import { ToolSet } from "ai";
import { timeTool } from "./time.tool";
import { calculatorTool } from "./calculator.tool";
import { productSearchTool } from "./product-search.tool";
import { weatherTool } from "./weather.tool";

const tools = {} as ToolSet;

tools.time = timeTool;
if (true) tools.calculator = calculatorTool;
if (true) tools.productSearch = productSearchTool;
if (true) tools.weather = weatherTool;

// export * from "./time.tool";
export { tools };
