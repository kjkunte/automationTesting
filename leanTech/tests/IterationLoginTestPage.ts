import { Page, expect } from "@playwright/test";
import { LoginPage } from "./loginPage";
import {users,password} from "./config";

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
    
    await this.page.fill('[data-test="username"]', username);
    await this.page.fill('[data-test="password"]', password);
    await this.page.click('[data-test="login-button"]');

    // Verify login succes
    try {
      await this.page.waitForURL(/.*inventory\.html/, {timeout:300});
      console.log(`Logged in Succesfully ${username}`);
      //call logout after successfully login
      await loginPage.logout();
    } catch{
      console.log(`Login failed for user: ${username}`);
    }
  }
}

}
