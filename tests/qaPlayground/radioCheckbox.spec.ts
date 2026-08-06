import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://qaplayground.com/practice/radio-checkbox");
});

test.describe("Basic checkbox", () => {
  test("should get checked when the checkbox is clicked", async ({ page }) => {
    const checkbox = page.getByTestId("chk-accept-terms");
    await checkbox.click();

    await expect(checkbox).toBeChecked();
    await expect(page.getByTestId("result-s01")).toHaveText("Checked ✓");
  });

  test("should get checked when the label is clicked", async ({ page }) => {
    const checkbox = page.getByTestId("chk-accept-terms");
    const checkboxLabel = page.locator('label[for="chk-accept-terms"] span');
    await checkboxLabel.click();

    await expect(checkbox).toBeChecked();
    await expect(page.getByTestId("result-s01")).toHaveText("Checked ✓");
  });

  test("should get unchecked when the checkbox is clicked the second time", async ({
    page,
  }) => {
    const checkbox = page.getByTestId("chk-accept-terms");
    await checkbox.click();

    await expect(checkbox).toBeChecked();

    await checkbox.click();
    await expect(checkbox).not.toBeChecked();
    await expect(page.getByTestId("result-s01")).toHaveText("Unchecked");
  });

  test("should get unchecked when the label is clicked the second time", async ({
    page,
  }) => {
    const checkbox = page.getByTestId("chk-accept-terms");
    const checkboxLabel = page.locator('label[for="chk-accept-terms"] span');
    await checkboxLabel.click();

    await expect(checkbox).toBeChecked();

    await checkboxLabel.click();
    await expect(checkbox).not.toBeChecked();
    await expect(page.getByTestId("result-s01")).toHaveText("Unchecked");
  });
});

test.describe("Radio Button Group", () => {
  test("should select an option on click of the radio button", async ({
    page,
  }) => {
    const radioButtonGroup = page.getByTestId("radio-plan-group");

    const radioButtonStarter =
      radioButtonGroup.getByTestId("radio-plan-starter");
    const radioButtonPro = radioButtonGroup.getByTestId("radio-plan-pro");
    const radioButtonBusiness = radioButtonGroup.getByTestId(
      "radio-plan-business",
    );

    const result = page.getByTestId("result-s02");

    await radioButtonStarter.click();
    await expect(radioButtonStarter).toBeChecked();
    await expect(result).toHaveText("Selected: Starter");

    await radioButtonPro.click();
    await expect(radioButtonPro).toBeChecked();
    await expect(result).toHaveText("Selected: Pro");

    await radioButtonBusiness.click();
    await expect(radioButtonBusiness).toBeChecked();
    await expect(result).toHaveText("Selected: Business");
  });

  test("should select an option on click of the label", async ({ page }) => {
    const radioButtonGroup = page.getByTestId("radio-plan-group");

    const radioButtonStarter =
      radioButtonGroup.getByTestId("radio-plan-starter");
    const radioButtonPro = radioButtonGroup.getByTestId("radio-plan-pro");
    const radioButtonBusiness = radioButtonGroup.getByTestId(
      "radio-plan-business",
    );

    const radioButtonStarterLabel = radioButtonGroup.locator(
      "label[for='radio-plan-starter']",
    );
    const radioButtonProLabel = radioButtonGroup.locator(
      "label[for='radio-plan-pro']",
    );
    const radioButtonBusinessLabel = radioButtonGroup.locator(
      "label[for='radio-plan-business']",
    );

    const result = page.getByTestId("result-s02");

    await radioButtonStarterLabel.click();
    await expect(radioButtonStarter).toBeChecked();
    await expect(result).toHaveText("Selected: Starter");

    await radioButtonProLabel.click();
    await expect(radioButtonPro).toBeChecked();
    await expect(result).toHaveText("Selected: Pro");

    await radioButtonBusinessLabel.click();
    await expect(radioButtonBusiness).toBeChecked();
    await expect(result).toHaveText("Selected: Business");
  });

  test("should have only one option selected on click of the radio button", async ({
    page,
  }) => {
    const radioButtonGroup = page.getByTestId("radio-plan-group");

    const radioButtonStarter =
      radioButtonGroup.getByTestId("radio-plan-starter");
    const radioButtonPro = radioButtonGroup.getByTestId("radio-plan-pro");
    const radioButtonBusiness = radioButtonGroup.getByTestId(
      "radio-plan-business",
    );

    const result = page.getByTestId("result-s02");

    await radioButtonStarter.click();
    await expect(radioButtonStarter).toBeChecked();
    await expect(radioButtonPro).not.toBeChecked();
    await expect(radioButtonBusiness).not.toBeChecked();

    await radioButtonPro.click();
    await expect(radioButtonStarter).not.toBeChecked();
    await expect(radioButtonPro).toBeChecked();
    await expect(radioButtonBusiness).not.toBeChecked();

    await radioButtonBusiness.click();
    await expect(radioButtonStarter).not.toBeChecked();
    await expect(radioButtonPro).not.toBeChecked();
    await expect(radioButtonBusiness).toBeChecked();
  });
});

