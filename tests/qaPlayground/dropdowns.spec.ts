import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  page.goto("https://qaplayground.com/practice/dropdowns");
});

test.describe("Select Fruit by Visible Text dropdown", () => {
  test("should get the option selected by visible text", async ({ page }) => {
    await page.locator("#fruitSelect").selectOption({ label: "Orange" });
    await expect(page.locator("#result-s01")).toHaveText(
      "Selected fruit: Orange",
    );

    await page.locator("#fruitSelect").selectOption({ label: "Apple" });
    await expect(page.locator("#result-s01")).toHaveText(
      "Selected fruit: Apple",
    );

    await page.locator("#fruitSelect").selectOption({ label: "Banana" });
    await expect(page.locator("#result-s01")).toHaveText(
      "Selected fruit: Banana",
    );
  });

  test("should treat Select Fruit as a non-choice", async ({ page }) => {
    await page.locator("#fruitSelect").selectOption({ label: "Select Fruit" });
    await expect(page.locator("#result-s01")).toHaveText("No fruit selected");
  });
});

test.describe("Select Country by Value Attribute dropdown", () => {
  test("should have 5 options in the dropdown", async ({ page }) => {
    await page.locator("#countrySelect").click();
    const options = await page.locator("#countrySelect option").allInnerTexts();
    await expect(options.length).toBe(5);
  });

  test("should get the option selected by value", async ({ page }) => {
    await page.locator("#countrySelect").selectOption({ value: "argentina" });
    await expect(page.locator("#result-s02")).toHaveText(
      "Selected country: Argentina (argentina)",
    );

    await page.locator("#countrySelect").selectOption({ value: "india" });
    await expect(page.locator("#result-s02")).toHaveText(
      "Selected country: India (india)",
    );

    await page.locator("#countrySelect").selectOption({ value: "japan" });
    await expect(page.locator("#result-s02")).toHaveText(
      "Selected country: Japan (japan)",
    );

    await page
      .locator("#countrySelect")
      .selectOption({ value: "united-states" });
    await expect(page.locator("#result-s02")).toHaveText(
      "Selected country: United States (united-states)",
    );
  });

  test("should treat Select Country as a non-choice", async ({ page }) => {
    await page.locator("#countrySelect").selectOption({ value: "" });
    await expect(page.locator("#result-s02")).toHaveText("No country selected");
  });
});

test.describe("Select Last Language and Read All Options", () => {
  test("should have all the expected options available", async ({ page }) => {
    await page.locator("#languageSelect").click();
    const options = await page
      .locator("#languageSelect option")
      .allInnerTexts();

    await expect(page.locator("#result-s03")).toHaveText(
      `Languages available: ${options.length}`,
    );
  });

  test("should get the option displayed in result when selected", async ({
    page,
  }) => {
    await page.locator("#languageSelect").click();
    const options = await page
      .locator("#languageSelect option")
      .allInnerTexts();

    await page
      .locator("#languageSelect")
      .selectOption({ label: options[options.length - 1] });

    await expect(page.locator("#result-s03")).toHaveText(
      `Selected language: TypeScript`,
    );
  });

  test("should get the appropriate message displayed when the button is pressed", async ({
    page,
  }) => {
    await page.locator("#selectLastLanguageBtn").click();

    await expect(page.locator("#result-s03")).toHaveText(
      `Selected TypeScript; options: Python, Java, JavaScript, TypeScript`,
    );
    await expect(await page.locator("#languageSelect").inputValue()).toBe(
      "typescript",
    );
  });
});

test.describe("Multi-select superheroes", () => {
  test("should have the correct initial state", async ({ page }) => {
    await expect(page.locator("#result-s04")).toHaveText("No heroes selected");
    await expect(await page.locator("#heroSelect").inputValue()).toBe("");
  });

  test("should get only the selected option displayed when selected", async ({
    page,
  }) => {
    await page.locator("#heroSelect").selectOption("ant-man");
    await expect(page.locator("#result-s04")).toHaveText(
      "Selected heroes: Ant-Man",
    );

    await page.locator("#heroSelect").selectOption("aquaman");
    await expect(page.locator("#result-s04")).toHaveText(
      "Selected heroes: Aquaman",
    );

    await page.locator("#heroSelect").selectOption("the-avengers");
    await expect(page.locator("#result-s04")).toHaveText(
      "Selected heroes: The Avengers",
    );

    await page.locator("#heroSelect").selectOption("batman");
    await expect(page.locator("#result-s04")).toHaveText(
      "Selected heroes: Batman",
    );
  });

  test("should get all selected options displayed when selected", async ({
    page,
  }) => {
    await page
      .locator("#heroSelect")
      .selectOption(["ant-man", "aquaman", "batman"]);
    await expect(page.locator("#result-s04")).toHaveText(
      "Selected heroes: Ant-Man, Aquaman, Batman",
    );
  });

  test("should get selected option removed when deselected", async ({
    page,
  }) => {
    await page
      .locator("#heroSelect")
      .selectOption(["ant-man", "aquaman", "batman"]);

    await page.keyboard.down("Control");
    await page.locator("#heroSelect option[value='aquaman']").click();
    await page.keyboard.up("Control");

    await expect(page.locator("#result-s04")).toHaveText(
      "Selected heroes: Ant-Man, Batman",
    );
  });
});

