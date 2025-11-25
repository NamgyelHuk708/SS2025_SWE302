# Practical Report: Testing and Coverage for Go CRUD API

## Objective

Implement and test a CRUD API in Go with code coverage analysis.

**Learning Outcomes:**
- Building and testing Go APIs
- Writing unit tests for handlers
- Measuring and interpreting code coverage

**Repository:** https://github.com/NamgyelHuk708/SWE302_PA2

## Requirements & Setup

**Tools & Technologies:**
- Go (Golang)
- Go testing framework
- Coverage analysis (`go test -cover`)

**Environment Setup:**
```bash
# Clone the repository
cd Swe302_p2

# Run tests with coverage
go test -coverprofile=coverage.out

# View coverage report in browser
go tool cover -html=coverage.out
```

**Configuration Files:**
- `go.mod`, `go.sum` - Dependency management
- `coverage.out` - Coverage data

## Implementation

**Project Structure:**
- `main.go` - API entry point
- `handlers.go` - CRUD handler functions
- `handlers_test.go` - Unit tests

**Test Development:**

Created unit tests for each handler in `handlers_test.go`:

```go
// handlers_test.go
func TestCreateItem(t *testing.T) {
    // ...setup code...
    err := CreateItem(...)
    if err != nil {
        t.Errorf("expected no error, got %v", err)
    }
}
```

**Coverage Analysis:**

Generated coverage data using `go test -coverprofile=coverage.out` and visualized with `go tool cover -html=coverage.out`.

## Results & Testing

All unit tests passed successfully with coverage report generated.

**Test Output:**
```bash
go test -cover
# ok   Swe302_p2  0.123s  coverage: 65.7% of statements
```

**Explanation:**

Unit tests validate CRUD handler correctness. Coverage analysis highlights tested and untested code paths for improvement.

## Reflection

**Key Learnings:**
- Go testing framework and coverage tools
- Importance of high coverage for code reliability

**Challenges:**
- Covering all edge cases in tests
- Interpreting coverage results effectively

**Possible Improvements:**
- Add more error scenario tests
- Refactor code for better testability

## Conclusion

Successfully implemented and tested a Go CRUD API with comprehensive code coverage analysis, achieving reliable functionality.

## References

- [Go Testing Documentation](https://golang.org/pkg/testing/)
- [Go Coverage Tool](https://golang.org/pkg/testing/#hdr-Code_coverage)

## Appendix

**Terminal Output:**

![All unit tests passed](assets/2.png)

**Coverage Report:**

![Test coverage visualization](assets/1.png)




