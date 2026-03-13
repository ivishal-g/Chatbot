import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import {
  customProvider,
  extractReasoningMiddleware,
  wrapLanguageModel,
} from "ai";
import { isTestEnvironment } from "../constants";

const THINKING_SUFFIX_REGEX = /-thinking$/;

// Create provider instances
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

const xai = createOpenAI({
  apiKey: process.env.XAI_API_KEY,
  baseURL: "https://api.x.ai/v1",
});

export const myProvider = isTestEnvironment
  ? (() => {
      const {
        artifactModel,
        chatModel,
        reasoningModel,
        titleModel,
      } = require("./models.mock");
      return customProvider({
        languageModels: {
          "chat-model": chatModel,
          "chat-model-reasoning": reasoningModel,
          "title-model": titleModel,
          "artifact-model": artifactModel,
        },
      });
    })()
  : null;

export function getLanguageModel(modelId: string) {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel(modelId);
  }

  // Handle X AI models
  if (modelId.startsWith("xai/")) {
    return xai(modelId);
  }

  // Handle OpenAI models
  if (modelId.startsWith("gpt-") || modelId.startsWith("o1-")) {
    return openai(modelId);
  }

  // Handle Anthropic models
  if (modelId.startsWith("claude-")) {
    return anthropic(modelId);
  }

  // Handle Google models
  if (modelId.startsWith("gemini-")) {
    return google(modelId);
  }

  const isReasoningModel =
    modelId.endsWith("-thinking") ||
    (modelId.includes("reasoning") && !modelId.includes("non-reasoning"));

  if (isReasoningModel) {
    const baseModelId = modelId.replace(THINKING_SUFFIX_REGEX, "");

    // Return reasoning model based on provider
    if (baseModelId.startsWith("gpt-") || baseModelId.startsWith("o1-")) {
      return wrapLanguageModel({
        model: openai(baseModelId),
        middleware: extractReasoningMiddleware({ tagName: "thinking" }),
      });
    }
    if (baseModelId.startsWith("claude-")) {
      return wrapLanguageModel({
        model: anthropic(baseModelId),
        middleware: extractReasoningMiddleware({ tagName: "thinking" }),
      });
    }
  }

  throw new Error(`Unsupported model: ${modelId}`);
}

export function getTitleModel() {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel("title-model");
  }
  return google("gemini-2.5-flash-lite");
}

export function getArtifactModel() {
  if (isTestEnvironment && myProvider) {
    return myProvider.languageModel("artifact-model");
  }
  return anthropic("claude-haiku-4.5");
}
