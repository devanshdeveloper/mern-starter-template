import { connect } from "mongoose";
import { mongoURI } from "../constansts/env";
import logger from "../utils/logger";

let isConnected = false;

const connectDatabase = async () => {
  if (isConnected) return;
  try {
    await connect(mongoURI);
    isConnected = true;
    logger.info("💽 Succesfully connected to Database");
    logger.info("Databse URL : " + mongoURI);
  } catch (error) {
    logger.error(error);
    logger.error("🌋 Error connecting to Database");
  }
};

export { connectDatabase };
