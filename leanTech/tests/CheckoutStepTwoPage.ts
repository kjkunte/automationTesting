import { Page, expect } from "@playwright/test";

export class CheckoutStepTwoPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickCancel(): Promise<void> {
    await this.page.click("button:has-text('Cancel')");
    await expect(this.page).toHaveURL(/.*cart\.html/);
  }

  async finishCheckout() {
    await this.page.click('[data-test="finish"]');
  }
}
