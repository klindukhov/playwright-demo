import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://qaplayground.com/practice/forms");
});

test.describe("Login form", () => {
  test("should have enabled input fields ", async ({ page }) => {
    await expect(page.locator("#login-email")).toBeEnabled();
    await expect(page.locator("#login-password")).toBeEnabled();
  });

  test("should display success message on login with valid credentials", async ({
    page,
  }) => {
    await page.locator("#login-email").fill("email@examlpe.com");
    await page.locator("#login-password").fill("pass");
    await page.locator("#loginSubmitBtn").click();

    await expect(page.locator("#loginResult")).toBeVisible();
    await expect(page.locator("#loginResult")).toHaveText(
      "Login successful! Welcome, email@examlpe.com.",
    );
  });

  test("should get reset on the press of the reset button", async ({
    page,
  }) => {
    await page.locator("#login-email").fill("email@examlpe.com");
    await page.locator("#login-password").fill("pass");
    await page.locator("#loginResetBtn").click();

    await expect(await page.locator("#login-email").inputValue()).toBe("");
    await expect(await page.locator("#login-password").inputValue()).toBe("");
  });

  test("should display appropriate error messages on empty input", async ({
    page,
  }) => {
    await page.locator("#loginSubmitBtn").click();

    await expect(page.locator("#loginEmailError")).toHaveText(
      "Email is required.",
    );
    await expect(page.locator("#loginPasswordError")).toHaveText(
      "Password is required.",
    );
  });

  test("should display appropriate error messages on invalid input", async ({
    page,
  }) => {
    await page.locator("#login-email").fill("email");
    await page.locator("#loginSubmitBtn").click();

    await expect(page.locator("#loginEmailError")).toHaveText(
      "Enter a valid email address.",
    );
    await expect(page.locator("#loginPasswordError")).toHaveText(
      "Password is required.",
    );
  });
});

test.describe("Personal details form", () => {
  test("should have enabled fields", async ({ page }) => {
    await expect(page.locator("#firstName")).toBeEnabled();
    await expect(page.locator("#lastName")).toBeEnabled();
    await expect(page.locator("#phone")).toBeEnabled();
    await expect(page.locator("#dob")).toBeEnabled();
    await expect(page.locator("#gender-male")).toBeEnabled();
    await expect(page.locator("#gender-female")).toBeEnabled();
    await expect(page.locator("#gender-other")).toBeEnabled();
  });

  test("should save the data when the valid input is provided", async ({
    page,
  }) => {
    await page.locator("#firstName").fill("John");
    await page.locator("#lastName").fill("Doe");
    await page.locator("#phone").fill("1234567890");
    await page.locator("#dob").fill("1980-02-20");
    await page.locator("#gender-male").click();
    await page.locator("#personalSubmitBtn").click();

    await expect(page.locator("#personalResult")).toHaveText("Saved: John Doe");
  });

  test("should reset the form on reset press", async ({ page }) => {
    await page.locator("#firstName").fill("John");
    await page.locator("#lastName").fill("Doe");
    await page.locator("#phone").fill("1234567890");
    await page.locator("#dob").fill("1980-02-20");
    await page.locator("#gender-male").click();

    await page.locator('[data-testid="btn-personal-reset"]').click();

    await expect(await page.locator("#firstName").inputValue()).toBe("");
    await expect(await page.locator("#lastName").inputValue()).toBe("");
    await expect(await page.locator("#phone").inputValue()).toBe("");
    await expect(await page.locator("#dob").inputValue()).toBe("");
    await expect(page.locator("#gender-male")).not.toBeChecked();
    await expect(page.locator("#gender-female")).not.toBeChecked();
    await expect(page.locator("#gender-other")).not.toBeChecked();
  });
  test("should display the correct error messages on submit with no input", async ({
    page,
  }) => {
    await page.locator("#personalSubmitBtn").click();

    await expect(page.locator("#firstNameError")).toHaveText(
      "First name is required.",
    );
    await expect(page.locator("#lastNameError")).toHaveText(
      "Last name is required.",
    );
    await expect(page.locator("#phoneError")).toHaveText("Phone is required.");
    await expect(page.locator("#dobError")).toHaveText(
      "Date of birth is required.",
    );
    await expect(page.locator("#genderError")).toHaveText(
      "Please select your gender.",
    );
  });
  test("should display the correct error message on invalid phone number input", async ({
    page,
  }) => {
    await page.locator("#phone").fill("123456789");
    await page.locator("#personalSubmitBtn").click();

    await expect(page.locator("#phoneError")).toHaveText(
      "Phone must be exactly 10 digits.",
    );
  });
});

