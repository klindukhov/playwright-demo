import { test, expect, Page, Locator } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://qaplayground.com/practice/alerts-dialogs");
});

test.describe("s01 Info Alert Dialog", () => {
  test("should get opened by clicking the Open Info Dialog button", async ({
    page,
  }) => {});
  test("should have the expected title and text", async ({ page }) => {});
  test("should close on press of the X button", async ({ page }) => {});
  test("should close on press of the Got It button", async ({ page }) => {});
});

test.describe("s02 Confirm Dialog", () => {
  test("should get opened by clicking the Open Confirm dialog button", async ({
    page,
  }) => {});
  test("should have the expected title and text", async ({ page }) => {});
  test("should get dismissed/rejected after clicking Cancel button", async ({
    page,
  }) => {});
  test("should get confirmed after clicking the Confirm button", async ({
    page,
  }) => {});
});

test.describe("s03 Unsaved Dialog", () => {
  test("should get opened by clicking the Open Unsaved Dialog button", async ({
    page,
  }) => {});
  test("should have the expected title and text", async ({ page }) => {});
  test("should close after clicking the Stay button noting the button pressed", async ({
    page,
  }) => {});
  test("should close after clicking the Leave button noting the button pressed", async ({
    page,
  }) => {});
});

test.describe("s04 Destructive Delete Confirm", () => {
  test("should get opened by clicking the Open Delete Dialog button", async ({
    page,
  }) => {});
  test("should have the expected title and text", async ({ page }) => {});
  test("should close after clicking the Cancel button canceling the deletion", async ({
    page,
  }) => {});
  test("should close after clicking the Cancel button confirming the deletion", async ({
    page,
  }) => {});
});

test.describe("s05 Backdrop Dialog", () => {
  test("should get opened by clicking the Open Backdrop Dialog button", async ({
    page,
  }) => {});
  test("should have the expected title and text", async ({ page }) => {});
  test("should close after clicking outside of the dialog box", async ({
    page,
  }) => {});
});

test.describe("s06 Keyboard Dialog", () => {
  test("should get opened by clicking the Open Keyboard Dialog button", async ({
    page,
  }) => {});
  test("should have the expected title and text", async ({ page }) => {});
  test("should close after pressing Esc key", async ({ page }) => {});
});

test.describe("s07 Content Dialog", () => {
  test("should get opened by clicking the Open Notification button", async ({
    page,
  }) => {});
  test("should have the expected title and text", async ({ page }) => {});
  test("should close after pressing Got It key", async ({ page }) => {});
});

test.describe("s08 Repeated triggers", () => {
  test.describe("Low Disc Space dialog", () => {
    test("should get opened by clicking the Dismiss button on the notification", async ({
      page,
    }) => {});
    test("should have the expected title and text", async ({ page }) => {});
    test("should close after pressing Cancel and not dismiss the notification", async ({
      page,
    }) => {});
    test("should close after pressing Dismiss and dismiss the notification", async ({
      page,
    }) => {});
  });

  test.describe("Session Expiring dialog", () => {
    test("should get opened by clicking the Dismiss button on the notification", async ({
      page,
    }) => {});
    test("should have the expected title and text", async ({ page }) => {});
    test("should close after pressing Cancel and not dismiss the notification", async ({
      page,
    }) => {});
    test("should close after pressing Dismiss and dismiss the notification", async ({
      page,
    }) => {});
  });

  test.describe("Security alert dialog", () => {
    test("should get opened by clicking the Dismiss button on the notification", async ({
      page,
    }) => {});
    test("should have the expected title and text", async ({ page }) => {});
    test("should close after pressing Cancel and not dismiss the notification", async ({
      page,
    }) => {});
    test("should close after pressing Dismiss and dismiss the notification", async ({
      page,
    }) => {});
  });
});
