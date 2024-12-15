import { Page } from "@playwright/test";
import { config } from "dotenv";

export class LoginPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto("https://www.saucedemo.com/");
  }

  async login(username: string, password: string) {
    await this.page.fill('[data-test="username"]', username);
    await this.page.fill('[data-test="password"]', password);
    await this.page.click('[data-test="login-button"]');
  }

   async logout() {
    console.log("Attempting to log out...");

    //Click on the Menu
    const menuButton = '[data-test="menu-button"]';
    await this.page.click(menuButton);
    console.log("Menu button clicked.");

    //Wait for sidebar to appear
    const sidebar = '[data-test="sidebar"]';
    await this.page.waitForSelector(sidebar, {state: "visible"});
    console.log("Sidebar is visible");

    //logout
    const logoutButton = '[data-test="logout"]';
    await this.page.click(logoutButton);
    console.log("Logout Button clicked.");

    //Verify the user has logged out
    await this.page.waitForURL("https://www.saucedemo.com/");
    console.log("Succesfully logged out");
  }
}
