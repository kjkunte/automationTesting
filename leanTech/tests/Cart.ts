import { Page, expect } from "@playwright/test";

export class CartPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickContinueShopping(): Promise<void> {
    await this.page.click("button:has-text('Continue Shopping')");
    await expect(this.page).toHaveURL(/.*inventory\.html/);
    console.log("Tested revert back to Continue Shopping on cart")
  }

  async clickCheckout() {
    await expect(this.page).toHaveURL(/.*cart\.html/);
    await this.page.click('[data-test="checkout"]');
    console.log("Tested Checkout step one ");
  }
}
