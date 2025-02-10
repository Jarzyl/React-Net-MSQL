import { test, expect } from '@playwright/test';

test('should log in successfully', async ({ page }) => {
  await page.goto('http://localhost:3000/login'); // Podaj odpowiednią stronę logowania

  await page.fill('input[name="email"]', 'bj.front.dev@gmail.com');
  await page.fill('input[name="password"]', '12345');
  await page.click('button[type="submit"]'); // Zakładając, że to przycisk logowania

  // Sprawdź, czy po zalogowaniu użytkownik trafia na stronę główną
  await expect(page).toHaveURL('http://localhost:3000/dashboard');
  await expect(page.locator('text=Dashboard panel')).toBeVisible(); // Upewnij się, że po zalogowaniu wyświetla się tekst
});
