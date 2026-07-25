import { test, expect, type Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://qaplayground.com/practice/input-fields");
});

test.describe("S01 input field", () => {
  const getInputField = (page: Page) => page.locator("#movieNameInput");

  test("should allow text input", async ({ page }) => {
    await getInputField(page).fill("Movie name");
    expect(getInputField(page)).toHaveValue("Movie name");
  });

  test("should update the result on submit", async ({ page }) => {
    await getInputField(page).fill("Movie name");
    await page.locator("#submitMovieBtn").click();
    expect(page.locator("#result-s01")).toHaveText("You entered: Movie name");
  });

  test("should accept a long string", async ({ page }) => {
    await getInputField(page).fill(
      "12356789012345890125678901235890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901235789012345678901234567890",
    );
    expect(await getInputField(page).inputValue()).toHaveLength(200);
  });

  test("should clear on reload", async ({ page }) => {
    await getInputField(page).fill("Movie name");
    expect(getInputField(page)).toHaveValue("Movie name");
    page.reload();
    expect(getInputField(page)).toHaveValue("");
  });
});

test.describe("S02 input field", () => {
  test("should submit on Tab press", async ({ page }) => {
    await page.locator("#appendInput").click();
    await page.keyboard.type(" 2");
    await page.keyboard.press("Tab");

    expect(page.locator("#result-s02")).toHaveText("Current value: Avengers 2");
  });

  test("should not be focused after Tab press", async ({ page }) => {
    await page.locator("#appendInput").click();
    await page.keyboard.press("Tab");

    expect(page.locator("#appendInput")).not.toBeFocused();
  });
});

test.describe("S03 input field", () => {
  test("should have the expected inout value", async ({ page }) => {
    expect(await page.locator("#readValueInput").inputValue()).toBe(
      "The Matrix",
    );
  });
});

test.describe("S04 input field", () => {
  test("should be cleared", async ({ page }) => {
    await page.locator("#clearInput").clear();
    expect(await page.locator("#clearInput").inputValue()).toBe("");
  });
});

test.describe("S05 input field", () => {
  test("should be disabled", async ({ page }) => {
    expect(page.locator("#disabledInput")).toBeDisabled();
  });
});

test.describe("S06 input field", () => {
  test("should be readonly", async ({ page }) => {
    expect(page.locator("#readonlyInput")).toHaveAttribute("readonly");
  });

  test("cannot be edited", async ({ page }) => {
    const inputField = page.locator("#readonlyInput");
    const initialValue = await inputField.inputValue();
    inputField.click();
    await page.keyboard.type("Sample text");
    expect(await inputField.inputValue()).toBe(initialValue);
  });
});
