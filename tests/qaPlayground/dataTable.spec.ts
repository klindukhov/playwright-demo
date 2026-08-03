import { test, expect, Page, Locator } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://qaplayground.com/practice/data-table");
});

test.describe("Search Bar", () => {
  const searchInput = (page: Page): Locator =>
    page.locator("#table-search-input");

  test("should be enabled and accept input", async ({ page }) => {
    const input = searchInput(page);
    await input.fill("Dune");

    expect(input).toBeEnabled();
    expect(input).toHaveValue("Dune");
  });

  test("should filter the book list on input", async ({ page }) => {
    const input = searchInput(page);
    const rows = page.locator("[data-testid='book-row']");

    await input.fill("Dune");
    expect(await rows.allInnerTexts()).toHaveLength(1);

    await input.fill("clean");
    expect(await rows.allInnerTexts()).toHaveLength(2);
  });

  test("should display only the books relevant to the search query", async ({
    page,
  }) => {
    const input = searchInput(page);
    const bookNameCells = page.locator(
      "[data-testid='book-row'] td:nth-child(2)",
    );

    await input.fill("Dune");
    let names = await bookNameCells.allInnerTexts();
    expect(names).toHaveLength(1);
    expect(names[0]).toBe("Dune");

    await input.fill("clean");
    names = await bookNameCells.allInnerTexts();
    expect(names).toHaveLength(2);
    expect(names[0]).toBe("Clean Code");
    expect(names[1]).toBe("The Clean Coder");
  });
  test("should restore the table state on clearing the input", async ({
    page,
  }) => {
    const input = searchInput(page);
    const bookNameCells = page.locator(
      "[data-testid='book-row'] td:nth-child(2)",
    );

    await input.fill("Dune");
    let names = await bookNameCells.allInnerTexts();
    expect(names).toHaveLength(1);
    expect(names[0]).toBe("Dune");

    await input.clear();
    names = await bookNameCells.allInnerTexts();
    expect(names).toHaveLength(5);
    expect(names[0]).toBe("The Pragmatic Programmer");
    expect(names[1]).toBe("Clean Code");
    expect(names[2]).toBe("Design Patterns");
    expect(names[3]).toBe("The Hobbit");
    expect(names[4]).toBe("Dune");
  });
});

test.describe("Filter dropdown", () => {
  const filterDropdown = (page: Page): Locator =>
    page.locator("#genre-filter-select");

  test("should be enabled", async ({ page }) => {
    const dropdown = filterDropdown(page);
    expect(dropdown).toBeEnabled();
  });

  test("should contain all the expected genres", async ({ page }) => {
    const dropdown = filterDropdown(page);
    expect(dropdown).toHaveText(
      "All GenresTechnologyFantasyScience FictionDystopianFictionNon-Fiction",
    );
  });

  test("should filter the book list on change", async ({ page }) => {
    const dropdown = filterDropdown(page);
    await dropdown.focus();
    await page.keyboard.press("Space");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("ArrowDown");
    await page.keyboard.press("Enter");

    const bookNameCells = page.locator(
      "[data-testid='book-row'] td:nth-child(2)",
    );

    const names = await bookNameCells.allInnerTexts();
    expect(names).toHaveLength(2);
    expect(names[0]).toBe("1984");
    expect(names[1]).toBe("Brave New World");
  });
});

