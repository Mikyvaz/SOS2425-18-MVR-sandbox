// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('localhost:16078');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Contact Manager/);
});


test('get contacts link', async ({ page }) => {
  await page.goto('localhost:16078');

  // Click the get started link.
  await page.getByRole('link', { name: 'Contacts' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page).toHaveTitle(/Contact list/);
});


test('create and delete contacts', async ({ page }) => {
  const testName = "__TEST_NAME__";
  const testPhone = "123456789";
  
  await page.goto('localhost:16078');

  // Click the get started link.
  await page.getByRole('link', { name: 'Contacts' }).click();

  await page.getByRole('textbox').nth(0).fill(testName);
  await page.getByRole('textbox').nth(1).fill(testPhone);

  await page.getByRole('button', {name: "Create"}).click();

  const contactRow = page.locator('tr',{ hasText: testName});
  await expect(contactRow).toContainText(testPhone); 
  
  const deleteButton = contactRow.getByRole('button',{ name: 'Delete'}); 
  await deleteButton.click();

  await expect(contactRow).toHaveCount(0);

});
