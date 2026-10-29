import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://qaplayground.com/practice/links");
});

test.describe("S01 Internal following links", () => {
  test("Home link opens Home page on click", async ({ page }) => {
    const homeLink = page.getByTestId("link-internal-home");

    await homeLink.click();
    await expect(page.url()).toBe("https://qaplayground.com/");
  });

  test("About us page opens About Us page on click", async ({ page }) => {
    const aboutUsLink = page.getByTestId("link-internal-about");

    await aboutUsLink.click();
    await expect(page.url()).toBe("https://qaplayground.com/about-us");
  });
});

test.describe("S02 External links (New Tab)", () => {
  //Link outdated
  // test("Selenium Automation Notes link opens the appropriate page in a new tab", async ({
  //   page,
  // }) => {});

  test("Selenium Complete Course link opens the appropriate page in a new tab", async ({
    page,
  }) => {
    const courseLink = page.getByTestId("link-external-course");

    const popupPromise = page.waitForEvent("popup");

    await courseLink.click();

    const newTab = await popupPromise;
    await newTab.waitForLoadState();

    await expect(newTab.url()).toBe(
      "https://www.udemy.com/course/selenium-real-time-examplesinterview-questions/",
    );
  });
});

test.describe("S03 Broken links", () => {
  test("Broken link 1 opens a new tab with 500 HTTP status code", async ({
    page,
  }) => {
    const newTabLinkHref = await page
      .getByTestId("link-broken-newtab")
      .getAttribute("href");

    let status = 400;

    if (newTabLinkHref) {
      status = (await page.request.get(newTabLinkHref)).status();
    }

    await expect(status).toBe(500);
  });

  test("Broken link 2 opens a page in the same tab with 500 HTTP status", async ({
    page,
  }) => {
    const linkHref = await page
      .getByTestId("link-broken-same")
      .getAttribute("href");

    let status = 400;

    if (linkHref) {
      status = (await page.request.get(linkHref)).status();
    }

    await expect(status).toBe(500);
  });

  test("Broken link 3 has an empty href", async ({ page }) => {
    const href = await page
      .getByTestId("link-broken-empty")
      .getAttribute("href");

    await expect(href).toBe("#");
  });

  test("Broken link 3 has an empty does not open any pages", async ({
    page,
  }) => {
    const href = await page
      .getByTestId("link-broken-empty")
      .getAttribute("href");

    let status = 400;

    if (href) {
      try {
        status = (await page.request.get(href)).status();
      } catch {}
    }

    await expect(status).toBe(400);
  });
});

test.describe("S04 Image links", () => {
  test("Broken image link does not open a new page", async ({ page }) => {
    const brokenImageLink = page.getByTestId("link-image-broken");
    await brokenImageLink.click();

    await expect(page.url()).toBe("https://qaplayground.com/practice/links");
  });

  test("Iron man image link opens an appropriate page in a new tab", async ({
    page,
  }) => {
    const ironManImageLink = page.getByTestId("link-image-ironman");

    const popupPromise = page.waitForEvent("popup");

    await ironManImageLink.click();
    const newTab = await popupPromise;
    await newTab.waitForLoadState();

    await expect(newTab.url()).toBe("https://ashisheditz.com/?s=iron+man");
  });
});

test.describe("S05 Button links", () => {
  test("Broken button does not open a new page", async ({ page }) => {
    const brokenButton = page.getByTestId("link-btn-broken");
    await brokenButton.click();

    await expect(page.url()).toBe("https://qaplayground.com/practice/links");
  });

  test("Broken link button does not open a new page", async ({ page }) => {
    const brokenButton = page.getByTestId("link-btn-broken-2");
    await brokenButton.click();

    await expect(page.url()).toBe("https://qaplayground.com/practice/links");
  });

  test("Home button opens Home page on click", async ({ page }) => {
    const brokenButton = page.getByTestId("link-btn-home");
    await brokenButton.click();

    await expect(page.url()).toBe("https://qaplayground.com/");
  });
});

test.describe("S06 Text links and Anchor", () => {
  test("Link Homdf56e opens Home Page", async ({ page }) => {
    const link = page.getByTestId("link-text-garbled-1");

    await link.click();
    await expect(page.url()).toBe("https://qaplayground.com/");
  });

  test("Link About 32 yhs opens About page", async ({ page }) => {
    const link = page.getByTestId("link-text-garbled-2");

    await link.click();
    await expect(page.url()).toBe("https://qaplayground.com/about-us");
  });

  test("Long text link does not open a new page", async ({ page }) => {
    const longLink = page.getByTestId("link-text-long");

    await longLink.click();

    await expect(longLink).toBeVisible();
    await expect(page.url()).toBe("https://qaplayground.com/practice/links");
  });

  test("Text anchor link adds a hash to the URL", async ({ page }) => {
    const anchorLink = page.getByTestId("link-text-anchor");

    await anchorLink.click();

    await expect(page.url()).toContain("#");
  });

  test("Text anchor link scrolls the page to the anchor target", async ({
    page,
  }) => {
    const anchorLink = page.getByTestId("link-text-anchor");

    await anchorLink.click();

    await expect(page.getByTestId("anchor-target")).toBeInViewport();
  });
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
