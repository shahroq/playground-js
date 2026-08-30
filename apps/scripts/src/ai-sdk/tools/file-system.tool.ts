import { tool } from "ai";
import { z } from "zod";
import { fsUtils } from "@jsp/shared/utils-server";

const writeFile = tool({
  description: "Write to a file",
  inputSchema: z.object({
    path: z.string().describe("The path to the file to create"),
    content: z.string().describe("The content of the file to create"),
  }),
  execute: async ({ path, content }) => {
    return fsUtils.writeFile(path, content);
  },
});

const readFile = tool({
  description: "Read a file",
  inputSchema: z.object({
    path: z.string().describe("The path to the file to read"),
  }),
  execute: async ({ path }) => {
    return fsUtils.readFile(path);
  },
});
const deletePath = tool({
  description: "Delete a file or directory",
  inputSchema: z.object({
    path: z.string().describe("The path to the file or directory to delete"),
  }),
  execute: async ({ path }) => {
    return fsUtils.deletePath(path);
  },
});
const listDirectory = tool({
  description: "List a directory",
  inputSchema: z.object({
    path: z.string().describe("The path to the directory to list"),
  }),
  execute: async ({ path }) => {
    return fsUtils.listDirectory(path);
  },
});
const createDirectory = tool({
  description: "Create a directory",
  inputSchema: z.object({
    path: z.string().describe("The path to the directory to create"),
  }),
  execute: async ({ path }) => {
    return fsUtils.createDirectory(path);
  },
});
const exists = tool({
  description: "Check if a file or directory exists",
  inputSchema: z.object({
    path: z.string().describe("The path to the file or directory to check"),
  }),
  execute: async ({ path }) => {
    return fsUtils.exists(path);
  },
});
const searchFiles = tool({
  description: "Search for files",
  inputSchema: z.object({
    pattern: z.string().describe("The pattern to search for"),
  }),
  execute: async ({ pattern }) => {
    return fsUtils.searchFiles(pattern);
  },
});

export const fsTools = {
  writeFile,
  readFile,
  deletePath,
  listDirectory,
  createDirectory,
  exists,
  searchFiles,
};
