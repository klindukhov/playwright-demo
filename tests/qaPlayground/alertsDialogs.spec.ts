import { test, expect, Page, Locator } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://qaplayground.com/practice/alerts-dialogs");
});

test.describe("s01 Info Alert Dialog", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByTestId("open-info-dialog").click();
  });

  test("should get opened by clicking the Open Info Dialog button", async ({
    page,
  }) => {
    const dialog = page.getByTestId("info-alert-dialog");
    await expect(dialog).toBeVisible();
  });

  test("should have the expected title and text", async ({ page }) => {
    const dialog = page.getByTestId("info-alert-dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("h2")).toHaveText("Session Notice");
    await expect(dialog.locator("p")).toHaveText(
      "Your session will expire in 30 minutes. Please save your work before the session ends.",
    );
  });

  test("should close on press of the X button", async ({ page }) => {
    const dialog = page.getByTestId("info-alert-dialog");
    await expect(dialog).toBeVisible();
    await dialog.locator("button").nth(0).click();
    await expect(dialog).not.toBeVisible();
  });
  test("should close on press of the Got It button", async ({ page }) => {
    const dialog = page.getByTestId("info-alert-dialog");
    await expect(dialog).toBeVisible();
    await dialog.locator("button").nth(1).click();
    await expect(dialog).not.toBeVisible();
  });
});

test.describe("s02 Confirm Dialog", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByTestId("open-confirm-dialog").click();
  });

  test("should get opened by clicking the Open Confirm dialog button", async ({
    page,
  }) => {
    const dialog = page.getByTestId("confirm-action-dialog");
    await expect(dialog).toBeVisible();
  });

  test("should have the expected title and text", async ({ page }) => {
    const dialog = page.getByTestId("confirm-action-dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("h2")).toHaveText("Confirm Submission");
    await expect(dialog.locator("p")).toHaveText(
      "Submit this form response? This action cannot be reversed.",
    );
  });

  test("should get dismissed/rejected after clicking Cancel button", async ({
    page,
  }) => {
    const dialog = page.getByTestId("confirm-action-dialog");
    await expect(dialog).toBeVisible();
    await dialog.locator("button").nth(0).click();
    await expect(dialog).not.toBeVisible();

    await expect(page.getByTestId("result-s02")).toHaveText(
      "Awaiting confirmation",
    );
  });

  test("should get confirmed after clicking the Confirm button", async ({
    page,
  }) => {
    const dialog = page.getByTestId("confirm-action-dialog");
    await expect(dialog).toBeVisible();
    await dialog.locator("button").nth(1).click();
    await expect(dialog).not.toBeVisible();

    await expect(page.getByTestId("result-s02")).toHaveText(
      "Submission confirmed!",
    );
  });
});

test.describe("s03 Unsaved Dialog", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByTestId("open-unsaved-dialog").click();
  });

  test("should get opened by clicking the Open Unsaved Dialog button", async ({
    page,
  }) => {
    const dialog = page.getByTestId("unsaved-changes-dialog");
    await expect(dialog).toBeVisible();
  });

  test("should have the expected title and text", async ({ page }) => {
    const dialog = page.getByTestId("unsaved-changes-dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("h2")).toHaveText("Unsaved Changes");
    await expect(dialog.locator("p")).toHaveText(
      "You have unsaved changes. Leave without saving?",
    );
  });

  test("should close after clicking the Stay button noting the button pressed", async ({
    page,
  }) => {
    const dialog = page.getByTestId("unsaved-changes-dialog");
    await expect(dialog).toBeVisible();
    await dialog.locator("button").nth(1).click();
    await expect(dialog).not.toBeVisible();

    await expect(page.getByTestId("result-s03")).toHaveText(
      "Stayed — changes preserved",
    );
  });

  test("should close after clicking the Leave button noting the button pressed", async ({
    page,
  }) => {
    const dialog = page.getByTestId("unsaved-changes-dialog");
    await expect(dialog).toBeVisible();
    await dialog.locator("button").nth(0).click();
    await expect(dialog).not.toBeVisible();

    await expect(page.getByTestId("result-s03")).toHaveText(
      "Dialog not opened",
    );
  });
});