test.describe("Checkbox Group - Select All", () => {
  test("should get selected on click of the checkbox", async ({ page }) => {
    const checkboxPlaywright = page.locator("#skill-playwright");
    const checkboxSelenium = page.locator("#skill-selenium");
    const checkboxCypress = page.locator("#skill-cypress");
    const checkboxWebdriverIO = page.locator("#skill-webdriverio");

    await checkboxPlaywright.click();
    await expect(checkboxPlaywright).toBeChecked();

    await checkboxSelenium.click();
    await expect(checkboxSelenium).toBeChecked();

    await checkboxCypress.click();
    await expect(checkboxCypress).toBeChecked();

    await checkboxWebdriverIO.click();
    await expect(checkboxWebdriverIO).toBeChecked();
  });

  test("should get unselected on click of the checkbox the second time", async ({
    page,
  }) => {
    const checkboxPlaywright = page.locator("#skill-playwright");
    const checkboxSelenium = page.locator("#skill-selenium");
    const checkboxCypress = page.locator("#skill-cypress");
    const checkboxWebdriverIO = page.locator("#skill-webdriverio");

    await checkboxPlaywright.click();
    await expect(checkboxPlaywright).toBeChecked();
    await checkboxPlaywright.click();
    await expect(checkboxPlaywright).not.toBeChecked();

    await checkboxSelenium.click();
    await expect(checkboxSelenium).toBeChecked();
    await checkboxSelenium.click();
    await expect(checkboxSelenium).not.toBeChecked();

    await checkboxCypress.click();
    await expect(checkboxCypress).toBeChecked();
    await checkboxCypress.click();
    await expect(checkboxCypress).not.toBeChecked();

    await checkboxWebdriverIO.click();
    await expect(checkboxWebdriverIO).toBeChecked();
    await checkboxWebdriverIO.click();
    await expect(checkboxWebdriverIO).not.toBeChecked();
  });

  test("should get selected on click of the label", async ({ page }) => {
    const checkboxPlaywright = page.locator("#skill-playwright");
    const checkboxSelenium = page.locator("#skill-selenium");
    const checkboxCypress = page.locator("#skill-cypress");
    const checkboxWebdriverIO = page.locator("#skill-webdriverio");

    const checkboxPlaywrightLabel = page.locator(
      "label[for='skill-playwright']",
    );
    const checkboxSeleniumLabel = page.locator("label[for='skill-selenium']");
    const checkboxCypressLabel = page.locator("label[for='skill-cypress']");
    const checkboxWebdriverIOLabel = page.locator(
      "label[for='skill-webdriverio']",
    );

    await checkboxPlaywrightLabel.click();
    await expect(checkboxPlaywright).toBeChecked();

    await checkboxSeleniumLabel.click();
    await expect(checkboxSelenium).toBeChecked();

    await checkboxCypressLabel.click();
    await expect(checkboxCypress).toBeChecked();

    await checkboxWebdriverIOLabel.click();
    await expect(checkboxWebdriverIO).toBeChecked();
  });

  test("should record all selected options", async ({ page }) => {
    const checkboxPlaywright = page.locator("#skill-playwright");
    const checkboxSelenium = page.locator("#skill-selenium");
    const checkboxCypress = page.locator("#skill-cypress");
    const checkboxWebdriverIO = page.locator("#skill-webdriverio");

    const result = page.locator("#result-s03");

    await checkboxPlaywright.click();
    await expect(checkboxPlaywright).toBeChecked();
    await expect(result).toHaveText("Playwright");

    await checkboxSelenium.click();
    await expect(checkboxSelenium).toBeChecked();
    await expect(result).toHaveText("Playwright, Selenium");

    await checkboxCypress.click();
    await expect(checkboxCypress).toBeChecked();
    await expect(result).toHaveText("Playwright, Selenium, Cypress");

    await checkboxWebdriverIO.click();
    await expect(checkboxWebdriverIO).toBeChecked();
    await expect(result).toHaveText(
      "Playwright, Selenium, Cypress, WebdriverIO",
    );
  });
});

