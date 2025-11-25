# Practical Report: Automated GUI Testing with Cypress

## Objective

Implement comprehensive end-to-end automated testing for web applications using Cypress testing framework.

**Learning Outcomes:**
- Understand Cypress fundamentals for E2E testing
- Develop structured test suites for user flows
- Use fixtures and custom commands for maintainable tests
- Implement API mocking and validation strategies
- Apply Page Object Model design pattern
- Validate accessibility standards with cypress-axe
- Evaluate test execution and quality metrics

**Repository:** (Link to repository if available)

## Requirements & Setup

**Tools & Technologies:**
- Testing Framework: Cypress 15.5.0
- Application: Next.js Dog Image Browser
- Package Manager: pnpm
- Accessibility: cypress-axe
- Design Pattern: Page Object Model

**Environment Setup:**
```bash
# Navigate to project
cd practicals/practical_08/gui-testing

# Install Cypress
pnpm add -D cypress

# Verify installation
pnpm exec cypress --version

# Open Cypress
pnpm exec cypress open

# Run tests headless
pnpm exec cypress run
```

**Configuration Files:**
- `cypress.config.ts` - Cypress configuration
- `cypress/e2e/` - Test suites
- `cypress/fixtures/` - Mock data
- `cypress/support/commands.ts` - Custom commands
- `cypress/support/page-objects/` - Page Object classes

**Configuration Files:**
- `cypress.config.ts` - Cypress configuration
- `cypress/e2e/` - Test suites
- `cypress/fixtures/` - Mock data
- `cypress/support/commands.ts` - Custom commands
- `cypress/support/page-objects/` - Page Object classes

## Implementation

**Testing Architecture:**

Organized test structure following best practices:
- Test suites in `cypress/e2e/` categorized by functionality
- Mock data in `cypress/fixtures/` for API response simulation
- Reusable custom commands in `cypress/support/commands.ts`
- Page Object Model classes in `cypress/support/page-objects/`
- Reliable element selection using `data-testid` attributes

**Sample Test Case:**

Homepage verification (`cypress/e2e/homepage.cy.ts`):

```typescript
describe('Dog Image Browser - Homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display the page title and subtitle', () => {
    cy.get('[data-testid="page-title"]').should('be.visible');
    cy.get('[data-testid="page-subtitle"]').should('be.visible');
  });
});
```

**Custom Commands Implemented:**

```typescript
// cy.fetchDog() - Clicks fetch dog button
cy.fetchDog()

// cy.selectBreedAndFetch(breed) - Selects breed and fetches image
cy.selectBreedAndFetch('husky')

// cy.waitForDogImage() - Waits for image to load
cy.waitForDogImage()

// cy.checkError(message) - Validates error message
cy.checkError('Failed to load dog image')
```

**Test Categories:**

1. **Homepage Display Testing** - Page title, subtitle, and UI element visibility
2. **Dog Image Fetching** - Random image retrieval, loading states, consecutive fetches
3. **Breed Selection** - Dropdown population, filtering, breed switching
4. **API Integration** - Mocked responses, timeout handling, query parameters
5. **Error Management** - Error display, retry mechanisms
6. **Accessibility** - Zero violations with cypress-axe, keyboard navigation
**Test Categories:**

1. **Homepage Display Testing** - Page title, subtitle, and UI element visibility
2. **Dog Image Fetching** - Random image retrieval, loading states, consecutive fetches
3. **Breed Selection** - Dropdown population, filtering, breed switching
4. **API Integration** - Mocked responses, timeout handling, query parameters
5. **Error Management** - Error display, retry mechanisms
6. **Accessibility** - Zero violations with cypress-axe, keyboard navigation

## Results & Testing

All 24 Cypress tests executed successfully in both interactive and headless modes.

**Homepage Display:**

![Application homepage](image/1.png)

**Homepage Tests:**

![Homepage test execution](image/2.png)

**Fetch Functionality:**

![Fetch test demonstration](image/3.png)

**Complete Test Suite:**

![All tests passing](image/4.png)

**Explanation:**

Comprehensive test coverage across 6 categories with 24 total tests, all passing successfully.

| Testing Category | Tests | Status |
|------------------|-------|--------|
| UI Display | 5 | ✅ Pass |
| User Interactions | 6 | ✅ Pass |
| API Integration | 7 | ✅ Pass |
| Error Handling | 4 | ✅ Pass |
| Accessibility | 2 | ✅ Pass |
| **Total** | **24** | **✅ Pass** |

**Key Validations:**
- UI elements render correctly with proper visibility
- Dog image fetching works with loading states
- Breed selection filters results accurately
- API mocking ensures consistent test outcomes
- Error scenarios handled gracefully
- Zero accessibility violations detected

## Reflection

**Key Learnings:**
- Cypress provides powerful E2E testing capabilities for web applications
- Page Object Model improves test maintainability and scalability
- Custom commands reduce code duplication across test suites
- API mocking ensures reliable and reproducible tests
- Accessibility testing integration validates inclusive design
- Data-testid attributes create stable test selectors

**Challenges:**
- **Advanced Cypress Features:** Mastered API interception and custom command creation through practice
- **Test Organization:** Developed structured approach for scalable test architecture
- **Async Handling:** Learned proper waiting strategies for dynamic content

**Possible Improvements:**
- Add visual regression testing with screenshot comparison
- Implement cross-browser testing automation
- Add performance metrics collection during tests
- Create CI/CD integration for automated test runs
- Expand accessibility coverage to all user flows

## Conclusion

Successfully implemented comprehensive automated GUI testing suite using Cypress, covering UI display, user interactions, API integration, error handling, and accessibility with 100% test pass rate across 24 test cases.

## References

- [Cypress Documentation](https://docs.cypress.io/)
- [Page Object Model Pattern](https://www.cypress.io/blog/2019/01/03/stop-using-page-objects-and-start-using-app-actions/)
- [cypress-axe Documentation](https://github.com/component-driven/cypress-axe)

## Appendix

**Custom Commands Reference:**

```typescript
cy.fetchDog()
// Triggers fetch dog button click

cy.selectBreedAndFetch(breed)
// Selects breed and initiates fetch
// Example: cy.selectBreedAndFetch('husky')

cy.waitForDogImage()
// Waits for dog image to load

cy.checkError(message)
// Validates error message display
// Example: cy.checkError('Failed to load')
```

**Test Coverage Summary:**
- Total Tests: 24
- Pass Rate: 100%
- Categories: 6
- Execution Mode: Interactive + Headless
- Accessibility Violations: 0
