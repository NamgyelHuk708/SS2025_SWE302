// filepath: /home/tshering/Desktop/AS2025_SWE302/practical_08/gui-testing/cypress/e2e/exercise1-image-loading.cy.ts
describe("Dog image loading", () => {
  it("should load the dog image successfully", () => {
    // Check if image loaded successfully
    cy.get('[data-testid="dog-image"]')
      .should("be.visible")
      .and(($img) => {
        expect($img[0].naturalWidth).to.be.greaterThan(0);
      });
  });
});
