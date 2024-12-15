import { test, expect } from "@playwright/test";
import { LoginPage } from "./loginPage";
import { InventoryPage } from "./inventory";
import { CartPage } from "./cart";
import { CheckoutStepOnePage } from "./checkoutStepOnePage";
import { CheckoutStepTwoPage } from "./checkoutStepTwoPage";
import { CheckoutCompletePage } from "./checkoutComplete";
import { IterationLoginTestPage } from "./iterationLoginTestPage";
import { config } from "dotenv";
config();
const users: string[] = [
  process.env.STANDARD_USER || "",
  process.env.LOCKED_OUT_USER || "",
  process.env.PROBLEM_USER || "",
  process.env.PERFORMANCE_GLITCH_USER || "",
  process.env.ERROR_USER || "",
  process.env.VISUAL_USER || "",
];
const password: string = process.env.PASSWORD

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
  await loginPage.login(validUsername, password);


  // Step 2: Add random items to the cart
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
