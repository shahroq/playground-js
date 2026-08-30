import { getModel } from "./models";

const model = getModel();
const prompt = "Capital of UK.";

const main = async () => {
  const result = await model.invoke(prompt);

  console.log(result.content);
};

main().catch(console.error);