test.describe("Address form", () => {
  test("should have enable input fields", async ({ page }) => {
    await expect(page.locator("#country")).toBeEnabled();
    await expect(page.locator("#city")).toBeEnabled();
    await expect(page.locator("#bio")).toBeEnabled();
  });

  test("should save the data with all valid inputs", async ({ page }) => {
    await page.locator("#country").selectOption({ label: "Germany" });
    await page.locator("#city").fill("Hannover");
    await page.locator("#bio").fill("Bio section input");
    await page.locator("#addressSubmitBtn").click();

    await expect(page.locator("#addressResult")).toHaveText(
      "Address saved: Hannover, Germany",
    );
  });

  test("should save the data without about me section", async ({ page }) => {
    await page.locator("#country").selectOption({ label: "Germany" });
    await page.locator("#city").fill("Hannover");
    await page.locator("#addressSubmitBtn").click();

    await expect(page.locator("#addressResult")).toHaveText(
      "Address saved: Hannover, Germany",
    );
  });

  test("should display the error messages when no data provided", async ({
    page,
  }) => {
    await page.locator("#addressSubmitBtn").click();

    await expect(page.locator("#countryError")).toHaveText(
      "Please select a country.",
    );
    await expect(page.locator("#cityError")).toHaveText("City is required.");
  });

  test("should reset the form on press of the reset button", async ({
    page,
  }) => {
    await page.locator("#country").selectOption({ label: "Germany" });
    await page.locator("#city").fill("Hannover");
    await page.locator("#bio").fill("Bio section input");

    await page.locator('[data-testid="btn-address-reset"]').click();

    await expect(await page.locator("#country").inputValue()).toBe("");
    await expect(await page.locator("#city").inputValue()).toBe("");
    await expect(await page.locator("#bio").inputValue()).toBe("");
  });
});

test.describe("Interests form", () => {
  test("should have enabled checkboxes", async ({ page }) => {
    await expect(page.locator("#interest-selenium")).toBeEnabled();
    await expect(page.locator("#interest-playwright")).toBeEnabled();
    await expect(page.locator("#interest-cypress")).toBeEnabled();
    await expect(page.locator("#interest-appium")).toBeEnabled();
    await expect(page.locator("#interest-jest")).toBeEnabled();
  });

  test("should save the data in accordance with the checked fields", async ({
    page,
  }) => {
    await page.locator("#interest-selenium").check();
    await page.locator("#interestsSubmitBtn").click();
    await expect(page.locator("#interestsResult")).toHaveText(
      "Interests saved: Selenium",
    );

    await page.locator("#interest-selenium").uncheck();
    await page.locator("#interest-playwright").check();
    await page.locator("#interestsSubmitBtn").click();
    await expect(page.locator("#interestsResult")).toHaveText(
      "Interests saved: Playwright",
    );

    await page.locator("#interest-playwright").uncheck();
    await page.locator("#interest-cypress").check();
    await page.locator("#interestsSubmitBtn").click();
    await expect(page.locator("#interestsResult")).toHaveText(
      "Interests saved: Cypress",
    );

    await page.locator("#interest-cypress").uncheck();
    await page.locator("#interest-appium").check();
    await page.locator("#interestsSubmitBtn").click();
    await expect(page.locator("#interestsResult")).toHaveText(
      "Interests saved: Appium",
    );

    await page.locator("#interest-appium").uncheck();
    await page.locator("#interest-jest").check();
    await page.locator("#interestsSubmitBtn").click();
    await expect(page.locator("#interestsResult")).toHaveText(
      "Interests saved: Jest",
    );
  });

  test("should get reset on press of the reset button", async ({ page }) => {
    await page.locator("#interest-selenium").check();
    await page.locator("#interest-playwright").check();
    await page.locator("#interest-appium").check();
    await page.locator("#interest-jest").check();
    await page.locator("#interest-cypress").check();

    await page.locator('[data-testid="btn-interests-reset"]').click();

    await expect(page.locator("#interest-selenium")).not.toBeChecked();
    await expect(page.locator("#interest-playwright")).not.toBeChecked();
    await expect(page.locator("#interest-cypress")).not.toBeChecked();
    await expect(page.locator("#interest-appium")).not.toBeChecked();
    await expect(page.locator("#interest-jest")).not.toBeChecked();
  });
});

