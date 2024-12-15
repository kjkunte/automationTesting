import { Page, expect } from "@playwright/test";
import { config } from "dotenv";
import { LoginPage } from "./LoginPage";

config();

const users = [
  process.env.STANDARD_USER,
  process.env.LOCKED_OUT_USER,
  process.env.PROBLEM_USER,
  process.env.PERFORMANCE_GLITCH_USER,
  process.env.ERROR_USER,
  process.env.VISUAL_USER,
];

if (!process.env.PASSWORD) {
  throw new Error("Password is not defined in the Environment Variables (.env file");
}
const password = process.env.PASSWORD

export class IterationLoginTestPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

async tryLogin(users: string[], password: string) {
  const loginPage = new LoginPage(this.page);

  for (const username of users) {
    if (!username) continue;
    console.log(`Test login for user: ${username}`);
    await loginPage.navigate();

    //attempt lgin
    await loginPage.login(username, password);

    // Verify login succes
    try {
      await this.page.waitForURL(/.*inventory\,htmml/, {timeout:300});
      console.log(`Logged in Succesfully ${username}`);
      //call logout after successfully login
      await loginPage.logout();
    } catch{
      console.log(`Login failed for user: ${username}`);
    }
  }
}

}
