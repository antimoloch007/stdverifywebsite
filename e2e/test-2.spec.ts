import { test as base, expect, devices } from '@playwright/test';

const test = base.extend({
  browserName: 'chromium',
  viewport: devices['iPhone 12'].viewport,
  userAgent: devices['iPhone 12'].userAgent,
  deviceScaleFactor: devices['iPhone 12'].deviceScaleFactor,
  isMobile: devices['iPhone 12'].isMobile,
  hasTouch: devices['iPhone 12'].hasTouch,
});

test('mobile-specific test', async ({ page }) => {
  await page.goto('http://stdverify.org/');
  await page.getByRole('button', { name: 'Toggle navigation menu' }).click();
  await page.locator('#mobile-contact-button-mobile').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Sign Up For The Beta' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('button', { name: 'Start' }).click();
  await page1.getByRole('checkbox', { name: 'Continue' }).check();
  await page1.getByRole('button', { name: 'OK' }).click();
  await page.locator('#contact-modal').getByText('×').click();
  await page1.close();
  await page.getByRole('link', { name: 'FAQ' }).nth(1).click();
  await page.getByText('Does STD Verify store my test').click();
  await page.getByText('How does STD Verify work?').click();
  await page.getByText('What are zero-knowledge').click();
  await page.getByText('What is STD Verify?').click();
  await page.getByText('How often should I update my').click();
  await page.getByRole('link', { name: 'Privacy Policy' }).click();
  await page.getByRole('heading', { name: 'Security Measures' }).click();
  await page.getByRole('heading', { name: 'Your Rights Under HIPAA' }).click();
  await page.getByRole('heading', { name: 'Children\'s Privacy' }).click();
  await page.getByRole('heading', { name: '13. Legal Basis for' }).click();
  await page.close();
});
