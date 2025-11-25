# Practical 5: Integration Testing with TestContainers for Database Testing

**Student Name:** Namgyel  
**Course:** SWE302 - Software Testing & Quality Assurance  
**Submission Date:** November 25, 2025  
**Practical Number:** 5

**RepoLink:** [Link](https://github.com/NamgyelHuk708/SWE302_PA5)

---

## Executive Summary

This practical assignment demonstrates the implementation of integration testing using TestContainers for Go, focusing on database testing with PostgreSQL. The project implements a complete user repository with CRUD operations and advanced queries, achieving 83.0% code coverage across 45 test cases. All tests pass successfully, validating the correctness of database operations in a production-like environment.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Implementation Details](#implementation-details)
3. [Test Results](#test-results)
4. [Code Coverage Analysis](#code-coverage-analysis)
5. [Exercises Completed](#exercises-completed)
6. [Challenges and Solutions](#challenges-and-solutions)
7. [Conclusion](#conclusion)
8. [Appendices](#appendices)

---

## 1. Project Overview

### 1.1 Objective

The primary objective of this practical is to implement and demonstrate integration testing using TestContainers, a library that provides lightweight, throwaway instances of databases in Docker containers. This approach ensures tests run against real database instances rather than mocks or in-memory databases.

### 1.2 Technologies Used

| Technology | Version | Purpose |
|------------|---------|---------|
| Go | 1.21+ | Programming Language |
| TestContainers | v0.39.0 | Container Orchestration for Tests |
| PostgreSQL | 15-alpine | Database Engine |
| Docker | 28.5.1 | Container Runtime |
| database/sql | Standard Library | Database Driver Interface |
| lib/pq | Latest | PostgreSQL Driver for Go |

### 1.3 Project Structure

```
SWE302_PA5/
├── go.mod                          # Go module dependencies
├── go.sum                          # Dependency checksums
├── migrations/
│   └── init.sql                    # Database schema and seed data
├── models/
│   └── user.go                     # User data model
├── repository/
│   ├── user_repository.go          # Database access layer
│   └── user_repository_test.go     # Integration tests
├── coverage.out                    # Coverage profile data
├── coverage.html                   # Visual coverage report
├── test-results.txt                # Test execution logs
└── README.md                       # Project documentation
```

---

## 2. Implementation Details

### 2.1 Data Model

The User model represents the core entity in the system:

```go
type User struct {
    ID        int       `json:"id"`
    Email     string    `json:"email"`
    Name      string    `json:"name"`
    CreatedAt time.Time `json:"created_at"`
}
```

### 2.2 Database Schema

The PostgreSQL database schema includes:

- **Primary Table:** `users`
  - `id` (SERIAL PRIMARY KEY)
  - `email` (VARCHAR(255) UNIQUE NOT NULL)
  - `name` (VARCHAR(255) NOT NULL)
  - `created_at` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP)

### 2.3 Repository Methods Implemented

The UserRepository provides the following operations:

| Method | Description | Return Type |
|--------|-------------|-------------|
| `NewUserRepository(db)` | Constructor | `*UserRepository` |
| `GetByID(id)` | Retrieve user by ID | `*User, error` |
| `GetByEmail(email)` | Retrieve user by email | `*User, error` |
| `Create(email, name)` | Insert new user | `*User, error` |
| `Update(id, email, name)` | Update existing user | `error` |
| `Delete(id)` | Delete user | `error` |
| `List()` | Retrieve all users | `[]User, error` |
| `FindByNamePattern(pattern)` | Pattern matching search | `[]User, error` |
| `CountUsers()` | Count total users | `int, error` |
| `GetRecentUsers(days)` | Date-based filtering | `[]User, error` |

### 2.4 TestContainers Setup

The TestMain function manages the container lifecycle:

```go
func TestMain(m *testing.M) {
    // 1. Create PostgreSQL container
    // 2. Wait for database readiness
    // 3. Execute init.sql migrations
    // 4. Run all tests
    // 5. Cleanup and terminate container
}
```

**Wait Strategy:**
```go
wait.ForLog("database system is ready to accept connections").
    WithOccurrence(2).
    WithStartupTimeout(5*time.Second)
```

---

## 3. Test Results

### 3.1 Test Summary

| Metric | Value |
|--------|-------|
| Total Test Functions | 13 |
| Total Sub-tests | 45 |
| Tests Passed | 45 |
| Tests Failed | 0 |
| Success Rate | 100% |
| Execution Time | ~97 seconds |

### 3.2 Test Breakdown by Category

#### Basic CRUD Operations (7 tests)
- `TestGetByID/User_Exists` - PASSED
- `TestGetByID/User_Not_Found` - PASSED
- `TestGetByEmail/User_Exists` - PASSED
- `TestGetByEmail/User_Not_Found` - PASSED
- `TestCreate/Create_New_User` - PASSED
- `TestCreate/Create_Duplicate_Email` - PASSED
- `TestList` - PASSED

#### Update and Delete Operations (4 tests)
- `TestUpdate/Update_Existing_User` - PASSED
- `TestUpdate/Update_Non-Existent_User` - PASSED
- `TestDelete/Delete_Existing_User` - PASSED
- `TestDelete/Delete_Non-Existent_User` - PASSED

#### Advanced Queries (7 tests)
- `TestFindByNamePattern/Find_by_exact_pattern` - PASSED
- `TestFindByNamePattern/Find_by_case-insensitive_pattern` - PASSED
- `TestFindByNamePattern/Find_with_no_matches` - PASSED
- `TestCountUsers` - PASSED
- `TestGetRecentUsers/Get_users_from_last_30_days` - PASSED
- `TestGetRecentUsers/Get_users_from_last_1_day` - PASSED
- `TestGetRecentUsers/Get_users_from_last_0_days` - PASSED

#### Transaction Testing (3 tests)
- `TestTransactionCommit` - PASSED
- `TestTransactionRollback` - PASSED
- `TestTransactionIsolation` - PASSED

#### Additional Patterns (4 tests)
- `TestTableDrivenCRUD/Valid_user` - PASSED
- `TestTableDrivenCRUD/Duplicate_email` - PASSED
- `TestTableDrivenCRUD/Valid_with_special_chars` - PASSED
- `TestUserSerialization` - PASSED

---

## 4. Code Coverage Analysis

### 4.1 Overall Coverage

**Total Coverage: 83.0% of statements**

This exceeds the required 80% threshold, demonstrating comprehensive test coverage across all repository methods.

### 4.2 Coverage by Function

| Function | Coverage | Status |
|----------|----------|--------|
| `NewUserRepository` | 100.0% | Excellent |
| `Create` | 100.0% | Excellent |
| `GetByID` | 87.5% | Very Good |
| `GetByEmail` | 87.5% | Very Good |
| `CountUsers` | 83.3% | Good |
| `Update` | 80.0% | Good |
| `Delete` | 80.0% | Good |
| `List` | 80.0% | Good |
| `FindByNamePattern` | 80.0% | Good |
| `GetRecentUsers` | 80.0% | Good |

### 4.3 Terminal Coverage Output

**Screenshot Placeholder: Terminal Coverage Report**

![alt text](image/1.png)


### 4.4 Web Coverage Report

**Screenshot Placeholder: HTML Coverage Visualization**

![alt text](image/2.png)

## 5. Exercises Completed

### Exercise 1: Basic TestContainers Setup (25 minutes)
**Status:** COMPLETED

**Implementation:**
- Created project structure with models, repository, and migrations
- Implemented User model with ID, Email, Name, and CreatedAt fields
- Created PostgreSQL schema with users table and constraints
- Set up TestContainers with PostgreSQL 15 Alpine image
- Implemented TestMain for container lifecycle management
- Wrote integration tests for `GetByID` and `GetByEmail` methods

**Outcome:** Successfully established TestContainers infrastructure and verified basic read operations.

---

### Exercise 2: Complete CRUD Testing (30 minutes)
**Status:** COMPLETED

**Implementation:**
- Created comprehensive tests for Create, Update, and Delete operations
- Implemented proper test isolation with cleanup using defer
- Tested edge cases including duplicate emails and non-existent users
- Verified database constraints and auto-generated fields
- Implemented List operation for retrieving all users

**Outcome:** All CRUD operations thoroughly tested with proper error handling and edge case coverage.

---

### Exercise 3: Advanced Queries (35 minutes)
**Status:** COMPLETED

**Implementation:**
- Added `FindByNamePattern()` method with ILIKE pattern matching for case-insensitive searches
- Implemented `CountUsers()` for aggregate counting operations
- Created `GetRecentUsers()` with date-based filtering using PostgreSQL intervals
- Tested complex SQL queries against real PostgreSQL database

**Key SQL Features Tested:**
- Pattern matching with ILIKE
- Aggregate functions (COUNT)
- Date/time operations with INTERVAL
- ORDER BY clauses

**Outcome:** Successfully tested complex SQL queries demonstrating TestContainers' ability to validate database-specific functionality.

---

### Exercise 4: Transaction Testing (30 minutes)
**Status:** COMPLETED

**Implementation:**
- Transaction commit testing to verify successful multi-operation transactions
- Transaction rollback testing to ensure data integrity on errors
- Transaction isolation testing for concurrent operation handling
- Proper error handling and cleanup in transactions

**Transaction Patterns Tested:**
- BEGIN/COMMIT flow
- BEGIN/ROLLBACK on error
- Isolation level verification
- Data consistency after rollback

**Outcome:** Verified proper transaction handling and data integrity across all scenarios.

---

### Bonus: Additional Testing Patterns
**Status:** COMPLETED

**Implementation:**
- Table-driven tests for CRUD operations with multiple scenarios
- User serialization testing (JSON encoding/decoding)
- Edge cases including special characters and unicode
- Multiple test scenarios with different validation rules

**Outcome:** Demonstrated advanced testing patterns and comprehensive scenario coverage.

---

## 6. Challenges and Solutions

### Challenge 1: Container Startup Time
**Problem:** Initial test runs were slow (~90+ seconds) due to Docker image downloads and container initialization.

**Analysis:** TestContainers must download the PostgreSQL image on first run, and container startup involves database initialization.

**Solution:**
- Used `postgres:15-alpine` image (smaller footprint, faster download)
- Docker automatically caches images after first pull
- TestMain pattern ensures container starts only once for entire test suite
- Subsequent runs complete in ~2-3 seconds for test execution

**Lesson Learned:** First-time setup is slower, but TestContainers is optimized for repeated use.

---

### Challenge 2: Test Data Isolation
**Problem:** Tests potentially interfering with each other due to shared database state.

**Analysis:** Multiple tests modifying the same database could cause unpredictable results and flaky tests.

**Solution:**
- Implemented cleanup using `defer` statements in each test
- Each test creates unique test data with unique email addresses
- Transaction-based tests use proper commit/rollback patterns
- Reset database state between test scenarios when needed

**Code Example:**
```go
user, _ := repo.Create("test@example.com", "Test User")
defer repo.Delete(user.ID) // Ensures cleanup even if test fails
```

**Lesson Learned:** Proper cleanup strategies are essential for reliable integration tests.

---

### Challenge 3: Port Conflicts
**Problem:** Initial concern about port conflicts when running multiple test suites or parallel tests.

**Analysis:** Fixed port assignments could cause conflicts if multiple containers run simultaneously.

**Solution:**
- TestContainers automatically assigns random host ports
- No manual port configuration needed
- Each container instance gets its own unique port mapping
- Connection string retrieval handles dynamic ports

**Code Example:**
```go
connStr, err := postgresContainer.ConnectionString(ctx, "sslmode=disable")
// Automatically includes the dynamically assigned port
```

**Lesson Learned:** TestContainers handles port management automatically, eliminating manual configuration.

---

### Challenge 4: Connection String Management
**Problem:** Difficulty in constructing the correct connection string with dynamic ports and credentials.

**Analysis:** Connection strings require host, port, database name, username, and password - all configured in TestContainers setup.

**Solution:**
```go
connStr, err := postgresContainer.ConnectionString(ctx, "sslmode=disable")
```
TestContainers provides a convenient method that returns the complete, ready-to-use connection string.

**Lesson Learned:** Use TestContainers' built-in methods for configuration to avoid manual string construction errors.

---

### Challenge 5: Init Script Path Resolution
**Problem:** TestContainers couldn't find the `init.sql` migration script initially.

**Analysis:** File path resolution depends on the test file location, not the working directory.

**Solution:**
```go
postgres.WithInitScripts("../migrations/init.sql")
```
Used relative path from the test file location (`repository/`) to the migrations directory.

**Lesson Learned:** File paths in TestContainers are relative to the test file, not the project root.

---

### Challenge 6: Verifying Test Coverage
**Problem:** Needed to ensure 80%+ coverage requirement was met and identify uncovered code.

**Analysis:** Go's testing tools provide coverage analysis, but proper interpretation is needed.

**Solution:**
```bash
# Generate coverage profile
go test ./repository -cover -coverprofile=coverage.out

# View detailed function-level coverage
go tool cover -func=coverage.out

# Generate visual HTML report
go tool cover -html=coverage.out -o coverage.html
```

**Result:** Achieved 83.0% coverage, exceeding requirements.

**Lesson Learned:** Go's coverage tools provide multiple visualization options for thorough analysis.

---

## 7. Conclusion

### 7.1 Summary of Achievements

This practical assignment successfully demonstrates the implementation of integration testing using TestContainers for Go. All objectives were met or exceeded:

- **Completion:** All 4 exercises plus bonus patterns completed
- **Test Quality:** 45/45 tests passing (100% success rate)
- **Coverage:** 83.0% code coverage (exceeds 80% requirement)
- **Best Practices:** Proper isolation, cleanup, and error handling implemented
- **Documentation:** Comprehensive documentation and code comments

### 7.2 Key Learnings

1. **Real Database Testing:** Integration tests with TestContainers provide significantly more confidence than mocked tests by using actual PostgreSQL instances, catching SQL dialect issues and database-specific bugs.

2. **Container Isolation:** Each test suite gets a fresh, isolated container, preventing cross-contamination between test runs and ensuring reproducible results.

3. **Production-Like Environment:** Testing against the same database engine used in production validates SQL queries, constraints, and database-specific features accurately.

4. **Automatic Lifecycle Management:** TestContainers handles container creation, initialization, and cleanup automatically, reducing boilerplate code and potential resource leaks.

5. **CI/CD Integration:** Tests work seamlessly in automated pipelines as long as Docker is available, making them suitable for continuous integration environments.

6. **Transaction Handling:** Proper transaction testing verifies data integrity and rollback behavior, critical for production reliability.

### 7.3 Benefits of TestContainers Approach

| Aspect | Traditional Approach | TestContainers Approach |
|--------|---------------------|------------------------|
| Database Type | In-memory or mocked | Real PostgreSQL |
| SQL Compatibility | May differ from production | 100% production-like |
| Test Isolation | Shared state issues | Complete isolation |
| Setup Complexity | Manual database setup | Automatic container management |
| CI/CD Integration | Requires infrastructure | Docker is sufficient |
| Cleanup | Manual database reset | Automatic container disposal |

### 7.4 Future Enhancements

Potential areas for extending this work:

1. **Performance Testing:** Add benchmarks to measure query performance
2. **Migration Testing:** Test database migration scripts with TestContainers
3. **Connection Pooling:** Implement and test connection pool configurations
4. **Concurrent Access:** Add tests for concurrent database access patterns
5. **Stored Procedures:** Test PostgreSQL stored procedures and triggers
6. **Multi-Container Setup:** Add Redis or other services for caching layer testing

### 7.5 Final Remarks

The practical has provided hands-on experience with modern integration testing practices. TestContainers proves to be an invaluable tool for database testing, offering the perfect balance between test reliability and execution speed. The skills acquired through this exercise are directly applicable to professional software development, particularly in microservices architectures where integration testing is crucial.

---

## 8. Appendices

### Appendix A: Commands Reference

```bash
# Run all tests
go test ./repository -v

# Run tests with coverage
go test ./repository -v -cover

# Generate coverage profile
go test ./repository -v -cover -coverprofile=coverage.out

# View function-level coverage
go tool cover -func=coverage.out

# Generate HTML coverage report
go tool cover -html=coverage.out -o coverage.html

# Run specific test
go test ./repository -v -run TestGetByID

# Check Docker containers
docker ps

# View test container logs
docker logs <container_id>
```

### Appendix B: Project Files

**Core Implementation Files:**
- `models/user.go` - User data model (35 lines)
- `repository/user_repository.go` - Repository implementation (197 lines)
- `migrations/init.sql` - Database schema and seed data (13 lines)

**Test Files:**
- `repository/user_repository_test.go` - Integration tests (675 lines)

**Configuration Files:**
- `go.mod` - Go module dependencies
- `go.sum` - Dependency checksums

**Documentation Files:**
- `README.md` - Comprehensive project documentation
- `test-results.txt` - Full test execution logs
- `coverage.out` - Coverage profile data
- `coverage.html` - Visual coverage report

### Appendix C: Test Execution Log Summary

```
Container Initialization:
- Image: postgres:15-alpine
- Database: testdb
- Username: testuser
- Container startup time: ~2 seconds
- Migration execution: Success

Test Execution:
- Total duration: 97 seconds (including container setup)
- Test execution: ~0.05 seconds
- Container teardown: ~1 second

Results:
- Tests run: 45
- Tests passed: 45
- Tests failed: 0
- Coverage: 83.0%
```

### Appendix D: Dependencies

```go
require (
    github.com/lib/pq v1.10.9
    github.com/testcontainers/testcontainers-go v0.39.0
    github.com/testcontainers/testcontainers-go/modules/postgres v0.39.0
)
```

---

**Report End**

**Submitted by:** Namgyel  
**Date:** November 25, 2025  
**Course:** SWE302 - Software Testing & Quality Assurance
