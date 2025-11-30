cy.viewport(375, 667); // Mobile
cy.get('[data-testid="breed-selector"]').should("be.visible");
cy.viewport(1280, 720); // Desktop
cy.get('[data-testid="breed-selector"]').should("be.visible");  