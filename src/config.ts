export const CREDENTIALS = () => process.env.CREDENTIALS === 'true';
export const NODE_ENV = () => process.env.NODE_ENV;
export const PORT = () => process.env.PORT;
export const DB_HOST = () => process.env.DB_HOST;
export const DB_PORT = () => process.env.DB_PORT;
export const DB_USER = () => process.env.DB_USER;
export const DB_PASSWORD = () => process.env.DB_PASSWORD;
export const DB_DATABASE = () => process.env.DB_DATABASE;
export const DB_URL_MONGO = () => process.env.DB_URL_MONGO;
export const DB_NAME_MONGO = () => process.env.DB_NAME_MONGO;
export const OPENAI_KEY = () => process.env.OPENAI_KEY;
export const OPENAI_ASSISTANT_AI = () => process.env.OPENAI_ASSISTANT_AI;
