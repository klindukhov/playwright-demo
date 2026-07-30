import { test, expect } from "@playwright/test";

test.describe("Search Bar", () => {
  test("should be enabled and accept input", async ({ page }) => {});
  test("should filter the book list on input", async ({ page }) => {});
  test("should display only the books relevant to the search query", async ({
    page,
  }) => {});
  test("should restore the table state on clearing the input", async ({
    page,
  }) => {});
});

test.describe("Filter dropdown", () => {
  test("should be enabled", async ({ page }) => {});
  test("should contain all the expected genres", async ({ page }) => {});
  test("should filter the book list on change", async ({ page }) => {});
});

test.describe("Add book form", () => {
  test("should open on press of the Add Book button", async ({ page }) => {});
  test("should contain all the expected fields", async ({ page }) => {});
  test("should have Name and Author fields required", async ({ page }) => {});
  test("should have the genre field with all the expected genres", async ({
    page,
  }) => {});
  test("should display error messages of Name and Author fields are empty", async ({
    page,
  }) => {});
  test("should save the book when the valid input is provided", async ({
    page,
  }) => {});
});

test.describe("Data table", () => {
  test.describe("columns", () => {
    test("should be all displayed and have correct names", async ({
      page,
    }) => {});
    test("should sort the list ascending on click", ({ page }) => {});
    test("should sort the list descending on second click", ({ page }) => {});
    test("should return the sorting to default on third click", ({
      page,
    }) => {});
    test("should reset pagination to page 1 on sort change", async ({
      page,
    }) => {});
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
