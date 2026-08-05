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

    await expect(input).toBeEnabled();
    await expect(input).toHaveValue("Dune");
  });

  test("should filter the book list on input", async ({ page }) => {
    const input = searchInput(page);
    const rows = page.locator("[data-testid='book-row']");

    await input.fill("Dune");
    await expect(await rows.allInnerTexts()).toHaveLength(1);

    await input.fill("clean");
    await expect(await rows.allInnerTexts()).toHaveLength(2);
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
    await expect(names).toHaveLength(1);
    await expect(names[0]).toBe("Dune");

    await input.fill("clean");
    names = await bookNameCells.allInnerTexts();
    await expect(names).toHaveLength(2);
    await expect(names[0]).toBe("Clean Code");
    await expect(names[1]).toBe("The Clean Coder");
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
    await expect(names).toHaveLength(1);
    await expect(names[0]).toBe("Dune");

    await input.clear();
    names = await bookNameCells.allInnerTexts();
    await expect(names).toHaveLength(5);
    await expect(names[0]).toBe("The Pragmatic Programmer");
    await expect(names[1]).toBe("Clean Code");
    await expect(names[2]).toBe("Design Patterns");
    await expect(names[3]).toBe("The Hobbit");
    await expect(names[4]).toBe("Dune");
  });
});

