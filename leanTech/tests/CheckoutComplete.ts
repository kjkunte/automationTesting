import { Page } from "@playwright/test";

export class CheckoutCompletePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async verifyOrderCompletion() {
    await this.page.waitForSelector("text=THANK YOU FOR YOUR ORDER!");
  }
}
