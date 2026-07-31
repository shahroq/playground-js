import { google } from "@ai-sdk/google";
// import { openai } from "@ai-sdk/openai";
// import { anthropic } from "@ai-sdk/anthropic";

const googleModel = google("gemini-flash-latest");

const model = googleModel;
console.dir(model, { depth: null });

export { model };
