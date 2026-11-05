import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://qaplayground.com/practice/links");
});

test.describe("S01 Internal following links", () => {
  test("Home link opens Home page on click", async ({ page }) => {
    const homeLink = page.getByTestId("link-internal-home");

    await expect(homeLink).not.toHaveAttribute("target", "_blank");

    await homeLink.click();
    await expect(page).toHaveURL("https://qaplayground.com/");
  });

  test("Home link changes color on hover", async ({ page }) => {
    const homeLink = page.getByTestId("link-internal-home");

    const initialColor = await homeLink.evaluate(
      (el) => getComputedStyle(el).color,
    );

    await homeLink.hover();

    const hoveredColor = await homeLink.evaluate(
      (el) => getComputedStyle(el).color,
    );

    await expect(initialColor).toEqual(hoveredColor);
  });

  test("Home page link is accessible using keyboard", async ({ page }) => {
    const homeLink = page.getByTestId("link-internal-home");

    for (let i = 0; i < 14; i++) {
      await page.keyboard.press("Tab");
    }

    await expect(homeLink).toBeFocused();

    await page.keyboard.press("Enter");

    await expect(page).toHaveURL("https://qaplayground.com/");
  });

  test("About us link opens About Us page on click", async ({ page }) => {
    const aboutUsLink = page.getByTestId("link-internal-about");

    await expect(aboutUsLink).not.toHaveAttribute("target", "_blank");

    await aboutUsLink.click();
    await expect(page).toHaveURL("https://qaplayground.com/about-us");
  });

  test("About us link opens About Us page without console errors", async ({
    page,
  }) => {
    const aboutUsLink = page.getByTestId("link-internal-about");

    const errors: string[] = [];

    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });

    page.on("pageerror", (err) => errors.push(err.message));

    await aboutUsLink.click();

    await page.waitForLoadState();

    await expect(errors).toEqual([]);
  });

  test("About Us link displays the context menu on right click", async ({
    page,
  }) => {
    const aboutUsLink = page.getByTestId("link-internal-about");

    await page.evaluate(() => {
      window.addEventListener(
        "contextmenu",
        (event) => {
          document.documentElement.dataset.contextMenuPrevented = String(
            event.defaultPrevented,
          );
        },
        { once: true },
      );
    });

    await aboutUsLink.click({ button: "right" });

    await expect(page.locator("html")).toHaveAttribute(
      "data-context-menu-prevented",
      "false",
    );
  });

  test("About us link opens contains the expected text", async ({ page }) => {
    const aboutUsLink = page.getByTestId("link-internal-about");

    await expect(await aboutUsLink.innerText()).toBe("About Us");
  });
});

test.describe("S02 External links (New Tab)", () => {
  //Link outdated
  // test("Selenium Automation Notes link opens the appropriate page in a new tab", async ({
  //   page,
  // }) => {});

  test("Selenium Complete Course link has correct target", async ({ page }) => {
    const courseLink = page.getByTestId("link-external-course");

    await expect(courseLink).toHaveAttribute("target", "_blank");
  });

  test("Selenium Complete Course link opens the appropriate page in a new tab", async ({
    page,
  }) => {
    const courseLink = page.getByTestId("link-external-course");

    const popupPromise = page.waitForEvent("popup");

    await courseLink.click();

    const newTab = await popupPromise;
    await newTab.waitForLoadState();

    await expect(newTab).toHaveURL(
      "https://www.udemy.com/course/selenium-real-time-examplesinterview-questions/",
    );
  });
});

test.describe("S03 Broken links", () => {
  test("Broken link 1 opens a new tab with 500 HTTP status code", async ({
    page,
  }) => {
    const newTabLink = page.getByTestId("link-broken-newtab");

    await expect(newTabLink).toHaveAttribute("target", "_blank");

    const newTabLinkHref = await newTabLink.getAttribute("href");

    let status = 400;

    if (newTabLinkHref) {
      status = (await page.request.get(newTabLinkHref)).status();
    }

    await expect(status).toBe(500);
  });

  test("Broken link 2 opens a page in the same tab with 500 HTTP status", async ({
    page,
  }) => {
    const link = page.getByTestId("link-broken-same");

    await expect(link).not.toHaveAttribute("target", "_blank");

    const linkHref = await link.getAttribute("href");

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

    await expect(page).toHaveURL("https://qaplayground.com/practice/links");
  });

  test("Iron man image link has the expected href", async ({ page }) => {
    const ironManImageLink = page.getByTestId("link-image-ironman");

    await expect(ironManImageLink).toHaveAttribute(
      "href",
      "https://ashisheditz.com/?s=iron+man",
    );
  });

  test("Iron man image link has an accessible label for screen readers", async ({
    page,
  }) => {
    const ironManImageLink = page.getByTestId("link-image-ironman");

    await expect(ironManImageLink).toHaveAttribute(
      "aria-label",
      "Iron Man image link",
    );
  });

  test("Iron man image link opens an appropriate page in a new tab", async ({
    page,
  }) => {
    const ironManImageLink = page.getByTestId("link-image-ironman");

    const popupPromise = page.waitForEvent("popup");

    await ironManImageLink.click();
    const newTab = await popupPromise;
    await newTab.waitForLoadState();

    await expect(newTab).toHaveURL("https://ashisheditz.com/?s=iron+man");
  });
});

test.describe("S05 Button links", () => {
  test("Broken button does not open a new page", async ({ page }) => {
    const brokenButton = page.getByTestId("link-btn-broken");
    await brokenButton.click();

    await expect(page).toHaveURL("https://qaplayground.com/practice/links");
  });

  test("Broken link button does not open a new page", async ({ page }) => {
    const brokenButton = page.getByTestId("link-btn-broken-2");
    await brokenButton.click();

    await expect(page).toHaveURL("https://qaplayground.com/practice/links");
  });

  test("Home button opens Home page on click", async ({ page }) => {
    const brokenButton = page.getByTestId("link-btn-home");
    await brokenButton.click();

    await expect(page).toHaveURL("https://qaplayground.com/");
  });
});

test.describe("S06 Text links and Anchor", () => {
  test("Link Homdf56e opens Home Page", async ({ page }) => {
    const link = page.getByTestId("link-text-garbled-1");

    await link.click();
    await expect(page).toHaveURL("https://qaplayground.com/");
  });

  test("Link About 32 yhs opens About page", async ({ page }) => {
    const link = page.getByTestId("link-text-garbled-2");

    await link.click();
    await expect(page).toHaveURL("https://qaplayground.com/about-us");
  });

  test("Long text link does not open a new page", async ({ page }) => {
    const longLink = page.getByTestId("link-text-long");

    await longLink.click();

    await expect(longLink).toBeVisible();
    await expect(page).toHaveURL("https://qaplayground.com/practice/links");
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

// Functionality not implemented
//
// test.describe("S07 API Status Code links", () => {
//   test("201 link's href returns an appropriate status code", async ({
//     page,
//   }) => {});
//   test("204 link's href returns an appropriate status code", async ({
//     page,
//   }) => {});
//   test("301 link's href returns an appropriate status code", async ({
//     page,
//   }) => {});
//   test("400 link's href returns an appropriate status code", async ({
//     page,
//   }) => {});
//   test("401 link's href returns an appropriate status code", async ({
//     page,
//   }) => {});
//   test("403 link's href returns an appropriate status code", async ({
//     page,
//   }) => {});
//   test("404 link's href returns an appropriate status code", async ({
//     page,
//   }) => {});
// });
