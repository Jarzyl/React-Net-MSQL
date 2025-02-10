import { test, expect } from '@playwright/test';

test('should register a new user successfully', async ({ page }) => {
  // Przejdź do strony rejestracji
  await page.goto('http://localhost:3000/register');

  // Wypełnij formularz rejestracji
  await page.fill('input[name="userName"]', 'Jan');
  await page.fill('input[name="lastName"]', 'Kowalski');
  await page.fill('input[name="email"]', 'jan.kowalski@example.com');
  await page.fill('input[name="password"]', '12345');
  await page.fill('input[name="confirmPassword"]', '12345');

  // Kliknij przycisk rejestracji
  await page.click('button[type="submit"]');

  // Sprawdź, czy użytkownik został przekierowany na stronę logowania
  await expect(page).toHaveURL('http://localhost:3000/login');
  await expect(page.locator('h2')).toContainText('Sign in to your account'); 
});

test('should show error when passwords do not match', async ({ page }) => {
  // Przejdź do strony rejestracji
  await page.goto('http://localhost:3000/register');

  // Wypełnij formularz rejestracji z różnymi hasłami
  await page.fill('input[name="userName"]', 'Jan');
  await page.fill('input[name="lastName"]', 'Kowalski');
  await page.fill('input[name="email"]', 'marian@example.com');
  await page.fill('input[name="password"]', 'SuperPassword123');
  await page.fill('input[name="confirmPassword"]', 'DifferentPassword123');

  // Kliknij przycisk rejestracji
  await page.click('button[type="submit"]');

  // Sprawdź, czy pojawił się komunikat o błędzie dla potwierdzenia hasła
  await expect(page.locator('text=Hasła muszą być takie same.')).toBeVisible();
});

test('should show error when email is already taken', async ({ page }) => {
  // Załóżmy, że ten email już jest zarejestrowany
  const emailInUse = 'marian@example.com';

  // Przejdź do strony rejestracji
  await page.goto('http://localhost:3000/register');

  // Wypełnij formularz rejestracji z zajętym emailem
  await page.fill('input[name="userName"]', 'Jan');
  await page.fill('input[name="lastName"]', 'Kowalski');
  await page.fill('input[name="email"]', emailInUse);
  await page.fill('input[name="password"]', 'SuperPassword123');
  await page.fill('input[name="confirmPassword"]', 'SuperPassword123');

  // Kliknij przycisk rejestracji
  await page.click('button[type="submit"]');

  // Sprawdź, czy pojawił się komunikat o błędzie dla emaila
  await expect(page.locator('text=Rejestracja nie powiodła się.')).toBeVisible();
});