test.describe("Pre-checked checkbox", () => {
  test("should initially have a checked state", async ({ page }) => {
    const checkbox = page.locator("#chk-newsletter");

    await expect(checkbox).toBeChecked();
  });

  test("should get unchecked on click", async ({ page }) => {
    const checkbox = page.locator("#chk-newsletter");

    await checkbox.click();
    await expect(checkbox).not.toBeChecked();
    await expect(page.locator("#result-s04")).toHaveText(
      "Unchecked (unsubscribed)",
    );
  });

  test("should get checked again on second click", async ({ page }) => {
    const checkbox = page.locator("#chk-newsletter");

    await checkbox.click();
    await expect(checkbox).not.toBeChecked();
    await checkbox.click();
    await expect(checkbox).toBeChecked();
    await expect(page.locator("#result-s04")).toHaveText(
      "Checked (re-subscribed)",
    );
  });
});

test.describe("Disabled controls", () => {
  test("should be disabled", async ({ page }) => {
    await expect(page.locator("#chk-disabled")).toBeDisabled();
    await expect(page.locator("#radio-disabled")).toBeDisabled();
  });
});

test.describe("Sibling-located controls", () => {
  test("should get checked on click without affecting other checkboxes", async ({
    page,
  }) => {
    const checkboxMarketing = page.locator("#notif_email_marketing");
    const checkboxSMS = page.locator("#notif_sms_alerts");
    const checkboxDigest = page.locator("#notif_push_weekly");

    await checkboxMarketing.check();
    await expect(checkboxMarketing).toBeChecked();
    await expect(checkboxSMS).not.toBeChecked();
    await expect(checkboxDigest).not.toBeChecked();

    await checkboxSMS.check();
    await expect(checkboxMarketing).toBeChecked();
    await expect(checkboxSMS).toBeChecked();
    await expect(checkboxDigest).not.toBeChecked();

    await checkboxDigest.check();
    await expect(checkboxMarketing).toBeChecked();
    await expect(checkboxSMS).toBeChecked();
    await expect(checkboxDigest).toBeChecked();
  });

  test("should get unchecked on second click without affecting other checkboxes", async ({
    page,
  }) => {
    const checkboxMarketing = page.locator("#notif_email_marketing");
    const checkboxSMS = page.locator("#notif_sms_alerts");
    const checkboxDigest = page.locator("#notif_push_weekly");

    await checkboxMarketing.check();
    await checkboxSMS.check();
    await checkboxDigest.check();
    await expect(checkboxMarketing).toBeChecked();
    await expect(checkboxSMS).toBeChecked();
    await expect(checkboxDigest).toBeChecked();

    await checkboxMarketing.uncheck();
    await expect(checkboxMarketing).not.toBeChecked();
    await expect(checkboxSMS).toBeChecked();
    await expect(checkboxDigest).toBeChecked();

    await checkboxSMS.uncheck();
    await expect(checkboxMarketing).not.toBeChecked();
    await expect(checkboxSMS).not.toBeChecked();
    await expect(checkboxDigest).toBeChecked();

    await checkboxDigest.uncheck();
    await expect(checkboxMarketing).not.toBeChecked();
    await expect(checkboxSMS).not.toBeChecked();
    await expect(checkboxDigest).not.toBeChecked();
  });
});