test.describe("Filter dropdown", () => {
  const filterDropdown = (page: Page): Locator =>
    page.locator("#genre-filter-select");

  test("should be enabled", async ({ page }) => {
    const dropdown = filterDropdown(page);
    await expect(dropdown).toBeEnabled();
  });

  test("should contain all the expected genres", async ({ page }) => {
    const dropdown = filterDropdown(page);
    await expect(dropdown).toHaveText(
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
    await expect(names).toHaveLength(2);
    await expect(names[0]).toBe("1984");
    await expect(names[1]).toBe("Brave New World");
  });
});

test.describe("Add book form", () => {
  test("should open on press of the Add Book button", async ({ page }) => {
    await page.locator('[data-testid="btn-add-book"]').click();

    await expect(page.locator('[data-testid="add-book-dialog"]')).toBeVisible();
  });

  test("should contain all the expected fields", async ({ page }) => {
    await page.locator('[data-testid="btn-add-book"]').click();

    await expect(page.locator("#add-dialog-title")).toBeVisible();

    await expect(page.locator("label[for='add-book-name']")).toBeVisible();
    await expect(page.locator("#add-book-name")).toBeEnabled();

    await expect(page.locator("label[for='add-book-author']")).toBeVisible();
    await expect(page.locator("#add-book-author")).toBeEnabled();

    await expect(page.locator("label[for='add-book-genre']")).toBeVisible();
    await expect(page.locator("#add-book-genre")).toBeEnabled();

    await expect(page.locator("label[for='add-book-published']")).toBeVisible();
    await expect(page.locator("#add-book-published")).toBeEnabled();

    await expect(
      page.locator('[data-testid="add-book-dialog"]').getByText("ISBN"),
    ).toBeVisible();
    await expect(page.getByPlaceholder("9780000000000")).toBeEnabled();

    await expect(
      page.locator('[data-testid="add-dialog-cancel"]'),
    ).toBeEnabled();
    await expect(page.locator('[data-testid="add-dialog-save"]')).toBeEnabled();
  });

  test("should have Name and Author fields required", async ({ page }) => {
    await page.locator('[data-testid="btn-add-book"]').click();
    await expect(
      await page.locator("#add-book-name").getAttribute("aria-required"),
    ).toBe("true");
    await expect(
      await page.locator("#add-book-author").getAttribute("aria-required"),
    ).toBe("true");
  });

  test("should have the genre field with all the expected genres", async ({
    page,
  }) => {
    await page.locator('[data-testid="btn-add-book"]').click();

    const genres = await page.locator("#add-book-genre option").allInnerTexts();

    await expect(genres).toHaveLength(6);
    await expect(genres.join(",")).toBe(
      "Technology,Fantasy,Science Fiction,Dystopian,Fiction,Non-Fiction",
    );
  });

  test("should display error messages of Name and Author fields are empty", async ({
    page,
  }) => {
    await page.locator('[data-testid="btn-add-book"]').click();

    await page.locator('[data-testid="add-dialog-save"]').click();

    await expect(page.locator('[data-testid="add-name-error"]')).toBeVisible();
    await expect(page.locator('[data-testid="add-name-error"]')).toHaveText(
      "Book name is required",
    );
    await expect(
      page.locator('[data-testid="add-author-error"]'),
    ).toBeVisible();
    await expect(page.locator('[data-testid="add-author-error"]')).toHaveText(
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

    await expect(
      await page
        .locator('[data-testid="data-table-wrapper"] div')
        .allInnerTexts(),
    ).toHaveLength(4);

    await page.locator("#table-search-input").fill("Book name");

    const rows = page.locator("[data-testid='book-row']");
    await expect(await rows.allInnerTexts()).toHaveLength(1);
  });

  test("should not save the book when Cancel is pressed", async ({ page }) => {
    await page.locator('[data-testid="btn-add-book"]').click();

    await page.locator('[data-testid="add-input-book-name"]').fill("Book name");
    await page
      .locator('[data-testid="add-input-book-author"]')
      .fill("Author name");

    await page.locator('[data-testid="add-dialog-cancel"]').click();

    await expect(
      await page
        .locator('[data-testid="data-table-wrapper"] div')
        .allInnerTexts(),
    ).toHaveLength(4);

    await page.locator("#table-search-input").fill("Book name");

    const rows = page.locator("[data-testid='book-row']");
    await expect(await rows.allInnerTexts()).toHaveLength(0);
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

      await expect(tableHead.locator("th:nth-of-type(1)")).toHaveText("Sr No.");
      await expect(tableHead.locator("th:nth-of-type(2)")).toHaveText(
        "Book Name⇅",
      );
      await expect(tableHead.locator("th:nth-of-type(3)")).toHaveText(
        "Book Genre⇅",
      );
      await expect(tableHead.locator("th:nth-of-type(4)")).toHaveText(
        "Book Author⇅",
      );
      await expect(tableHead.locator("th:nth-of-type(5)")).toHaveText(
        "Book ISBN⇅",
      );
      await expect(tableHead.locator("th:nth-of-type(6)")).toHaveText(
        "Book Published⇅",
      );
      await expect(tableHead.locator("th:nth-of-type(7)")).toHaveText(
        "Actions",
      );
    });

    test("should sort the list ascending on click", async ({ page }) => {
      const tableHead = getTableHead(page);
      const srNoCells = getTableBody(page).locator("tr > td:first-child");

      await tableHead.locator("th:nth-of-type(2)").click();
      await expect((await srNoCells.allInnerTexts()).join(",")).toBe(
        "6,23,14,12,2",
      );

      await tableHead.locator("th:nth-of-type(3)").click();
      await expect((await srNoCells.allInnerTexts()).join(",")).toBe(
        "6,12,4,11,18",
      );

      await tableHead.locator("th:nth-of-type(4)").click();
      await expect((await srNoCells.allInnerTexts()).join(",")).toBe(
        "20,12,1,15,13",
      );

      await tableHead.locator("th:nth-of-type(5)").click();
      await expect((await srNoCells.allInnerTexts()).join(",")).toBe(
        "12,16,10,9,20",
      );

      await tableHead.locator("th:nth-of-type(6)").click();
      await expect((await srNoCells.allInnerTexts()).join(",")).toBe(
        "8,23,12,20,4",
      );
    });

    test("should sort the list descending on second click", async ({
      page,
    }) => {
      const tableHead = getTableHead(page);
      const srNoCells = getTableBody(page).locator("tr > td:first-child");

      await tableHead.locator("th:nth-of-type(2)").dblclick();
      await expect((await srNoCells.allInnerTexts()).join(",")).toBe(
        "10,15,21,1,18",
      );

      await tableHead.locator("th:nth-of-type(3)").dblclick();
      await expect((await srNoCells.allInnerTexts()).join(",")).toBe(
        "1,2,3,7,25",
      );

      await tableHead.locator("th:nth-of-type(4)").dblclick();
      await expect((await srNoCells.allInnerTexts()).join(",")).toBe(
        "9,19,2,25,16",
      );

      await tableHead.locator("th:nth-of-type(5)").dblclick();
      await expect((await srNoCells.allInnerTexts()).join(",")).toBe(
        "21,17,18,8,14",
      );

      await tableHead.locator("th:nth-of-type(6)").dblclick();
      await expect((await srNoCells.allInnerTexts()).join(",")).toBe(
        "21,14,15,25,9",
      );
    });

    test("should return the sorting to default on third click", async ({
      page,
    }) => {
      const tableHead = getTableHead(page);
      const srNoCells = getTableBody(page).locator("tr > td:first-child");

      await tableHead.locator("th:nth-of-type(2)").click();
      await tableHead.locator("th:nth-of-type(2)").click();
      await tableHead.locator("th:nth-of-type(2)").click();

      await expect((await srNoCells.allInnerTexts()).join(",")).toBe(
        "1,2,3,4,5",
      );

      await tableHead.locator("th:nth-of-type(3)").click();
      await tableHead.locator("th:nth-of-type(3)").click();
      await tableHead.locator("th:nth-of-type(3)").click();

      await expect((await srNoCells.allInnerTexts()).join(",")).toBe(
        "1,2,3,4,5",
      );

      await tableHead.locator("th:nth-of-type(4)").click();
      await tableHead.locator("th:nth-of-type(4)").click();
      await tableHead.locator("th:nth-of-type(4)").click();

      await expect((await srNoCells.allInnerTexts()).join(",")).toBe(
        "1,2,3,4,5",
      );

      await tableHead.locator("th:nth-of-type(5)").click();
      await tableHead.locator("th:nth-of-type(5)").click();
      await tableHead.locator("th:nth-of-type(5)").click();

      await expect((await srNoCells.allInnerTexts()).join(",")).toBe(
        "1,2,3,4,5",
      );

      await tableHead.locator("th:nth-of-type(6)").click();
      await tableHead.locator("th:nth-of-type(6)").click();
      await tableHead.locator("th:nth-of-type(6)").click();

      await expect((await srNoCells.allInnerTexts()).join(",")).toBe(
        "1,2,3,4,5",
      );
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
      await expect((await srNoCells.allInnerTexts()).join(",")).toBe(
        "11,12,13,14,15",
      );
      await expect(paginationButtons.nth(2)).toHaveAttribute(
        "aria-current",
        "page",
      );

      await tableHead.locator("th:nth-of-type(2)").click();
      await expect(paginationButtons.nth(2)).not.toHaveAttribute(
        "aria-current",
      );
      await expect(paginationButtons.nth(0)).toHaveAttribute(
        "aria-current",
        "page",
      );
    });
  });

  test.describe("rows", () => {
    test("should contain the expected values in cells", async ({ page }) => {
      const rows = page.locator('[data-testid="book-row"]');
      await expect(
        (await rows.nth(0).locator("td").allInnerTexts()).join(","),
      ).toBe(
        "1,The Pragmatic Programmer,Technology,Andrew Hunt,ISBN-9780135957059,1999-10-20,EditDelete",
      );
      await expect(
        (await rows.nth(4).locator("td").allInnerTexts()).join(","),
      ).toBe(
        "5,Dune,Science Fiction,Frank Herbert,ISBN-9780441013593,1965-08-01,EditDelete",
      );
    });

    test("should be displayed in pages of 5", async ({ page }) => {
      const rows = page.locator('[data-testid="book-row"]');

      await expect(await rows.allInnerTexts()).toHaveLength(5);
    });

    test("should have values starting with ISBN- in the ISBN column", async ({
      page,
    }) => {
      const rows = page.locator('[data-testid="book-row"]');

      const ISBNCells = rows.locator('[data-col="book-isbn"]');
      await expect(
        (await ISBNCells.allInnerTexts()).every((isbn) =>
          isbn.startsWith("ISBN-"),
        ),
      ).toBe(true);
    });

    test.describe("action cell", () => {
      test("should contain two buttons with correct text", async ({ page }) => {
        const rows = page.locator('[data-testid="book-row"]');
        const actionCell1Buttons = rows
          .nth(0)
          .locator('[data-col="actions"] button');

        await expect(await actionCell1Buttons.allInnerTexts()).toHaveLength(2);
        await expect(actionCell1Buttons.nth(0)).toHaveText("Edit");
        await expect(actionCell1Buttons.nth(1)).toHaveText("Delete");
      });

      test.describe("Edit button", () => {
        test("should open the editing pop-up on click", async ({ page }) => {
          await page.locator('[data-testid="btn-edit-book"]').nth(0).click();

          await expect(
            page.locator('[data-testid="edit-book-dialog"]'),
          ).toBeVisible();
        });

        test.describe("Edit pop-up", () => {
          test.beforeEach(async ({ page }) => {
            await page.locator('[data-testid="btn-edit-book"]').nth(0).click();
          });

          test("should have correct title an subtitle", async ({ page }) => {
            await expect(
              page.locator('[data-testid="edit-book-dialog"] h2'),
            ).toHaveText("Edit Book");
            await expect(
              page.locator('[data-testid="edit-book-dialog"] p'),
            ).toHaveText("Editing: The Pragmatic Programmer");
          });

          test("should have all expected fields", async ({ page }) => {
            await expect(
              page.locator("label[for='edit-book-name']"),
            ).toBeVisible();
            await expect(page.locator("#edit-book-name")).toBeEnabled();

            await expect(
              page.locator("label[for='edit-book-author']"),
            ).toBeVisible();
            await expect(page.locator("#edit-book-author")).toBeEnabled();

            await expect(
              page.locator("label[for='edit-book-genre']"),
            ).toBeVisible();
            await expect(page.locator("#edit-book-genre")).toBeEnabled();

            await expect(
              page.locator("label[for='edit-book-published']"),
            ).toBeVisible();
            await expect(page.locator("#edit-book-published")).toBeEnabled();

            await expect(
              page
                .locator('[data-testid="edit-book-dialog"]')
                .getByText("ISBN"),
            ).toBeVisible();
            await expect(
              page.locator('[name="isbn_field_book-001"]'),
            ).toBeEnabled();

            await expect(
              page.locator('[data-testid="edit-dialog-cancel"]'),
            ).toBeEnabled();
            await expect(
              page.locator('[data-testid="edit-dialog-save"]'),
            ).toBeEnabled();
          });

          test("should save the edits to the book on Save Changes", async ({
            page,
          }) => {
            await page.locator("#edit-book-name").fill("New Book Name");
            await page.locator('[data-testid="edit-dialog-save"]').click();

            await expect(
              page.locator('[data-col="book-name"]').nth(1),
            ).toHaveText("New Book Name");
          });

          test("should discard changes on Cancel", async ({ page }) => {
            await page.locator("#edit-book-name").fill("New Book Name");
            await page.locator('[data-testid="edit-dialog-cancel"]').click();

            await expect(
              page.locator('[data-col="book-name"]').nth(1),
            ).toHaveText("The Pragmatic Programmer");
          });
        });
      });

      test.describe("Delete button", () => {
        test.beforeEach(async ({ page }) => {
          const rows = page.locator('[data-testid="book-row"]');
          const actionCell1Buttons = rows
            .nth(0)
            .locator('[data-col="actions"] button');

          await actionCell1Buttons.nth(1).click();
        });

        test("should open confirmation pop-up on click", async ({ page }) => {
          await expect(
            page.locator('[data-testid="delete-book-dialog"]'),
          ).toBeVisible();
        });

        test("should open confirmation pop-up with correct text", async ({
          page,
        }) => {
          await expect(
            page.locator('[data-testid="delete-book-dialog"] h2'),
          ).toHaveText("Delete Book");
          await expect(
            page.locator('[data-testid="delete-book-dialog"] p'),
          ).toHaveText("The Pragmatic Programmer will be permanently removed.");
          await expect(
            page.locator('[data-testid="delete-book-dialog"] button').nth(0),
          ).toHaveText("Cancel");
          await expect(
            page.locator('[data-testid="delete-book-dialog"] button').nth(1),
          ).toHaveText("Delete");
        });

        test("should delete the row on confirm", async ({ page }) => {
          await page
            .locator('[data-testid="delete-book-dialog"] button')
            .nth(1)
            .click();

          await expect(
            page.locator('[data-col="book-name"]').nth(1),
          ).toHaveText("Clean Code");
        });

        test("should cancel the deletion of the row on cancel", async ({
          page,
        }) => {
          await page
            .locator('[data-testid="delete-book-dialog"] button')
            .nth(0)
            .click();

          await expect(
            page.locator('[data-col="book-name"]').nth(1),
          ).toHaveText("The Pragmatic Programmer");
        });
      });
    });
  });

  test.describe("footer", () => {
    test("should have pagination buttons", async ({ page }) => {
      const footer = page.getByTestId("pagination");
      const footerButtons = footer.locator("button");

      await expect(await footerButtons.allInnerTexts()).toHaveLength(7);
      await expect(footerButtons.nth(0)).toHaveText("‹");
      await expect(footerButtons.nth(1)).toHaveText("1");
      await expect(footerButtons.nth(2)).toHaveText("2");
      await expect(footerButtons.nth(3)).toHaveText("3");
      await expect(footerButtons.nth(4)).toHaveText("4");
      await expect(footerButtons.nth(5)).toHaveText("5");
      await expect(footerButtons.nth(6)).toHaveText("›");
    });

    test("should have current page number and number of pages/rows displayed", async ({
      page,
    }) => {
      const rowCount = page.getByTestId("row-count");
      const footerButtons = page.getByTestId("pagination").locator("button");

      await expect(rowCount).toHaveText("25 books — page 1 of 5");

      await page.getByText("Delete").nth(0).click();
      await page
        .locator('[data-testid="delete-book-dialog"] button')
        .nth(1)
        .click();

      await footerButtons.nth(3).click();
      await expect(rowCount).toHaveText("24 books — page 3 of 5");
    });

    test("should switch the page on click of the numbered pagination button", async ({
      page,
    }) => {
      const rowCount = page.getByTestId("row-count");
      const footerButtons = page.getByTestId("pagination").locator("button");

      await expect(rowCount).toHaveText("25 books — page 1 of 5");

      await footerButtons.nth(3).click();
      await expect(rowCount).toHaveText("25 books — page 3 of 5");
    });

    test("should update the row count on after deleting a row", async ({
      page,
    }) => {
      const rowCount = page.getByTestId("row-count");

      await page.getByText("Delete").nth(0).click();
      await page
        .locator('[data-testid="delete-book-dialog"] button')
        .nth(1)
        .click();

      await expect(rowCount).toHaveText("24 books — page 1 of 5");
    });

    test("should switch to the next page on click of the > pagination button", async ({
      page,
    }) => {
      const rowCount = page.getByTestId("row-count");
      const footerButtons = page.getByTestId("pagination").locator("button");

      await expect(rowCount).toHaveText("25 books — page 1 of 5");

      await footerButtons.nth(6).click();
      await expect(rowCount).toHaveText("25 books — page 2 of 5");
    });

    test("should switch to the previous page on click of the < pagination button", async ({
      page,
    }) => {
      const rowCount = page.getByTestId("row-count");
      const footerButtons = page.getByTestId("pagination").locator("button");

      await expect(rowCount).toHaveText("25 books — page 1 of 5");

      await footerButtons.nth(6).click();
      await expect(rowCount).toHaveText("25 books — page 2 of 5");
      await footerButtons.nth(0).click();
      await expect(rowCount).toHaveText("25 books — page 1 of 5");
    });

    test("should have the > pagination button disabled on the last page", async ({
      page,
    }) => {
      const footerButtons = page.getByTestId("pagination").locator("button");

      await footerButtons.nth(5).click();
      await expect(footerButtons.nth(6)).toBeDisabled();
    });

    test("should have the < pagination button disabled on the first page", async ({
      page,
    }) => {
      const footerButtons = page.getByTestId("pagination").locator("button");

      await expect(footerButtons.nth(0)).toBeDisabled();
    });
  });
});
