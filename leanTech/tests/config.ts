import {config} from "dotenv";

//load environment variables
config();

export const users = [
    process.env.STANDARD_USER,
    process.env.LOCKED_OUT_USER,
    process.env.PROBLEM_USER,
    process.env.PERFORMANCE_GLITCH_USER,
    process.env.ERROR_USER,
    process.env.VISUAL_USER,
  ]

  // Ensure password is defined

  if (!process.env.PASSWORD) {
    throw new Error("Password is not defined in the Environment Variables (.env file)");
  }

  export const password = process.env.PASSWORD;

  