import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://qaplayground.com/practice/forms");
});

test.describe("Login form", () => {
  test("should have enabled input fields ", async ({ page }) => {
    expect(page.locator("#login-email")).toBeEnabled();
    expect(page.locator("#login-password")).toBeEnabled();
  });

  test("should display success message on login with valid credentials", async ({
    page,
  }) => {
    await page.locator("#login-email").fill("email@examlpe.com");
    await page.locator("#login-password").fill("pass");
    await page.locator("#loginSubmitBtn").click();

    expect(page.locator("#loginResult")).toBeVisible();
    expect(page.locator("#loginResult")).toHaveText(
      "Login successful! Welcome, email@examlpe.com.",
    );
  });

  test("should get reset on the press of the reset button", async ({
    page,
  }) => {
    await page.locator("#login-email").fill("email@examlpe.com");
    await page.locator("#login-password").fill("pass");
    await page.locator("#loginResetBtn").click();

    expect(await page.locator("#login-email").inputValue()).toBe("");
    expect(await page.locator("#login-password").inputValue()).toBe("");
  });

  test("should display appropriate error messages on empty input", async ({
    page,
  }) => {
    await page.locator("#loginSubmitBtn").click();

    expect(page.locator("#loginEmailError")).toHaveText("Email is required.");
    expect(page.locator("#loginPasswordError")).toHaveText(
      "Password is required.",
    );
  });

  test("should display appropriate error messages on invalid input", async ({
    page,
  }) => {
    await page.locator("#login-email").fill("email");
    await page.locator("#loginSubmitBtn").click();

    expect(page.locator("#loginEmailError")).toHaveText(
      "Enter a valid email address.",
    );
    expect(page.locator("#loginPasswordError")).toHaveText(
      "Password is required.",
    );
  });
});
