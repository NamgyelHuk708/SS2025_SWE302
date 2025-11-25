describe('Keyboard Navigation Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should focus on breed selector using Tab key', () => {
    cy.get('body').tab();
    cy.get('[data-testid="breed-selector"]').should('have.focus');
  });

  it('should focus on fetch button using Tab key', () => {
    cy.get('body').tab().tab();
    cy.get('[data-testid="fetch-dog-button"]').should('have.focus');
  });

  it('should select a breed using keyboard', () => {
    cy.get('[data-testid="breed-selector"]').focus().type("{downarrow}{enter}");
  });