test.describe("Add book form", () => {
  test("should open on press of the Add Book button", async ({ page }) => {
    await page.locator('[data-testid="btn-add-book"]').click();

    expect(page.locator('[data-testid="add-book-dialog"]')).toBeVisible();
  });

  test("should contain all the expected fields", async ({ page }) => {
    await page.locator('[data-testid="btn-add-book"]').click();

    expect(page.locator("#add-dialog-title")).toBeVisible();

    expect(page.locator("label[for='add-book-name']")).toBeVisible();
    expect(page.locator("#add-book-name")).toBeEnabled();

    expect(page.locator("label[for='add-book-author']")).toBeVisible();
    expect(page.locator("#add-book-author")).toBeEnabled();

    expect(page.locator("label[for='add-book-genre']")).toBeVisible();
    expect(page.locator("#add-book-genre")).toBeEnabled();

    expect(page.locator("label[for='add-book-published']")).toBeVisible();
    expect(page.locator("#add-book-published")).toBeEnabled();

    expect(
      page.locator('[data-testid="add-book-dialog"]').getByText("ISBN"),
    ).toBeVisible();
    expect(page.getByPlaceholder("9780000000000")).toBeEnabled();

    expect(page.locator('[data-testid="add-dialog-cancel"]')).toBeEnabled();
    expect(page.locator('[data-testid="add-dialog-save"]')).toBeEnabled();
  });

  test("should have Name and Author fields required", async ({ page }) => {
    await page.locator('[data-testid="btn-add-book"]').click();
    expect(
      await page.locator("#add-book-name").getAttribute("aria-required"),
    ).toBe("true");
    expect(
      await page.locator("#add-book-author").getAttribute("aria-required"),
    ).toBe("true");
  });

  test("should have the genre field with all the expected genres", async ({
    page,
  }) => {
    await page.locator('[data-testid="btn-add-book"]').click();

    const genres = await page.locator("#add-book-genre option").allInnerTexts();

    expect(genres).toHaveLength(6);
    expect(genres.join(",")).toBe(
      "Technology,Fantasy,Science Fiction,Dystopian,Fiction,Non-Fiction",
    );
  });

  test("should display error messages of Name and Author fields are empty", async ({
    page,
  }) => {
    await page.locator('[data-testid="btn-add-book"]').click();

    await page.locator('[data-testid="add-dialog-save"]').click();

    expect(page.locator('[data-testid="add-name-error"]')).toBeVisible();
    expect(page.locator('[data-testid="add-name-error"]')).toHaveText(
      "Book name is required",
    );
    expect(page.locator('[data-testid="add-author-error"]')).toBeVisible();
    expect(page.locator('[data-testid="add-author-error"]')).toHaveText(
      "Author is required",
    );
  });

  test("should save the book when the valid input is provided an Save is pressed", async ({
    page,
  }) => {
    await page.locator('[data-testid="btn-add-book"]').click();

    await page.locator('[data-testid="add-input-book-name"]').fill("Book name");
    await page
      .locator('[data-testid="add-input-book-author"]')
      .fill("Author name");

    await page.locator('[data-testid="add-dialog-save"]').click();

    expect(
      await page
        .locator('[data-testid="data-table-wrapper"] div')
        .allInnerTexts(),
    ).toHaveLength(4);

    await page.locator("#table-search-input").fill("Book name");

    const rows = page.locator("[data-testid='book-row']");
    expect(await rows.allInnerTexts()).toHaveLength(1);
  });

  test("should not save the book when Cancel is pressed", async ({ page }) => {
    await page.locator('[data-testid="btn-add-book"]').click();

    await page.locator('[data-testid="add-input-book-name"]').fill("Book name");
    await page
      .locator('[data-testid="add-input-book-author"]')
      .fill("Author name");

    await page.locator('[data-testid="add-dialog-cancel"]').click();

    expect(
      await page
        .locator('[data-testid="data-table-wrapper"] div')
        .allInnerTexts(),
    ).toHaveLength(4);

    await page.locator("#table-search-input").fill("Book name");

    const rows = page.locator("[data-testid='book-row']");
    expect(await rows.allInnerTexts()).toHaveLength(0);
  });
});

