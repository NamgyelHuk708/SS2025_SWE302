describe("Accessibility Tests", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.injectAxe();
  });

  it("should have no detectable accessibility violations", () => {
    cy.checkA11y();
  });

  it("should have proper focus indicators", () => {
    cy.get('[data-testid="fetch-dog-button"]').focus().should("have.focus");
  });
});
