import { Page } from "@playwright/test";

export class InventoryPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async addRandomItems(count: number) {
    const addToCartButtons = await this.page.$$('button:has-text("Add to cart")');
    const randomIndices = Array.from({ length: count }, () => Math.floor(Math.random() * addToCartButtons.length));

    for (const index of randomIndices) {
      await addToCartButtons[index].click();
    }
    // console.log('RI:',randomIndices)
    // console.log('addToCart:', addToCartButtons)
  }

  async goToCart() {
    await this.page.click('.shopping_cart_link');
  }
}
