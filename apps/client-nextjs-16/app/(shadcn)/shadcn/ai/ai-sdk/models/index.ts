import type { LanguageModel, ModelInfo } from "ai";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { google } from "@ai-sdk/google";
// import { openai } from "@ai-sdk/openai";
// import { anthropic } from "@ai-sdk/anthropic";
import { simulateReadableStream } from "ai";
import { MockLanguageModelV4 } from "ai/test";

export type AIProvider = "google" | "ollama" | "mock" | "openai" | "anthropic";

const MOCK_DUMMY_RESPONSE = "This is a dummy response from the mock model.";

let _model: LanguageModel | null = null;

// --- Env accessors ---
const getProvider = (): AIProvider => {
  const provider = process.env.AI_SDK_PROVIDER as AIProvider | undefined;
  if (!provider) throw new Error("AI_SDK_PROVIDER is not configured.");
  return provider;
};

const getModelId = (): string => {
  const modelId = process.env.AI_SDK_MODEL_ID;
  if (!modelId) throw new Error("AI_SDK_MODEL_ID is not configured.");
  return modelId;
};

export const getModelInfo = (): ModelInfo => {
  const provider = getProvider();
  const modelId = getModelId();

  return { provider, modelId };
};

export const getModel = (): LanguageModel => {
  if (_model) return _model;

  const provider = getProvider();
  const modelId = getModelId();

  let model: LanguageModel;

  switch (provider) {
    case "google":
      model = createGoogleModel(modelId);
      break;

    case "ollama":
      model = createOllamaModel(modelId);
      break;

    case "mock":
      model = createMockModel(modelId);
      break;
    /*
    case "openai":
      model = createOpenAIModel(modelId);
      break;

    case "anthropic":
      model = createAnthropicModel(modelId);
      break;
    */
    default:
      throw new Error(`Unsupported AI provider: ${provider}`);
  }

  console.log(`[AI SDK] Using provider="${provider}" model="${modelId}"`);

  _model = model;
  return model;
};

// --- Provider factories ---
// Mock
const createMockModel = (_modelName: string) => {
  const responseText = process.env.AI_SDK_MOCK_RESPONSE ?? MOCK_DUMMY_RESPONSE;

  const usage = (total: number) => ({
    inputTokens: {
      total,
      noCache: total,
      cacheRead: undefined,
      cacheWrite: undefined,
    },
    outputTokens: { total, text: total, reasoning: undefined },
  });

  const textDeltaChunks = (text: string, id = "text-1") =>
    text.split(" ").map((word, i, arr) => ({
      type: "text-delta" as const,
      id,
      delta: i < arr.length - 1 ? `${word} ` : word,
    }));

  return new MockLanguageModelV4({
    doGenerate: async () => ({
      content: [{ type: "text", text: responseText }],
      finishReason: { unified: "stop", raw: undefined },
      usage: usage(10),
      warnings: [],
    }),

    doStream: async () => ({
      stream: simulateReadableStream({
        initialDelayInMs: 200,
        chunkDelayInMs: 50,
        chunks: [
          { type: "text-start", id: "text-1" },
          ...textDeltaChunks(responseText),
          { type: "text-end", id: "text-1" },
          {
            type: "finish",
            finishReason: { unified: "stop", raw: undefined },
            logprobs: undefined,
            usage: usage(10),
          },
        ],
      }),
    }),
  });
};

// Ollama
const createOllamaModel = (modelName: string) => {
  const ollama = createOpenAICompatible({
    name: "ollama",
    baseURL: process.env.OLLAMA_BASE_URL ?? "http://localhost:11434/v1",
    // Ollama doesn't check this, but the SDK requires a non-empty value
    apiKey: "ollama",
  });

  return ollama(modelName);
};

// Google
const createGoogleModel = (modelName: string) => google(modelName);

// OpenAI
// const createOpenAIModel = (modelName: string) => openai(modelName);

// Anthropic
// const createAnthropicModel = (modelName: string) => anthropic(modelName);

export const getAIModel = () => getModel();
