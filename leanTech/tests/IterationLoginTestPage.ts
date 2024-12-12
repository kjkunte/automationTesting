import { Page, expect } from "@playwright/test";
import { config } from "dotenv";

config();

const users = [
  process.env.STANDARD_USER,
  process.env.LOCKED_OUT_USER,
  process.env.PROBLEM_USER,
  process.env.PERFORMANCE_GLITCH_USER,
  process.env.ERROR_USER,
  process.env.VISUAL_USER,
];
const password = process.env.PASSWORD || "secret_sauce";

export class IterationLoginTestPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async findValidCredentials(): Promise<{ validUsername: string; password: string }> {
    for (const username of users) {
      if (!username) continue; // Skip empty usernames

      console.log(`Testing login for user: ${username}`);
      await this.page.goto("https://www.saucedemo.com/");

      // Attempt login
      await this.page.fill('[data-test="username"]', username);
      await this.page.fill('[data-test="password"]', password);
      await this.page.click('[data-test="login-button"]');

      // Check if login is successful
      try {
        await expect(this.page).toHaveURL(/.*inventory\.html/, { timeout: 3000 });
        console.log(`Valid login found for user: ${username}`);
        return { validUsername: username, password }; // Return on first success
      } catch {
        console.log(`Login failed for user: ${username}`);
      }
    }

    throw new Error("No valid credentials found.");
  }
}
