import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://qaplayground.com/practice/date-picker");
});

test.describe("S01 Basic date input", () => {
  test("should record date on valid input", async ({ page }) => {
    const datePicker = page.getByTestId("dp-basic-input");
    await datePicker.fill("2010-09-09");

    await expect(datePicker).toHaveValue("2010-09-09");
    await expect(page.getByTestId("result-s01")).toHaveText("2010-09-09");
  });

  test("should convert invalid input to a valid date", async ({ page }) => {
    const datePicker = page.getByTestId("dp-basic-input");
    await datePicker.focus();
    await page.keyboard.type("19359999");

    await expect(datePicker).toHaveValue("9999-12-31");
    await expect(page.getByTestId("result-s01")).toHaveText("9999-12-31");
  });
});

test.describe("S02 Calendar open and select", () => {
  test.beforeEach(async ({ page }) => {
    const pickDateButton = page.getByTestId("dp-calendar-trigger");
    await pickDateButton.click();
  });

  test("should open the calendar on click", async ({ page }) => {
    const calendar = page.getByTestId("dp-calendar-panel");

    await expect(calendar).toBeVisible();
  });

  test("should record the clicked date", async ({ page }) => {
    const calendar = page.getByTestId("dp-calendar-panel");

    await expect(calendar).toBeVisible();

    await calendar.getByText("1").nth(0).click();
    expect(
      (await page.getByTestId("result-s02").innerText()).endsWith("01"),
    ).toBe(true);
  });

  test("should switch the month on click of the navigation buttons", async ({
    page,
  }) => {
    const calendar = page.getByTestId("dp-calendar-panel");

    await expect(calendar).toBeVisible();

    const calendarMonth = page.getByTestId("dp-calendar-month-heading");
    const currentMonth = (await calendarMonth.innerText()).split(" ")[0];
    const calendarMonthButtons = calendar.locator("div:nth-child(1) button");

    await calendarMonthButtons.nth(0).click();

    expect((await calendarMonth.innerText()).split(" ")[0]).not.toBe(
      currentMonth,
    );

    await calendarMonthButtons.nth(1).click();

    expect((await calendarMonth.innerText()).split(" ")[0]).toBe(currentMonth);

    await calendarMonthButtons.nth(1).click();

    expect((await calendarMonth.innerText()).split(" ")[0]).not.toBe(
      currentMonth,
    );
  });
});

test.describe("S03 Month navigation", () => {
  test("should switch month on click of the arrow buttons", async ({
    page,
  }) => {
    const month = page.getByTestId("dp-nav-month-display");
    const prevMonth = page.getByTestId("dp-nav-prev-month");
    const nextMonth = page.getByTestId("dp-nav-next-month");

    const currentMonth = await month.innerText();

    await prevMonth.click();

    await expect(month).not.toHaveText(currentMonth);

    await nextMonth.click();

    await expect(month).toHaveText(currentMonth);

    await nextMonth.click();

    await expect(month).not.toHaveText(currentMonth);
  });

  test("should display current month by default", async ({ page }) => {
    const month = page.getByTestId("dp-nav-month-display");
    const currentMonth = await month.innerText();

    const date = new Date();
    const actualCurrentMonth = date.toLocaleString("default", {
      month: "long",
    });
    const actualCurrentYear = date.getFullYear();

    expect(currentMonth).toBe(actualCurrentMonth + " " + actualCurrentYear);
  });

  test("should switch year after enough clicks of the arrow buttons", async ({
    page,
  }) => {
    const month = page.getByTestId("dp-nav-month-display");
    const nextMonth = page.getByTestId("dp-nav-next-month");

    await nextMonth.click({ clickCount: 12 });

    const currentMonth = await month.innerText();
    const date = new Date();
    const actualCurrentMonth = date.toLocaleString("default", {
      month: "long",
    });
    const actualCurrentYear = date.getFullYear();

    expect(currentMonth).toBe(
      actualCurrentMonth + " " + (actualCurrentYear + 1),
    );
  });
});

