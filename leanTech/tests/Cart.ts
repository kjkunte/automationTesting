import { Page } from "@playwright/test";

export class CartPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickCheckout() {
    await this.page.click('[data-test="checkout"]');
  }
}
