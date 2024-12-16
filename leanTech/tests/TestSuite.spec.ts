import { test, expect } from "@playwright/test";
import { LoginPage } from "./loginPage";
import { InventoryPage } from "./Inventory";
import { CartPage } from "./Cart";
import { CheckoutStepOnePage } from "./CheckoutStepOnePage";
import { CheckoutStepTwoPage } from "./checkoutStepTwoPage";
import { CheckoutCompletePage } from "./CheckoutComplete";
import { IterationLoginTestPage } from "./IterationLoginTestPage";
import { config } from "dotenv";
config();
import {users, password} from "./config"; //Import from centralized config

// Declaring users and password globally
test("Customer flow - Random item selection and checkout", async ({ page }) => {
  // Page Object instances
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  
  const cartPage = new CartPage(page);
  const checkoutStepOnePage = new CheckoutStepOnePage(page);
  const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
  const checkoutCompletePage = new CheckoutCompletePage(page);
  const iterationLoginPage = new IterationLoginTestPage(page);

  // Step 1: Login
  await iterationLoginPage.tryLogin(users, password);

  // Use the valid credentials to proceed with the test flow
  await loginPage.navigate();
  await loginPage.login(users, password);


  // Step 2: Add random items to the cart
  await inventoryPage.toggleCartItem();
  await inventoryPage.addRandomItems(3);
  await inventoryPage.goToCart();

  // Step 3: Checkout process
  await cartPage.clickCheckout();
//   console.log(test1)

  // Step 4: Fill customer details
  await checkoutStepOnePage.fillDetails("test", "here", "1234");
  await checkoutStepOnePage.continueCheckout();

  // Step 5: Complete checkout
  await checkoutStepTwoPage.finishCheckout();

  // Step 6: Verify order completion
  await checkoutCompletePage.verifyOrderCompletion();
});
