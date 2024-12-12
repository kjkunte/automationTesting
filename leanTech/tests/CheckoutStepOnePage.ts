import { Page, expect } from "@playwright/test";

export class CheckoutStepOnePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async fillDetails(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill('[data-test="firstName"]', firstName);
    await this.page.fill('[data-test="lastName"]', lastName);
    await this.page.fill('[data-test="postalCode"]', postalCode);
  }

  async clickCancel(): Promise<void> {
    await this.page.click("button:has-text('Cancel')");
    await expect(this.page).toHaveURL(/.*cart\.html/);
  }
  async continueCheckout() {
    await this.page.click('[data-test="continue"]');
  }
}
