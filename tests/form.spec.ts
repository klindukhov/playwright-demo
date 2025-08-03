import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.selenium.dev/selenium/web/web-form.html");
});

test("Has title", async ({ page }) => {
  await expect(page).toHaveTitle(/Web form/);
});

test.describe("Form", async () => {
  test("Can be filled", async ({ page }) => {
    await page.getByLabel("Text input ").fill("text");
    await page.getByLabel("Password ").fill("password");
    await page.getByLabel("Textarea ").fill("text");
    await page.getByLabel("Dropdown (select) ").selectOption("Two");
    await page.getByLabel("Dropdown (datalist) ").fill("Seattle");
    await page.getByLabel("Checked checkbox ").uncheck();
    await page.getByLabel("Default checkbox ").check();
    await page.getByLabel("Default radio ").check();
    await page.getByLabel("Date picker ").fill("04/23/2020");
    await page
      .getByLabel("File input ")
      .setInputFiles(
        "/home/bennyt/Documents/Projects/playwright-demo/.gitignore"
      );
  });

  test("Has a disabled field", async ({ page }) => {
    await expect(page.getByLabel("Disabled input ")).toBeDisabled();
  });

  test("Has a readonly field", async ({ page }) => {
    await expect(page.getByLabel("Readonly input ")).toHaveAttribute(
      "readonly"
    );
  });

  test("Can be submitted", async ({ page }) => {
    await page.getByText("Submit").click();
    await expect(page.getByRole("heading")).toContainText("Form submitted");
  });
});
