import { Page, expect } from "@playwright/test";

export class InventoryPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

//Selecting list at Random
  async addRandomItems(count: number) {
    const addToCartButtons = await this.page.$$('button:has-text("Add to cart")');
    const randomIndices = Array.from({ length: count }, () => Math.floor(Math.random() * addToCartButtons.length));

    for (const index of randomIndices) {
      await addToCartButtons[index].click();
    }
    // console.log('RI:',randomIndices)
    // console.log('addToCart:', addToCartButtons)
  }

//Test to chcck the toggle button feature
  async toggleCartItem(itemIndex: number): Promise<void> {
    const itemButton = this.page.locator(`.inventory_item:nth-child(${itemIndex}) button`);
    const initialText = await itemButton.textContent();
  
    if (initialText === "Add to cart") {
      await itemButton.click();
      await expect(itemButton).toHaveText("Remove");
    } else if (initialText === "Remove") {
      await itemButton.click();
      await expect(itemButton).toHaveText("Add to cart");
    }
  }
  //Navigate to cart
    async goToCart() {
    await this.page.click('.shopping_cart_link');
  }
}
