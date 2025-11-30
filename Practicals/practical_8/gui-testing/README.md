# Dog Image Browser - Comprehensive Cypress Testing Implementation

This repository contains the **fully implemented solution** for **Practical 8: Automated GUI Testing with Cypress**. The `gui-testing` directory serves as the primary workspace for hands-on practice, with this solution available for reference and validation purposes.

## Solution Overview

This directory includes a fully completed practical implementation featuring:
- ✅ Complete Cypress testing framework setup
- ✅ Extensive test coverage across 8 test specifications (31 total test cases)
- ✅ Reusable custom command implementations
- ✅ Page Object Model design pattern integration
- ✅ Mock data fixtures for consistent test execution
- ✅ End-to-end user workflow testing

The Dog Image Browser application features:
- Random dog image retrieval from the Dog CEO API
- Breed-based filtering capabilities
- Responsive user interface design
- Extensive Cypress-based test automation coverage

## Initial Setup

### System Requirements

- Node.js (version 18 or higher)
- pnpm (preferred) or npm package manager

### Dependency Installation

1. Install required packages:

```bash
pnpm install
```

2. Add Cypress testing framework (if not present):

```bash
pnpm add -D cypress start-server-and-test
```

### Launching the Application

Initialize the development server:

```bash
pnpm dev
```