test.describe("Data table", () => {
  const getTableHead = (page: Page): Locator =>
    page.locator("thead[data-testid='table-head']");
  const getTableBody = (page: Page): Locator =>
    page.locator("tbody[data-testid='table-body']");

  test.describe("columns", () => {
    test("should be all displayed and have correct names", async ({ page }) => {
      const tableHead = getTableHead(page);

      expect(tableHead.locator("th:nth-of-type(1)")).toHaveText("Sr No.");
      expect(tableHead.locator("th:nth-of-type(2)")).toHaveText("Book Name⇅");
      expect(tableHead.locator("th:nth-of-type(3)")).toHaveText("Book Genre⇅");
      expect(tableHead.locator("th:nth-of-type(4)")).toHaveText("Book Author⇅");
      expect(tableHead.locator("th:nth-of-type(5)")).toHaveText("Book ISBN⇅");
      expect(tableHead.locator("th:nth-of-type(6)")).toHaveText(
        "Book Published⇅",
      );
      expect(tableHead.locator("th:nth-of-type(7)")).toHaveText("Actions");
    });

    test("should sort the list ascending on click", async ({ page }) => {
      const tableHead = getTableHead(page);
      const srNoCells = getTableBody(page).locator("tr > td:first-child");

      await tableHead.locator("th:nth-of-type(2)").click();
      expect((await srNoCells.allInnerTexts()).join(",")).toBe("6,23,14,12,2");

      await tableHead.locator("th:nth-of-type(3)").click();
      expect((await srNoCells.allInnerTexts()).join(",")).toBe("6,12,4,11,18");

      await tableHead.locator("th:nth-of-type(4)").click();
      expect((await srNoCells.allInnerTexts()).join(",")).toBe("20,12,1,15,13");

      await tableHead.locator("th:nth-of-type(5)").click();
      expect((await srNoCells.allInnerTexts()).join(",")).toBe("12,16,10,9,20");

      await tableHead.locator("th:nth-of-type(6)").click();
      expect((await srNoCells.allInnerTexts()).join(",")).toBe("8,23,12,20,4");
    });

    test("should sort the list descending on second click", async ({
      page,
    }) => {
      const tableHead = getTableHead(page);
      const srNoCells = getTableBody(page).locator("tr > td:first-child");

      await tableHead.locator("th:nth-of-type(2)").dblclick();
      expect((await srNoCells.allInnerTexts()).join(",")).toBe("10,15,21,1,18");

      await tableHead.locator("th:nth-of-type(3)").dblclick();
      expect((await srNoCells.allInnerTexts()).join(",")).toBe("1,2,3,7,25");

      await tableHead.locator("th:nth-of-type(4)").dblclick();
      expect((await srNoCells.allInnerTexts()).join(",")).toBe("9,19,2,25,16");

      await tableHead.locator("th:nth-of-type(5)").dblclick();
      expect((await srNoCells.allInnerTexts()).join(",")).toBe("21,17,18,8,14");

      await tableHead.locator("th:nth-of-type(6)").dblclick();
      expect((await srNoCells.allInnerTexts()).join(",")).toBe("21,14,15,25,9");
    });

    test("should return the sorting to default on third click", async ({
      page,
    }) => {
      const tableHead = getTableHead(page);
      const srNoCells = getTableBody(page).locator("tr > td:first-child");

      await tableHead.locator("th:nth-of-type(2)").click();
      await tableHead.locator("th:nth-of-type(2)").click();
      await tableHead.locator("th:nth-of-type(2)").click();

      expect((await srNoCells.allInnerTexts()).join(",")).toBe("1,2,3,4,5");

      await tableHead.locator("th:nth-of-type(3)").click();
      await tableHead.locator("th:nth-of-type(3)").click();
      await tableHead.locator("th:nth-of-type(3)").click();

      expect((await srNoCells.allInnerTexts()).join(",")).toBe("1,2,3,4,5");

      await tableHead.locator("th:nth-of-type(4)").click();
      await tableHead.locator("th:nth-of-type(4)").click();
      await tableHead.locator("th:nth-of-type(4)").click();

      expect((await srNoCells.allInnerTexts()).join(",")).toBe("1,2,3,4,5");

      await tableHead.locator("th:nth-of-type(5)").click();
      await tableHead.locator("th:nth-of-type(5)").click();
      await tableHead.locator("th:nth-of-type(5)").click();

      expect((await srNoCells.allInnerTexts()).join(",")).toBe("1,2,3,4,5");

      await tableHead.locator("th:nth-of-type(6)").click();
      await tableHead.locator("th:nth-of-type(6)").click();
      await tableHead.locator("th:nth-of-type(6)").click();

      expect((await srNoCells.allInnerTexts()).join(",")).toBe("1,2,3,4,5");
    });

    test("should reset pagination to page 1 on sort change", async ({
      page,
    }) => {
      const tableHead = getTableHead(page);
      const srNoCells = getTableBody(page).locator("tr > td:first-child");

      const paginationButtons = page
        .locator('[data-testid="pagination"]')
        .getByTestId(/pagination-page-\d/);

      await paginationButtons.nth(2).click();
      expect((await srNoCells.allInnerTexts()).join(",")).toBe(
        "11,12,13,14,15",
      );
      expect(paginationButtons.nth(2)).toHaveAttribute("aria-current", "page");

      await tableHead.locator("th:nth-of-type(2)").click();
      expect(paginationButtons.nth(2)).not.toHaveAttribute("aria-current");
      expect(paginationButtons.nth(0)).toHaveAttribute("aria-current", "page");
    });
  });

  test.describe("rows", () => {
    test("should contain the expected values in cells", ({ page }) => {});

    test("should be displayed in pages of 5", ({ page }) => {});
    test("should have values starting with ISBN- in the ISBN column", async ({
      page,
    }) => {});

    test.describe("action cell", () => {
      test("should contain two buttons with correct text", async ({
        page,
      }) => {});

      test.describe("Edit button", () => {
        test("should open the editing pop-up on click", async ({ page }) => {});

        test.describe("Edit pop-up", () => {
          test("should have all expected fields", async ({ page }) => {});
          test("should save the edits to the book on Save Changes", async ({
            page,
          }) => {});
          test("should discard changes on Cancel", async ({ page }) => {});
        });
      });

      test.describe("Delete button", () => {
        test("should open confirmation pop-up on click", async ({
          page,
        }) => {});
        test("should open confirmation pop-up with correct text", async ({
          page,
        }) => {});
        test("should delete the row on confirm", async ({ page }) => {});
        test("should cancel the deletion of the row on cancel", async ({
          page,
        }) => {});
      });
    });
  });

  test.describe("footer", () => {
    test("should have pagination buttons", async ({ page }) => {});
    test("should have page numbers an number of rows", async ({ page }) => {});
    test("should switch the page on click of the numbered pagination button", async ({
      page,
    }) => {});
    test("should switch to the next page on click of the > pagination button", async ({
      page,
    }) => {});
    test("should switch to the previous page on click of the < pagination button", async ({
      page,
    }) => {});
    test("should have the > pagination button disabled on the last page", async ({
      page,
    }) => {});
    test("should have the < pagination button disabled on the first page", async ({
      page,
    }) => {});
  });
});
