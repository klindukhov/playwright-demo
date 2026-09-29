import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://qaplayground.com/practice/links");
});

test.describe("S01 Internal following links", () => {
  test("Home link opens Home page on click", async ({ page }) => {});
  test("About us page opens About Us page on click", async ({ page }) => {});
});

test.describe("S02 External links (New Tab)", () => {
  test("Selenium Automation Notes link opens the appropriate page in a new tab", async ({
    page,
  }) => {});
  test("Selenium Complete Course link opens the appropriate page in a new tab", async ({
    page,
  }) => {});
});

test.describe("S03 Broken links", () => {
  test("Broken link 1 opens a new tab with 500 HTTP status code", async ({
    page,
  }) => {});
  test("Broken link 2 opens a page in the same tab with 500 HTTP status", async ({
    page,
  }) => {});
  test("Broken link 3 has an empty href", async ({ page }) => {});
  test("Broken link 3 has an empty does not open any pages", async ({
    page,
  }) => {});
});

test.describe("S04 Image links", () => {
  test("Broken image link does not open a new page", async ({ page }) => {});
  test("Iron man image link opens an appropriate page in a new tab", async ({
    page,
  }) => {});
});

test.describe("S05 Button links", () => {
  test("Broken button does not open a new page", async ({ page }) => {});
  test("Broken link button does not open a new page", async ({ page }) => {});
  test("Home button opens Home page on click", async ({ page }) => {});
});

test.describe("S06 Text links and Anchor", () => {
  test("Link Homdf56e opens Home Page", async ({ page }) => {});
  test("Link About 32 yhs opens About page", async ({ page }) => {});
  test("Long text link does not open a new page", async ({ page }) => {});
  test("Text anchor link adds a hash to the URL", async ({ page }) => {});
  test("Text anchor link scrolls the page to the anchor target", async ({
    page,
  }) => {});
});

test.describe("S07 API Status Code links", () => {
  test("201 link's href returns an appropriate status code", async ({
    page,
  }) => {});
  test("204 link's href returns an appropriate status code", async ({
    page,
  }) => {});
  test("301 link's href returns an appropriate status code", async ({
    page,
  }) => {});
  test("400 link's href returns an appropriate status code", async ({
    page,
  }) => {});
  test("401 link's href returns an appropriate status code", async ({
    page,
  }) => {});
  test("403 link's href returns an appropriate status code", async ({
    page,
  }) => {});
  test("404 link's href returns an appropriate status code", async ({
    page,
  }) => {});
});
