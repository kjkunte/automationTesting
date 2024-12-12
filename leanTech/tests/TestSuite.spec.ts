import { test, expect } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { InventoryPage } from "./Inventory";
import { CartPage } from "./Cart";
import { CheckoutStepOnePage } from "./CheckoutStepOnePage";
import { CheckoutStepTwoPage } from "./CheckoutStepTwoPage";
import { CheckoutCompletePage } from "./CheckoutComplete";
import { IterationLoginTestPage } from "./IterationLoginTestPage";
import { config } from "dotenv";
config();

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
  // await loginPage.navigate();
  // await loginPage.login("standard_user", "secret_sauce");
  // Step 1: Find a valid username using IterationLoginTestPage
  const { validUsername, password } = await iterationLoginPage.findValidCredentials();

  // Use the valid credentials to proceed with the test flow
  await loginPage.navigate();
  await loginPage.login(validUsername, password);
  console.log("Proceeding with valid credentials:", validUsername);

  // Step 2: Add random items to the cart
  await inventoryPage.addRandomItems(3);
  await inventoryPage.goToCart();

  // Step 3: Checkout process
  await cartPage.clickCheckout();
//   console.log(test1)

  // Step 4: Fill customer details
  await checkoutStepOnePage.fillDetails("test", "here", "12345");
  await checkoutStepOnePage.continueCheckout();

  // Step 5: Complete checkout
  await checkoutStepTwoPage.finishCheckout();

  // Step 6: Verify order completion
  await checkoutCompletePage.verifyOrderCompletion();
});
