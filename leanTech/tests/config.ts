import {config} from "dotenv";

//load environment variables
config();

export const users: string[] = [
    process.env.user1 || "",
    process.env.user2 || "",
    process.env.user3 ||"",
    process.env.user4 || "",
    process.env.user5 || "",
    process.env.user6 || "",
  ];

  // to ensure password is defined

  if (!process.env.PASSWORD) {
    throw new Error("Password is not defined in the (.env file)");
  }

  export const password = process.env.PASSWORD;

