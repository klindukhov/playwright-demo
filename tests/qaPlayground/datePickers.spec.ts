import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://qaplayground.com/practice/date-picker");
});

test.describe("S01 Basic date input", () => {
  test("should record date on valid input", async ({ page }) => {});
  test("should convert invalid input to a valid date", async ({ page }) => {});
});

test.describe("S02 Calendar open and select", () => {
  test("should open the calendar on click", async ({ page }) => {});
  test("should record the clicked date", async ({ page }) => {});
  test("should switch the month on click of the navigation buttons", async ({
    page,
  }) => {});
});

test.describe("S03 Month navigation", () => {
  test("should switch month on click of the arrow buttons", async ({
    page,
  }) => {});
  test("should display current month by default", async ({ page }) => {});
  test("should switch year after enough clicks of the arrow buttons", async ({
    page,
  }) => {});
});

test.describe("S04 Date Range picker", () => {
  test("should record the start date on valid input", async ({ page }) => {});
  test("should record the range on valid input", async ({ page }) => {});
  test("should have the error tooltip on invalid input", async ({
    page,
  }) => {});
});

test.describe("S05 Disabled min-max dates", () => {
  test("should have min max attributes", async ({ page }) => {});
  test("should record the date on valid input", async ({ page }) => {});
  test("should have the error tooltip and message on invalid input", async ({
    page,
  }) => {});
});

test.describe("S06 Sibling located Date fields", () => {
  test("should record the appointment date on valid input", async ({
    page,
  }) => {});
  test("should record the return date on valid input", async ({ page }) => {});
});

test.describe("SO7 Repeated Date Cards", () => {
  test("should record the appointment date when Book button is pressed", async ({
    page,
  }) => {});
});

test.describe("S08 Dynamic Date display", () => {
  test("should display today's date", async ({ page }) => {});
});
