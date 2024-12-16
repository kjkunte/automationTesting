import { Page } from "@playwright/test";
import {users,password} from "./config";


export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto("https://www.saucedemo.com/");
  }



  async login(users: string [], password: string) {
    for (const username of users) {
      await this.page.fill('[data-test="username"]', username);
      await this.page.fill('[data-test="password"]', password);
      await this.page.click('[data-test="login-button"]');
      console.log("Logged In Successfully to Move Further")
      return;
    }
  }
  async openMenu() {
    // Wait for the menu button to be visible
    await this.page.waitForSelector("#react-burger-menu-btn");
    
    // Click the menu button
    await this.page.click("#react-burger-menu-btn");
    console.log("Clicked Menu button, sidebar opened.");
  }

  async logout() {

    // Wait for the logout button in the menu to appear
    await this.openMenu();
    await this.page.waitForSelector('[data-test="logout-sidebar-link"]');

    console.log("Attempting to log out...");

    //logout
    const logoutButton = '[data-test="logout-sidebar-link"]';
    await this.page.click(logoutButton);
    console.log("Logout Button clicked.");

    //Verify the user has logged out
    await this.page.waitForURL("https://www.saucedemo.com/");
    console.log("Succesfully logged out");
  }
}
