import { expect, test } from "@playwright/test";

test("renders the public landing page with key sections", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: /hamza, architecte et .*veloppeur full-stack/i,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /voir les projets/i }),
  ).toBeVisible();
  await expect(page.getByText(/projets choisis/i)).toBeVisible();
  await expect(page.getByText(/contact/i).first()).toBeVisible();
});

test("redirects admin dashboard to sign-in when unauthenticated", async ({
  page,
}) => {
  await page.goto("/admin");

  await expect(page).toHaveURL(/\/admin\/sign-in/);
  await expect(
    page.getByRole("heading", { name: /connexion admin/i }),
  ).toBeVisible();
});