test.describe("s04 Destructive Delete Confirm", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByTestId("open-delete-dialog").click();
  });

  test("should get opened by clicking the Open Delete Dialog button", async ({
    page,
  }) => {
    const dialog = page.getByTestId("delete-account-dialog");
    await expect(dialog).toBeVisible();
  });

  test("should have the expected title and text", async ({ page }) => {
    const dialog = page.getByTestId("delete-account-dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("h2")).toHaveText("Delete Account");
    await expect(dialog.locator("p")).toHaveText(
      "Permanently delete user@example.com? This cannot be undone.",
    );
  });

  test("should close after clicking the Cancel button canceling the deletion", async ({
    page,
  }) => {
    const dialog = page.getByTestId("delete-account-dialog");
    await expect(dialog).toBeVisible();
    await dialog.locator("button").nth(0).click();
    await expect(dialog).not.toBeVisible();

    await expect(page.getByTestId("result-s04")).toHaveText("No deletion yet");
  });

  test("should close after clicking the Cancel button confirming the deletion", async ({
    page,
  }) => {
    const dialog = page.getByTestId("delete-account-dialog");
    await expect(dialog).toBeVisible();
    await dialog.locator("button").nth(1).click();
    await expect(dialog).not.toBeVisible();

    await expect(page.getByTestId("result-s04")).toHaveText("Account deleted!");
  });
});

test.describe("s05 Backdrop Dialog", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByTestId("open-backdrop-dialog").click();
  });

  test("should get opened by clicking the Open Backdrop Dialog button", async ({
    page,
  }) => {
    const dialog = page.getByTestId("backdrop-dismiss-dialog");
    await expect(dialog).toBeVisible();
  });

  test("should have the expected title and text", async ({ page }) => {
    const dialog = page.getByTestId("backdrop-dismiss-dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("h2")).toHaveText(
      "Dismiss by Clicking Outside",
    );
    await expect(dialog.locator("p")).toHaveText(
      "Click the dark backdrop around this dialog box to close it. There is no close button — only the overlay area dismisses it.",
    );
  });

  test("should close after clicking outside of the dialog box", async ({
    page,
  }) => {
    const backdrop = page.getByTestId("backdrop-dismiss-dialog");
    await expect(backdrop).toBeVisible();
    await backdrop.click({
      position: {
        x: 10,
        y: 100,
      },
    });
    await expect(backdrop).not.toBeVisible();
  });
});

test.describe("s06 Keyboard Dialog", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByTestId("open-escape-dialog").click();
  });

  test("should get opened by clicking the Open Keyboard Dialog button", async ({
    page,
  }) => {
    const dialog = page.getByTestId("escape-dismiss-dialog");
    await expect(dialog).toBeVisible();
  });

  test("should have the expected title and text", async ({ page }) => {
    const dialog = page.getByTestId("escape-dismiss-dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("h2")).toHaveText("Press Escape to Close");
    await expect(dialog.locator("p")).toHaveText(
      "This dialog has no close button. Use the Escape key on your keyboard to dismiss it.",
    );
  });

  test("should close after pressing Esc key", async ({ page }) => {
    const dialog = page.getByTestId("escape-dismiss-dialog");
    await expect(dialog).toBeVisible();
    await dialog.focus();
    await page.keyboard.press("Escape");

    await expect(dialog).not.toBeVisible();
  });
});

test.describe("s07 Content Dialog", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByTestId("open-notification-dialog").click();
  });

  test("should get opened by clicking the Open Notification button", async ({
    page,
  }) => {
    const dialog = page.getByTestId("system-notification-dialog");
    await expect(dialog).toBeVisible();
  });

  test("should have the expected title and text", async ({ page }) => {
    const dialog = page.getByTestId("system-notification-dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("h2")).toHaveText("Maintenance Window");
    await expect(dialog.locator("span")).toHaveText("Scheduled");
    await expect(dialog.locator("p")).toHaveText(
      "Service will be offline from Sunday 3:00–5:00 AM UTC. Please plan accordingly and save any active work before the window begins.",
    );
  });

  test("should close after pressing Got It key", async ({ page }) => {
    const dialog = page.getByTestId("system-notification-dialog");
    await expect(dialog).toBeVisible();
    await dialog.locator("button").nth(0).click();
    await expect(dialog).not.toBeVisible();
  });
});