test.describe("Account setup form", () => {
  test("should have enabled input fields", async ({ page }) => {
    await expect(page.locator("#password")).toBeEnabled();
    await expect(page.locator("#confirmPassword")).toBeEnabled();
    await expect(page.locator("#terms")).toBeEnabled();
  });

  test("should display success message on valid input", async ({ page }) => {
    await page.fill("#password", "123456");
    await page.fill("#confirmPassword", "123456");
    await page.locator("#terms").check();
    await page.locator("#submitFormBtn").click();

    await expect(page.locator("#formSuccessMsg")).toHaveText(
      "✓Account Setup Complete!Your account has been secured.Fill Again",
    );
    await expect(page.locator('[data-testid="btn-fill-again"]')).toBeVisible();
  });

  test("should get reset by the fill again button", async ({ page }) => {
    await page.fill("#password", "123456");
    await page.fill("#confirmPassword", "123456");
    await page.locator("#terms").check();
    await page.locator("#submitFormBtn").click();

    await page.locator('[data-testid="btn-fill-again"]').click();
    await expect(page.locator("#password")).toBeVisible();
    await expect(await page.locator("#password").inputValue()).toBe("");
    await expect(page.locator("#confirmPassword")).toBeVisible();
    await expect(await page.locator("#confirmPassword").inputValue()).toBe("");
    await expect(page.locator("#terms")).toBeVisible();
    await expect(page.locator("#terms")).not.toBeChecked();
  });

  test("should display correct error message on submit with empty input fields", async ({
    page,
  }) => {
    await page.locator("#terms").check();
    await page.locator("#submitFormBtn").click();

    await expect(page.locator("#passwordError")).toHaveText(
      "Password is required.",
    );
    await expect(page.locator("#confirmPasswordError")).toHaveText(
      "Please confirm your password.",
    );
  });

  test("should display correct error message on too short password", async ({
    page,
  }) => {
    await page.fill("#password", "12345");
    await page.fill("#confirmPassword", "12345");
    await page.locator("#terms").check();
    await page.locator("#submitFormBtn").click();

    await expect(page.locator("#passwordError")).toHaveText(
      "Password must be at least 6 characters.",
    );
  });

  test("should display correct error message on not matching passwords", async ({
    page,
  }) => {
    await page.fill("#password", "123456");
    await page.fill("#confirmPassword", "12345");
    await page.locator("#terms").check();
    await page.locator("#submitFormBtn").click();

    await expect(page.locator("#confirmPasswordError")).toHaveText(
      "Passwords do not match.",
    );
  });

  test("should display correct error message on not checked terms and conditions", async ({
    page,
  }) => {
    await page.fill("#password", "123456");
    await page.fill("#confirmPassword", "123456");
    await page.locator("#submitFormBtn").click();

    await expect(page.locator("#termsError")).toHaveText(
      "You must accept the Terms & Conditions.",
    );
  });
});
