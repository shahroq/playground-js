import { ChatOllama } from "@langchain/ollama";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import type { BaseChatModel } from "@langchain/core/language_models/chat_models";

type ToolCallingChatModel = BaseChatModel & {
  bindTools: NonNullable<BaseChatModel["bindTools"]>;
};

let _model: BaseChatModel | null = null;

// --- Env accessors ---
const getProvider = (): string => {
  const provider = process.env.LANGCHAIN_PROVIDER;
  if (!provider) throw new Error("LANGCHAIN_PROVIDER is not configured.");
  return provider;
};

const getModelId = (): string => {
  const modelId = process.env.LANGCHAIN_MODEL_ID;
  if (!modelId) throw new Error("LANGCHAIN_MODEL_ID is not configured.");
  return modelId;
};

export const getModelInfo = () => {
  const provider = getProvider();
  const modelId = getModelId();

  return { provider, modelId };
};

export const getModel = (): BaseChatModel => {
  if (_model) return _model;

  const provider = getProvider();
  const modelId = getModelId();

  let model: BaseChatModel;

  switch (provider) {
    case "google":
      model = new ChatGoogleGenerativeAI({
        model: modelId,
        temperature: 0,
        maxRetries: 2,
        apiKey: process.env.GOOGLE_API_KEY,
      });
      break;

    case "ollama":
      model = new ChatOllama({
        model: modelId,
        temperature: 0,
        maxRetries: 2,
        baseUrl: "http://localhost:11434",
      });
      break;

    default:
      throw new Error(`Unsupported AI provider: ${provider}`);
  }

  console.log(`[LANGCHAIN] Using provider="${provider}" model="${modelId}"`);

  _model = model;
  return model;
};

export const getAIModel = () => getModel();
