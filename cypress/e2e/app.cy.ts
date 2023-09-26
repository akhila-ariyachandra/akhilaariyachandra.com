/* eslint-disable */
// Disable ESLint to prevent failing linting inside the Next.js repo.
// If you're using ESLint on your project, we recommend installing the ESLint Cypress plugin instead:
// https://github.com/cypress-io/eslint-plugin-cypress

// Cypress E2E Test
describe("Navigation", () => {
  it("should navigate to the about page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    // Find a link with an href attribute containing "blog" and click it
    cy.get('a[href*="blog"]').click();

    // The new url should include "/blog"
    cy.url().should("include", "/blog");

    // The new page should contain an h1 with "Blog"
    cy.get("h1").contains("Blog");
  });

  it("should navigate to the snippets page", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");

    // Find a link with an href attribute containing "snippets" and click it
    cy.get('a[href*="snippets"]').click();

    // The new url should include "/snippets"
    cy.url().should("include", "/snippets");

    // The new page should contain an h1 with "Snippets"
    cy.get("h1").contains("Snippets");
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
