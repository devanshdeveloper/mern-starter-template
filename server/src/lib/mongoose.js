import { connect } from "mongoose";
import { mongoURI } from "../constansts/env";

let isConnected = false;

const connectDatabase = async () => {
  if (isConnected) return;
  try {
    await connect(mongoURI);
    isConnected = true;
    console.log("💽 Succesfully connected to Database");
    console.log("Databse URL : " + mongoURI);
  } catch (error) {
    console.log(error);

    console.error("🌋 Error connecting to Database");
  }
};

export { connectDatabase };