test.describe("S04 Date Range picker", () => {
  test("should record the start date on valid input", async ({ page }) => {
    const startDatePicker = page.getByTestId("dp-range-start");

    await startDatePicker.fill("2010-09-09");

    const result = page.getByTestId("result-s04");
    await expect(result).toHaveText("Start: 2010-09-09 (end not set)");
  });

  test("should record the range on valid input", async ({ page }) => {
    const startDatePicker = page.getByTestId("dp-range-start");
    const endDatePicker = page.getByTestId("dp-range-end");

    await startDatePicker.fill("2010-09-09");
    await endDatePicker.fill("2010-10-09");

    const result = page.getByTestId("result-s04");
    await expect(result).toHaveText("Range: 2010-09-09 → 2010-10-09");
  });

  test("should have the min attribute on the end range after startDate input", async ({
    page,
  }) => {
    const startDatePicker = page.getByTestId("dp-range-start");
    const endDatePicker = page.getByTestId("dp-range-end");

    await expect(endDatePicker).not.toHaveAttribute("min");
    await startDatePicker.fill("2010-09-09");
    await expect(endDatePicker).toHaveAttribute("min");
    expect(await endDatePicker.getAttribute("min")).toBe("2010-09-09");
  });
});

test.describe("S05 Disabled min-max dates", () => {
  test("should have min max attributes", async ({ page }) => {
    const datePicker = page.getByTestId("dp-constrained-input");
    await expect(datePicker).toHaveAttribute("max");
    await expect(datePicker).toHaveAttribute("min");

    expect(await datePicker.getAttribute("min")).toBe("2025-06-01");
    expect(await datePicker.getAttribute("max")).toBe("2025-12-31");
  });

  test("should record the date on valid input", async ({ page }) => {
    const datePicker = page.getByTestId("dp-constrained-input");

    await datePicker.fill("2025-09-09");

    const result = page.getByTestId("result-s05");
    await expect(result).toHaveText("Valid date: 2025-09-09");
  });
  test("should have the error message on invalid input", async ({ page }) => {
    const datePicker = page.getByTestId("dp-constrained-input");

    await datePicker.fill("2010-09-09");

    const result = page.getByTestId("result-s05");
    await expect(result).toHaveText("Invalid: 2010-09-09 is out of range");
  });
});

test.describe("S06 Sibling located Date fields", () => {
  test("should record the appointment date on valid input", async ({
    page,
  }) => {
    const apptDateInput = page.getByLabel("Appointment date");

    await apptDateInput.fill("2010-09-09");

    const result = page.getByTestId("result-s06");
    await expect(result).toHaveText("Appointment: 2010-09-09");
  });

  test("should record the return date on valid input", async ({ page }) => {
    const returnDateInput = page.getByLabel("Return date");

    await returnDateInput.fill("2010-09-09");

    const result = page.getByTestId("result-s06");
    await expect(result).toHaveText("Return: 2010-09-09");
  });
});

test.describe("SO7 Repeated Date Cards", () => {
  test("should record the appointment date when Book button is pressed", async ({
    page,
  }) => {
    const morningSlot = page.getByLabel("Book Morning slot on 2025-08-12");
    const afternoonSlot = page.getByLabel("Book Afternoon slot on 2025-08-12");
    const eveningSlot = page.getByLabel("Book Evening slot on 2025-08-12");

    const result = page.getByTestId("result-s07");

    await morningSlot.click();
    await expect(result).toHaveText(
      "Booked: Morning — 2025-08-12 09:00 – 10:00 AM",
    );

    await afternoonSlot.click();
    await expect(result).toHaveText(
      "Booked: Afternoon — 2025-08-12 01:00 – 02:00 PM",
    );

    await eveningSlot.click();
    await expect(result).toHaveText(
      "Booked: Evening — 2025-08-12 05:00 – 06:00 PM",
    );
  });
});

test.describe("S08 Dynamic Date display", () => {
  test("should display today's date", async ({ page }) => {
    const todaysDateDisplay = page.locator("#dynamic-date-display");
    const now = new Date();

    await expect(todaysDateDisplay).toHaveText(now.toLocaleDateString());
  });
});
