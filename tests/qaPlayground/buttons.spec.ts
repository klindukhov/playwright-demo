import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://qaplayground.com/practice/buttons");
});

test.describe("Home button", () => {
  test("should navigate to home page", async ({ page }) => {
    await page.locator("#navigateHomeBtn").click();
    await expect(page.locator("#result-s01")).toHaveText(
      "Navigated to Home Page",
    );
  });
});

test.describe("Find location button", () => {
  test("should cause the button location to be displayed", async ({ page }) => {
    const button = page.locator("#coordinatesBtn");
    await button.click();
    const location = await button.boundingBox();

    await expect(page.locator("#result-s02")).toHaveText(
      `X: ${Math.round(location?.x || 0)}px, Y: ${Math.round(location?.y || 0)}px`,
    );
  });

  test("should update the location information after scrolling", async ({
    page,
  }) => {
    const button = page.locator("#coordinatesBtn");
    await button.click();
    await page.mouse.wheel(0, 10);

    await button.click();

    const location = await button.boundingBox();

    await expect(page.locator("#result-s02")).toHaveText(
      `X: ${Math.round(location?.x || 0)}px, Y: ${Math.round(location?.y || 0)}px`,
    );
  });
});

test.describe("Color button", () => {
  test("should cause its color to be display in th result field", async ({
    page,
  }) => {
    const button = page.locator("#colorBtn");

    const color = await button.evaluate(
      (element) => getComputedStyle(element).backgroundColor,
    );
    await button.focus();
    await page.keyboard.press("Enter");

    await expect(page.locator("#result-s03")).toHaveText(
      `Background: ${color}`,
    );
  });
});

test.describe("Size button", () => {
  test("should cause the button size to get displayed", async ({ page }) => {
    const button = page.locator("#sizeBtn");
    await button.click();
    const buttonSize = await button.boundingBox();
    await expect(page.locator("#result-s04")).toHaveText(
      `W: ${buttonSize?.width}px, H: ${buttonSize?.height}px`,
    );
  });
});

test.describe("Disabled button", () => {
  test("should be disabled", async ({ page }) => {
    await expect(page.locator("#disabledBtn")).toBeDisabled();
  });
});

test.describe("Click and hold button", () => {
  test("should cause the success text to be displayed on click and hold", async ({
    page,
  }) => {
    await page.locator("#clickHoldBtn").hover();
    await page.mouse.down();
    setTimeout(async () => {
      await page.mouse.up();
      await expect(page.locator("#result-s06")).toHaveText("Held for 1.5s");
    }, 1500);
  });

  test("should cause the hold text to be displayed while holding", async ({
    page,
  }) => {
    await page.locator("#clickHoldBtn").hover();
    await page.mouse.down();
    await expect(page.locator("#result-s06")).toHaveText(
      "Holding... keep pressing",
    );
    setTimeout(async () => {
      await page.mouse.up();
    }, 1500);
  });

  test("should cause the try again text to be displayed on single click", async ({
    page,
  }) => {
    await page.locator("#clickHoldBtn").click();
    await expect(page.locator("#result-s06")).toHaveText(
      "Released too early - hold for 1.5s",
    );
  });
});

test.describe("Double Click button", () => {
  test("should cause the value to be displayed on double click", async ({
    page,
  }) => {
    await page.locator("#doubleClickBtn").dblclick();

    await expect(page.locator("#result-s07")).toHaveText("Double clicked!");
  });

  test("should not change the value on single click", async ({ page }) => {
    await page.locator("#doubleClickBtn").click();

    await expect(page.locator("#result-s07")).toHaveText(
      "Not double-clicked yet",
    );
  });
});

test.describe("Right click button", () => {
  test("should cause the text to change on right click", async ({ page }) => {
    await page.locator("#rightClickBtn").hover();
    await page.mouse.down({ button: "right" });
    await page.mouse.up();

    await expect(page.locator("#result-s08")).toHaveText(
      "Context menu triggered!",
    );
  });

  test("should not cause the text to change on single click", async ({
    page,
  }) => {
    await page.locator("#rightClickBtn").click();

    await expect(page.locator("#result-s08")).toHaveText(
      "No action performed yet",
    );
  });
});
