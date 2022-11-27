import mongoose from "mongoose";

import { delay } from "../../../shared/functions";

const uri = String(process.env.DATABASE_URL);

async function connect() {
  let retries = 1;
  const maxRetries = Number(process.env.CONNECTION_RETRIES);

  while (retries <= maxRetries) {
    try {
      await mongoose.connect(uri);
      console.log("[Database]: Successfully connected to Database");
      break;
    } catch (error) {
      console.error("[Database]: Error connecting to Database");
      console.log(`[Database]: Connection attempt ${retries}`);

      if (retries === maxRetries) {
        throw new Error("Failed to connect to Database");
      }

      retries++;
      await delay(Number(process.env.CONNECTION_RETRIES_DELAY));
    }
  }
}

async function disconnect() {
  try {
    await mongoose.disconnect();
    console.log("[Database]: Successfully disconnected from Database");
  } catch (error) {
    console.error("[Database]: Error disconnecting from Database");
  }
}

export const database = { connect, disconnect };
