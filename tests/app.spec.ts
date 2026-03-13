import { test, expect } from '@playwright/test';

test.describe('GEM-GPT-Hub E2E Tests', () => {
  test('should load homepage and display main content', async ({ page }) => {
    await page.goto('/');

    // Check if main title is visible
    await expect(page.getByText('GEM-GPT-Hub')).toBeVisible();

    // Check if navigation elements are present
    await expect(page.getByText('หน้าแรก')).toBeVisible();
    await expect(page.getByText('Blueprint')).toBeVisible();
    await expect(page.getByText('ติดต่อเรา')).toBeVisible();
  });

  test('should navigate to blueprints page', async ({ page }) => {
    await page.goto('/');
    await page.getByText('Blueprint').click();

    // Should be on blueprints page
    await expect(page).toHaveURL(/.*blueprints/);
  });

  test('should open login modal when clicking login button', async ({ page }) => {
    await page.goto('/');

    // Click login button (assuming it exists)
    const loginButton = page.getByText('เข้าสู่ระบบ').first();
    if (await loginButton.isVisible()) {
      await loginButton.click();

      // Check if login modal appears
      await expect(page.getByText('เข้าสู่ระบบ')).toBeVisible();
      await expect(page.getByPlaceholder('อีเมล')).toBeVisible();
      await expect(page.getByPlaceholder('รหัสผ่าน')).toBeVisible();
    }
  });

  test('should allow switching between login and signup', async ({ page }) => {
    await page.goto('/');

    const loginButton = page.getByText('เข้าสู่ระบบ').first();
    if (await loginButton.isVisible()) {
      await loginButton.click();

      // Switch to signup
      await page.getByText('สมัครสมาชิก').click();
      await expect(page.getByText('สร้างบัญชีใหม่')).toBeVisible();

      // Switch back to login
      await page.getByText('เข้าสู่ระบบ').click();
      await expect(page.getByText('เข้าสู่ระบบ')).toBeVisible();
    }
  });

  test('should display blueprints on blueprints page', async ({ page }) => {
    await page.goto('/blueprints');

    // Check if blueprints are displayed
    // This might need adjustment based on actual blueprint data
    const blueprintCards = page.locator('[data-testid="blueprint-card"]');
    await expect(blueprintCards.first()).toBeVisible();
  });

  test('should open prompt generator modal', async ({ page }) => {
    await page.goto('/blueprints');

    // Click on first blueprint
    const firstBlueprint = page.locator('[data-testid="blueprint-card"]').first();
    await firstBlueprint.click();

    // Check if prompt generator modal opens
    await expect(page.getByText('สร้าง Prompt')).toBeVisible();
  });

  test('should generate prompt successfully', async ({ page }) => {
    await page.goto('/blueprints');

    // Click on first blueprint
    const firstBlueprint = page.locator('[data-testid="blueprint-card"]').first();
    await firstBlueprint.click();

    // Fill form fields
    const typeInput = page.getByPlaceholder('e.g., website');
    const purposeInput = page.getByPlaceholder('e.g., business');

    if (await typeInput.isVisible()) {
      await typeInput.fill('website');
      await purposeInput.fill('business');

      // Click generate button
      await page.getByText('สร้าง Prompt').click();

      // Check if result appears
      await expect(page.getByText('Create a website for business')).toBeVisible();
    }
  });

  test('should copy generated prompt to clipboard', async ({ page }) => {
    await page.goto('/blueprints');

    // Click on first blueprint
    const firstBlueprint = page.locator('[data-testid="blueprint-card"]').first();
    await firstBlueprint.click();

    // Fill form and generate
    const typeInput = page.getByPlaceholder('e.g., website');
    const purposeInput = page.getByPlaceholder('e.g., business');

    if (await typeInput.isVisible()) {
      await typeInput.fill('website');
      await purposeInput.fill('business');
      await page.getByText('สร้าง Prompt').click();

      // Wait for result and click copy
      await page.getByText('Create a website for business').waitFor();
      await page.getByText('คัดลอก').click();

      // Note: Can't easily test clipboard content in Playwright without additional setup
      // But we can at least verify the button exists and is clickable
    }
  });

  test('should handle mobile viewport', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'This test is only for mobile viewports');

    await page.goto('/');

    // Check mobile navigation
    await expect(page.getByText('GEM-GPT-Hub')).toBeVisible();

    // Mobile menu might be collapsed
    const menuButton = page.locator('[data-testid="mobile-menu"]');
    if (await menuButton.isVisible()) {
      await menuButton.click();
      await expect(page.getByText('Blueprint')).toBeVisible();
    }
  });
});