test.describe("Scoped card controls", () => {
  test("should get selected by clicking the card", async ({ page }) => {
    const starter = page.locator(
      '[data-testid="plan-card"][data-plan="starter"]',
    );
    const pro = page.locator('[data-testid="plan-card"][data-plan="pro"]');
    const enterprise = page.locator(
      '[data-testid="plan-card"][data-plan="enterprise"]',
    );

    await starter.click();
    await expect(starter.locator("input")).toBeChecked();
    await expect(page.locator("#result-s07")).toHaveText(
      "Selected plan: starter",
    );

    await pro.click();
    await expect(pro.locator("input")).toBeChecked();
    await expect(page.locator("#result-s07")).toHaveText("Selected plan: pro");

    await enterprise.click();
    await expect(enterprise.locator("input")).toBeChecked();
    await expect(page.locator("#result-s07")).toHaveText(
      "Selected plan: enterprise",
    );
  });

  test("should only get one option selected at a time", async ({ page }) => {
    const starter = page.locator(
      '[data-testid="plan-card"][data-plan="starter"]',
    );
    const pro = page.locator('[data-testid="plan-card"][data-plan="pro"]');
    const enterprise = page.locator(
      '[data-testid="plan-card"][data-plan="enterprise"]',
    );

    await starter.click();
    await expect(starter.locator("input")).toBeChecked();
    await expect(pro.locator("input")).not.toBeChecked();
    await expect(enterprise.locator("input")).not.toBeChecked();

    await pro.click();
    await expect(starter.locator("input")).not.toBeChecked();
    await expect(pro.locator("input")).toBeChecked();
    await expect(enterprise.locator("input")).not.toBeChecked();

    await enterprise.click();
    await expect(starter.locator("input")).not.toBeChecked();
    await expect(pro.locator("input")).not.toBeChecked();
    await expect(enterprise.locator("input")).toBeChecked();
  });
});

test.describe("Dynamic checkbox list", () => {
  test("should register all the checked read permissions and display them", async ({
    page,
  }) => {
    const readUsers = page.locator("#perm_read_users");
    const readReports = page.locator("#perm_read_reports");
    const readBilling = page.locator("#perm_read_billing");

    const result = page.locator("#result-s08");

    await readUsers.click();
    await expect(readUsers).toBeChecked();
    await expect(result).toHaveText("Read perms: Read Users");

    await readReports.click();
    await expect(readReports).toBeChecked();
    await expect(result).toHaveText("Read perms: Read Users, Read Reports");

    await readBilling.click();
    await expect(readBilling).toBeChecked();
    await expect(result).toHaveText(
      "Read perms: Read Users, Read Reports, Read Billing",
    );
  });

  test("should register all the unchecked read permissions and update display", async ({
    page,
  }) => {
    const readUsers = page.locator("#perm_read_users");
    const readReports = page.locator("#perm_read_reports");
    const readBilling = page.locator("#perm_read_billing");

    const result = page.locator("#result-s08");

    await readUsers.click();
    await readReports.click();
    await readBilling.click();

    await readUsers.click();
    await expect(readUsers).not.toBeChecked();
    await expect(result).toHaveText("Read perms: Read Reports, Read Billing");

    await readReports.click();
    await expect(readReports).not.toBeChecked();
    await expect(result).toHaveText("Read perms: Read Billing");

    await readBilling.click();
    await expect(readBilling).not.toBeChecked();
    await expect(result).toHaveText("No read perms selected");
  });
});