Navigate to [http://localhost:3000](http://localhost:3000) in your web browser to view the running application.

## Cypress Test Execution

This project features comprehensive Cypress-based GUI test automation.

### Test Execution Methods

**Interactive Development Mode (Recommended for Active Development):**

```bash
# Launch dev server and open Cypress interactive interface
pnpm test:e2e:open
```

**Headless Execution Mode (Optimized for CI/CD Pipelines):**

```bash
# Start dev server and execute all test suites
pnpm test:e2e
```

**Direct Cypress Control:**

```bash
# Open Cypress Test Runner interface (requires running server)
pnpm cypress:open

# Execute tests in headless mode (requires running server)
pnpm cypress:run
```

### Test Organization

```
cypress/
├── e2e/                          # Test specification files (31 total tests)
│   ├── homepage.cy.ts            # Homepage UI verification (5 tests)
│   ├── fetch-dog.cy.ts           # Image fetching & breed filtering (7 tests)
│   ├── api-mocking.cy.ts         # API interception testing (6 tests)
│   ├── api-validation.cy.ts      # API response validation (3 tests)
│   ├── custom-commands.cy.ts     # Custom command demonstrations (3 tests)
│   ├── fixtures.cy.ts            # Fixture usage examples (2 tests)
│   ├── page-objects.cy.ts        # Page Object pattern demos (4 tests)
│   └── user-journey.cy.ts        # Complete workflow testing (1 comprehensive test)
├── fixtures/                     # Mock data storage
│   └── dog-responses.json        # Simulated API response data
└── support/                      # Shared utilities and configuration
    ├── commands.ts               # 4 reusable custom commands
    ├── e2e.ts                   # Global test configuration
    └── page-objects/            # Page Object Model implementations
        └── DogBrowserPage.ts    # Full Page Object class
```

### Project Scripts Reference

```json
{
  "dev": "next dev",                    // Launch development server
  "build": "next build",                // Create production build
  "start": "next start",                // Run production server
  "lint": "eslint",                     // Execute code linting
  "cypress:open": "cypress open",       // Launch Cypress interactive UI
  "cypress:run": "cypress run",         // Execute tests in headless mode
  "test:e2e": "start-server-and-test dev http://localhost:3000 cypress:run",
  "test:e2e:open": "start-server-and-test dev http://localhost:3000 cypress:open"
}
```

## Test Coverage Scope

- ✅ Homepage rendering and component layout
- ✅ Breed dropdown population and selection
- ✅ Random dog image retrieval functionality
- ✅ Breed-specific image fetching
- ✅ Loading state indicators
- ✅ Error condition handling
- ✅ API response mocking and network request interception
- ✅ Complete user interaction workflows
- ✅ Accessibility validation (optional)

## Testing Element Identifiers

The application implements `data-testid` attributes to ensure robust and reliable test element selection:

- `data-testid="page-title"` - Primary page heading
- `data-testid="page-subtitle"` - Secondary page heading
- `data-testid="breed-selector"` - Breed selection dropdown menu
- `data-testid="fetch-dog-button"` - Image fetch trigger button
- `data-testid="dog-image"` - Dog image DOM element
- `data-testid="dog-image-container"` - Image wrapper container
- `data-testid="error-message"` - Error notification element
- `data-testid="placeholder-message"` - Default placeholder text

## API Interface

- `GET /api/dogs` - Retrieve a random dog image
- `GET /api/dogs?breed={breed}` - Retrieve random image for specified breed
- `GET /api/dogs/breeds` - Fetch complete breed listing

## Technology Stack

- **Next.js 16** - React-based web framework
- **TypeScript** - Static type checking
- **Tailwind CSS** - Utility-first CSS framework
- **Cypress 13** - End-to-end testing framework
- **Dog CEO API** - External dog image data provider

## Additional Learning Resources

### Next.js Documentation

- [Next.js Official Documentation](https://nextjs.org/docs)
- [Interactive Next.js Tutorial](https://nextjs.org/learn)

### Cypress Documentation

- [Cypress Official Documentation](https://docs.cypress.io)
- [Cypress Testing Best Practices Guide](https://docs.cypress.io/guides/references/best-practices)
- [Cypress Recipe Examples Repository](https://github.com/cypress-io/cypress-example-recipes)

### Associated Course Materials

- **Practical 7** - API Performance Testing using k6
- **Practical 8** - Automated GUI Testing with Cypress (current module)

## Common Issues and Solutions

### Test Timeout Issues

When experiencing test timeout failures:
- Extend timeout duration in test commands: `cy.get('[data-testid="element"]', { timeout: 10000 })`
- Verify the development server is active and running
- Confirm network connectivity to external API services

### Cypress Launch Failures

If Cypress fails to launch properly:
```bash
# Remove Cypress cache and perform fresh installation
rm -rf node_modules/.cache/cypress
pnpm exec cypress install
```

### Port Conflict Resolution

When port 3000 is occupied:
```bash
# Terminate process using port 3000
lsof -ti:3000 | xargs kill -9

# Alternative: specify different port
PORT=3001 pnpm dev
```

## Solution vs Starter Code Comparison

The `gui-testing-solution` directory includes these enhancements beyond the `gui-testing` starter:

### New Files Added:
- `cypress.config.ts` - Cypress framework configuration
- `cypress/tsconfig.json` - TypeScript compilation settings
- `cypress/support/e2e.ts` - Global test initialization
- `cypress/support/commands.ts` - Reusable custom commands
- `cypress/support/page-objects/DogBrowserPage.ts` - Page Object implementation
- `cypress/fixtures/dog-responses.json` - Mock response fixtures
- Complete set of 8 test files in `cypress/e2e/`

### Updated Files:
- `package.json` - Added Cypress-related scripts and dependencies

### New Dependencies:
- `cypress` (v15.5.0)
- `start-server-and-test` (v2.1.2)

## Student Guidelines

For learners working through Practical 8:

1. **Begin with the walkthrough**: Utilize the `practicals/practical8-example/gui-testing/` directory as your workspace
2. **Follow the comprehensive guide**: Complete instructions are available in `practicals/practical8.md`
3. **Use this as reference material**: Consult this solution when encountering difficulties
4. **Avoid direct copying**: Focus on understanding each test's purpose and implementation
5. **Practice experimentation**: Modify and extend tests to deepen your Cypress knowledge

## Project License

This educational project is developed for academic purposes within the SWE302 course curriculum.