test.describe("s08 Repeated triggers", () => {
  test.describe("Low Disc Space dialog", () => {
    test.beforeEach(async ({ page }) => {
      await page.getByTestId("notif-dismiss-btn").nth(0).click();
    });

    test("should get opened by clicking the Dismiss button on the notification", async ({
      page,
    }) => {
      const dialog = page.getByTestId("dismiss-confirm-dialog");
      await expect(dialog).toBeVisible();
      await expect(dialog).toHaveAttribute("data-notif-id", "notif-1");
    });

    test("should have the expected title and text", async ({ page }) => {
      const dialog = page.getByTestId("dismiss-confirm-dialog");
      await expect(dialog).toBeVisible();
      await expect(dialog.locator("h2")).toHaveText("Dismiss Low Disk Space?");
      await expect(dialog.locator("p")).toHaveText(
        "This notification will be removed from your list.",
      );
    });

    test("should close after pressing Cancel and not dismiss the notification", async ({
      page,
    }) => {
      const dialog = page.getByTestId("dismiss-confirm-dialog");
      await expect(dialog).toBeVisible();
      await dialog.locator("button").nth(0).click();
      await expect(dialog).not.toBeVisible();
      await expect(page.getByTestId("result-s08")).toHaveText(
        "No notification dismissed",
      );
    });

    test("should close after pressing Dismiss and dismiss the notification", async ({
      page,
    }) => {
      const dialog = page.getByTestId("dismiss-confirm-dialog");
      await expect(dialog).toBeVisible();
      await dialog.locator("button").nth(1).click();
      await expect(dialog).not.toBeVisible();
      await expect(page.getByTestId("result-s08")).toHaveText(
        "Low Disk Space — notification dismissed",
      );
    });
  });

  test.describe("Session Expiring dialog", () => {
    test.beforeEach(async ({ page }) => {
      await page.getByTestId("notif-dismiss-btn").nth(1).click();
    });

    test("should get opened by clicking the Dismiss button on the notification", async ({
      page,
    }) => {
      const dialog = page.getByTestId("dismiss-confirm-dialog");
      await expect(dialog).toBeVisible();
      await expect(dialog).toHaveAttribute("data-notif-id", "notif-2");
    });
    test("should have the expected title and text", async ({ page }) => {
      const dialog = page.getByTestId("dismiss-confirm-dialog");
      await expect(dialog).toBeVisible();
      await expect(dialog.locator("h2")).toHaveText(
        "Dismiss Session Expiring Soon?",
      );
      await expect(dialog.locator("p")).toHaveText(
        "This notification will be removed from your list.",
      );
    });

    test("should close after pressing Cancel and not dismiss the notification", async ({
      page,
    }) => {
      const dialog = page.getByTestId("dismiss-confirm-dialog");
      await expect(dialog).toBeVisible();
      await dialog.locator("button").nth(0).click();
      await expect(dialog).not.toBeVisible();
      await expect(page.getByTestId("result-s08")).toHaveText(
        "No notification dismissed",
      );
    });

    test("should close after pressing Dismiss and dismiss the notification", async ({
      page,
    }) => {
      const dialog = page.getByTestId("dismiss-confirm-dialog");
      await expect(dialog).toBeVisible();
      await dialog.locator("button").nth(1).click();
      await expect(dialog).not.toBeVisible();
      await expect(page.getByTestId("result-s08")).toHaveText(
        "Session Expiring Soon — notification dismissed",
      );
    });
  });

  test.describe("Security alert dialog", () => {
    test.beforeEach(async ({ page }) => {
      await page.getByTestId("notif-dismiss-btn").nth(2).click();
    });

    test("should get opened by clicking the Dismiss button on the notification", async ({
      page,
    }) => {
      const dialog = page.getByTestId("dismiss-confirm-dialog");
      await expect(dialog).toBeVisible();
      await expect(dialog).toHaveAttribute("data-notif-id", "notif-3");
    });

    test("should have the expected title and text", async ({ page }) => {
      const dialog = page.getByTestId("dismiss-confirm-dialog");
      await expect(dialog).toBeVisible();
      await expect(dialog.locator("h2")).toHaveText("Dismiss Security Alert?");
      await expect(dialog.locator("p")).toHaveText(
        "This notification will be removed from your list.",
      );
    });

    test("should close after pressing Cancel and not dismiss the notification", async ({
      page,
    }) => {
      const dialog = page.getByTestId("dismiss-confirm-dialog");
      await expect(dialog).toBeVisible();
      await dialog.locator("button").nth(0).click();
      await expect(dialog).not.toBeVisible();
      await expect(page.getByTestId("result-s08")).toHaveText(
        "No notification dismissed",
      );
    });

    test("should close after pressing Dismiss and dismiss the notification", async ({
      page,
    }) => {
      const dialog = page.getByTestId("dismiss-confirm-dialog");
      await expect(dialog).toBeVisible();
      await dialog.locator("button").nth(1).click();
      await expect(dialog).not.toBeVisible();
      await expect(page.getByTestId("result-s08")).toHaveText(
        "Security Alert — notification dismissed",
      );
    });
  });
});
