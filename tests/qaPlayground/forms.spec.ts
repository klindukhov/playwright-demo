import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://qaplayground.com/practice/forms");
});

test.describe("Login form", () => {
  test("should have enabled input fields ", async ({ page }) => {
    expect(page.locator("#login-email")).toBeEnabled();
    expect(page.locator("#login-password")).toBeEnabled();
  });

  test("should display success message on login with valid credentials", async ({
    page,
  }) => {
    await page.locator("#login-email").fill("email@examlpe.com");
    await page.locator("#login-password").fill("pass");
    await page.locator("#loginSubmitBtn").click();

    expect(page.locator("#loginResult")).toBeVisible();
    expect(page.locator("#loginResult")).toHaveText(
      "Login successful! Welcome, email@examlpe.com.",
    );
  });

  test("should get reset on the press of the reset button", async ({
    page,
  }) => {
    await page.locator("#login-email").fill("email@examlpe.com");
    await page.locator("#login-password").fill("pass");
    await page.locator("#loginResetBtn").click();

    expect(await page.locator("#login-email").inputValue()).toBe("");
    expect(await page.locator("#login-password").inputValue()).toBe("");
  });

  test("should display appropriate error messages on empty input", async ({
    page,
  }) => {
    await page.locator("#loginSubmitBtn").click();

    expect(page.locator("#loginEmailError")).toHaveText("Email is required.");
    expect(page.locator("#loginPasswordError")).toHaveText(
      "Password is required.",
    );
  });

  test("should display appropriate error messages on invalid input", async ({
    page,
  }) => {
    await page.locator("#login-email").fill("email");
    await page.locator("#loginSubmitBtn").click();

    expect(page.locator("#loginEmailError")).toHaveText(
      "Enter a valid email address.",
    );
    expect(page.locator("#loginPasswordError")).toHaveText(
      "Password is required.",
    );
  });
});

test.describe("Personal details form", () => {
  test("should have enabled fields", async ({ page }) => {
    expect(page.locator("#firstName")).toBeEnabled();
    expect(page.locator("#lastName")).toBeEnabled();
    expect(page.locator("#phone")).toBeEnabled();
    expect(page.locator("#dob")).toBeEnabled();
    expect(page.locator("#gender-male")).toBeEnabled();
    expect(page.locator("#gender-female")).toBeEnabled();
    expect(page.locator("#gender-other")).toBeEnabled();
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

    expect(page.locator("#personalResult")).toHaveText("Saved: John Doe");
  });

  test("should reset the form on reset press", async ({ page }) => {
    await page.locator("#firstName").fill("John");
    await page.locator("#lastName").fill("Doe");
    await page.locator("#phone").fill("1234567890");
    await page.locator("#dob").fill("1980-02-20");
    await page.locator("#gender-male").click();

    await page.locator('[data-testid="btn-personal-reset"]').click();

    expect(await page.locator("#firstName").inputValue()).toBe("");
    expect(await page.locator("#lastName").inputValue()).toBe("");
    expect(await page.locator("#phone").inputValue()).toBe("");
    expect(await page.locator("#dob").inputValue()).toBe("");
    expect(page.locator("#gender-male")).not.toBeChecked();
    expect(page.locator("#gender-female")).not.toBeChecked();
    expect(page.locator("#gender-other")).not.toBeChecked();
  });
  test("should display the correct error messages on submit with no input", async ({
    page,
  }) => {
    await page.locator("#personalSubmitBtn").click();

    expect(page.locator("#firstNameError")).toHaveText(
      "First name is required.",
    );
    expect(page.locator("#lastNameError")).toHaveText("Last name is required.");
    expect(page.locator("#phoneError")).toHaveText("Phone is required.");
    expect(page.locator("#dobError")).toHaveText("Date of birth is required.");
    expect(page.locator("#genderError")).toHaveText(
      "Please select your gender.",
    );
  });
  test("should display the correct error message on invalid phone number input", async ({
    page,
  }) => {
    await page.locator("#phone").fill("123456789");
    await page.locator("#personalSubmitBtn").click();

    expect(page.locator("#phoneError")).toHaveText(
      "Phone must be exactly 10 digits.",
    );
  });
});

test.describe("Address form", () => {
  test("should have enable input fields", async ({ page }) => {
    expect(page.locator("#country")).toBeEnabled();
    expect(page.locator("#city")).toBeEnabled();
    expect(page.locator("#bio")).toBeEnabled();
  });

  test("should save the data with all valid inputs", async ({ page }) => {
    await page.locator("#country").selectOption({ label: "Germany" });
    await page.locator("#city").fill("Hannover");
    await page.locator("#bio").fill("Bio section input");
    await page.locator("#addressSubmitBtn").click();

    expect(page.locator("#addressResult")).toHaveText(
      "Address saved: Hannover, Germany",
    );
  });

  test("should save the data without about me section", async ({ page }) => {
    await page.locator("#country").selectOption({ label: "Germany" });
    await page.locator("#city").fill("Hannover");
    await page.locator("#addressSubmitBtn").click();

    expect(page.locator("#addressResult")).toHaveText(
      "Address saved: Hannover, Germany",
    );
  });

  test("should display the error messages when no data provided", async ({
    page,
  }) => {
    await page.locator("#addressSubmitBtn").click();

    expect(page.locator("#countryError")).toHaveText(
      "Please select a country.",
    );
    expect(page.locator("#cityError")).toHaveText("City is required.");
  });

  test("should reset the form on press of the reset button", async ({
    page,
  }) => {
    await page.locator("#country").selectOption({ label: "Germany" });
    await page.locator("#city").fill("Hannover");
    await page.locator("#bio").fill("Bio section input");

    await page.locator('[data-testid="btn-address-reset"]').click();

    expect(await page.locator("#country").inputValue()).toBe("");
    expect(await page.locator("#city").inputValue()).toBe("");
    expect(await page.locator("#bio").inputValue()).toBe("");
  });
});
