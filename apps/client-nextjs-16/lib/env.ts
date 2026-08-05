export const isDev = process.env.NODE_ENV === "development";
export const isProd = process.env.NODE_ENV === "production";
export const isTest = process.env.NODE_ENV === "test";

export const debug = process.env.DEBUG === "true";
export const logFile = process.env.DEBUG_FILE_LOG === "true";
export const logFileMethod = process.env.DEBUG_FILE_LOG_METHOD;
