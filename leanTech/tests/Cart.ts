import { Page, expect } from "@playwright/test";

export class CartPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickContinueShopping(): Promise<void> {
    await this.page.click("button:has-text('Continue Shopping')");
    await expect(this.page).toHaveURL(/.*inventory\.html/);
  }

  async clickCheckout() {
    await this.page.click('[data-test="checkout"]');
  }
}
