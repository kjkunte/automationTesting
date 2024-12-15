import { Page, expect } from "@playwright/test";

export class CheckoutStepTwoPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickCancel(): Promise<void> {
    await this.page.click("button:has-text('Cancel')");
    await expect(this.page).toHaveURL(/.*inventory\.html/);
    console.log("Reverted back to inventory on pressing Cancel in Checkout Step two");
  }

  async finishCheckout() {
    await this.page.click('[data-test="finish"]');
    await expect(this.page).toHaveURL(/.*checkout-complete\.html/);
    console.log("Succesfully Finsihed Checking out");
  }
}
