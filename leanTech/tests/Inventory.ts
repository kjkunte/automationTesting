import { Page, expect } from "@playwright/test";

export class InventoryPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

//Selecting list at Random
  async addRandomItems(count: number): Promise<void> {
    await this.page.waitForSelector('[data-test^="add-to-cart"]');
    const addToCartButtons = await this.page.$$('button:has-text("Add to cart")');
    const randomIndices = Array.from({ length: count }, () => Math.floor(Math.random() * addToCartButtons.length));

    for (const index of randomIndices) {
      const buttons = await this.page.$$('[data-test^="add-to-cart"]');
      if (buttons[index]) {
        await buttons[index].click();
      } else {
        console.warn(`Button not found index : ${index}`)
      }
    }
    // console.log('RI:',randomIndices)

    // console.log('addToCart:', addToCartButtons)
    console.log("Random items added to the cart");
  }

//Test to chcck the toggle button feature
  async toggleCartItem(): Promise<void> {
    await this.page.waitForLoadState("domcontentloaded");
    console.log("Checking the button toggle betn Add to Cart and Remove");
    const inventoryButtons = await this.page.locator('.inventory_item .pricebar button').all();
    console.log(inventoryButtons)
    for (const button of inventoryButtons) {
      const buttonText = await button.textContent();
      console.log(buttonText)

      if(buttonText === "Add to cart"){
        console.log("Adding item to the cart ...");
        await button.click();
        await expect(button).toHaveText("Remove");
        const newButtonText = await button.textContent();
        if (newButtonText == "Remove") {
          await button.click();
          await expect(button).toHaveText("Add to cart");
          console.log("Succesfully removed from cart")
        }
      }
    }
   console.log("Completed toggling all times");
  }
  //Navigate to cart
  async goToCart() {
    await this.page.click('.shopping_cart_link');
  }
}
