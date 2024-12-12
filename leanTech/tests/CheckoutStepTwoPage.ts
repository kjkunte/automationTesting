import { Page } from "@playwright/test";

export class CheckoutStepTwoPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async finishCheckout() {
    await this.page.click('[data-test="finish"]');
  }
}