test.describe("Custom Dropdown Listbox", () => {
  test("should have default text displayed as placeholder", async ({
    page,
  }) => {
    await expect(page.locator("#priorityDropdownTrigger")).toHaveText(
      "Choose priority",
    );
  });

  test("should open the dropdown list on click", async ({ page }) => {
    await page.locator("#priorityDropdownTrigger").click();

    await expect(page.locator("#priorityDropdownList")).toBeVisible();
  });

  test("should display the text and value in the dropdown", async ({
    page,
  }) => {
    await page.locator("#priorityDropdownTrigger").click();

    await expect(
      (await page.locator("#priorityDropdownList button span").allInnerTexts())
        .length,
    ).toBe(6);
  });

  test("should get the selected option displayed", async ({ page }) => {
    await page.locator("#priorityDropdownTrigger").click();

    await page.locator("[data-priority-value='low']").click();

    await expect(page.locator("#result-s05")).toHaveText(
      "Priority selected: Low Priority",
    );

    await page.locator("#priorityDropdownTrigger").click();

    await page.locator("[data-priority-value='medium']").click();

    await expect(page.locator("#result-s05")).toHaveText(
      "Priority selected: Medium Priority",
    );

    await page.locator("#priorityDropdownTrigger").click();

    await page.locator("[data-priority-value='high']").click();

    await expect(page.locator("#result-s05")).toHaveText(
      "Priority selected: High Priority",
    );
  });

  test("should not have the default option in the dropdown", async ({
    page,
  }) => {
    await page.locator("#priorityDropdownTrigger").click();

    await expect(
      (
        await page.locator("#priorityDropdownList button span").allInnerTexts()
      ).includes("Choose priority"),
    ).toBe(false);
  });
});

test.describe("Searchable City Combobox", () => {
  test("should have placeholder visible by default", async ({ page }) => {
    await expect(
      await page.locator("#citySearch").getAttribute("placeholder"),
    ).toBe("Search city");
    await expect(await page.locator("#citySearch").inputValue()).toBe("");
  });

  test("should have all options available when no input is provided", async ({
    page,
  }) => {
    await page.locator("#citySearch").click();

    const options = await page
      .locator("#cityResults li button span")
      .allInnerTexts();

    await expect(options.length).toBe(10);
  });

  test("should filter only relevant options when some input is provided", async ({
    page,
  }) => {
    await page.locator("#citySearch").click();
    await page.locator("#citySearch").fill("Pune");

    const options = await page
      .locator("#cityResults li button span")
      .allInnerTexts();

    await expect(options.length).toBe(2);
    await expect(options[0]).toBe("Pune");
  });

  test("should get the option selected with keyboard", async ({ page }) => {
    await page.locator("#citySearch").click();

    await page.keyboard.type("Pu");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");

    await expect(await page.locator("#citySearch").inputValue()).toBe("Pune");
    await expect(page.locator("#result-s06")).toHaveText(
      "City selected: Pune (city-pune)",
    );
  });

  test("should get the option selected on click", async ({ page }) => {
    await page.locator("#citySearch").click();
    await page.locator("[data-city-id='city-pune']").click();

    await expect(await page.locator("#citySearch").inputValue()).toBe("Pune");
    await expect(page.locator("#result-s06")).toHaveText(
      "City selected: Pune (city-pune)",
    );
  });

  test("should display no matches found with invalid input", async ({
    page,
  }) => {
    await page.locator("#citySearch").click();
    await page.locator("#citySearch").fill("Non-city");

    await expect(page.locator("#cityResults")).toHaveText(
      "No city matches found",
    );
  });
});
