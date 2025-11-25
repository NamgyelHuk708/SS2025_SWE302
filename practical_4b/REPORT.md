# Practical Report: OWASP ZAP Security Scanning

## Objective

Implement automated Dynamic Application Security Testing (DAST) using OWASP ZAP integrated with GitHub Actions for continuous security scanning.

**Learning Outcomes:**
- Integrate OWASP ZAP with CI/CD pipeline
- Automate security vulnerability scanning
- Configure baseline and full scan workflows
- Analyze and report security findings

**Repository:** https://github.com/NamgyelHuk708/SWE302_PA4c

## Requirements & Setup

**Tools & Technologies:**
- Security Tool: OWASP ZAP
- Application: Spring Boot (Java 17)
- Build Tool: Maven
- CI/CD: GitHub Actions
- Containerization: Docker

**Environment Setup:**
```bash
# Clone repository
cd SWE302_PA4c

# Build application
mvn clean package

# Run with Docker
docker build -t app .
docker run -p 8080:8080 app
```

**Configuration Files:**
- `.github/workflows/zap-baseline.yml` - Baseline scan workflow
- `.github/workflows/zap-full.yml` - Full scan workflow
- `pom.xml` - Maven configuration

## Implementation

**Scan Types Implemented:**

1. **Baseline Scan** - Quick security assessment on every push/PR
2. **Full Scan** - Comprehensive weekly security analysis

**Workflow Configuration:**

**Baseline Scan (`.github/workflows/zap-baseline.yml`):**
```yaml
on:
  push:
    branches: ["main"]
  pull_request:
    branches: ["main"]

permissions:
  contents: read
  issues: write

steps:
  - name: ZAP Baseline Scan
    uses: zaproxy/action-baseline@v0.7.0
    with:
      target: 'http://localhost:8080'
      token: ${{ secrets.GITHUB_TOKEN }}
```

**Full Scan (`.github/workflows/zap-full.yml`):**
```yaml
on:
  schedule:
    - cron: '0 2 * * 1'  # Weekly Monday 2 AM

steps:
  - name: ZAP Full Scan
    uses: zaproxy/action-full-scan@v0.4.0
    with:
      target: 'http://localhost:8080'
```

**Key Features:**
- Automatic issue creation for detected vulnerabilities
- Multiple report formats (HTML, Markdown, JSON)
- Docker-based application deployment for scanning
- Proper permission configuration for GitHub integration

## Results & Testing

Security scans executed successfully with automated vulnerability detection and reporting.

**ZAP Baseline Scan Execution:**

![Baseline scan results](image/2.png)

**GitHub Workflow Status:**

![Workflow execution](image/1.png)

**Explanation:**

OWASP ZAP scans detected **4 warnings** related to HTTP security headers. No critical vulnerabilities found. Issues identified:
- Missing Content Security Policy headers
- Missing X-Frame-Options headers
- Missing Permissions Policy headers
- Cross-Origin headers configuration

Scan results automatically uploaded as artifacts and issues created in GitHub repository for tracking.

## Reflection

**Key Learnings:**
- OWASP ZAP integration enables automated DAST in CI/CD
- Baseline scans provide quick security feedback on every commit
- Full scans offer comprehensive vulnerability analysis
- Automated issue creation streamlines vulnerability tracking

**Challenges:**
- **Permission Error:** Fixed by adding `permissions` block with `issues: write`
- **Artifact Naming:** Removed conflicting `artifact_name` parameter to use ZAP defaults
- **GitHub Token:** Added `token: ${{ secrets.GITHUB_TOKEN }}` for issue creation

**Possible Improvements:**
- Address HTTP security header warnings
- Add authentication scanning for protected endpoints
- Integrate with other security tools (Snyk, SonarCloud)
- Configure custom ZAP scan rules
- Implement security gates to block deployments with critical issues

## Conclusion

Successfully implemented automated DAST using OWASP ZAP with GitHub Actions, enabling continuous security scanning and vulnerability detection on every code change.

## References

- [OWASP ZAP Documentation](https://www.zaproxy.org/docs/)
- [ZAP GitHub Actions](https://github.com/zaproxy/action-baseline)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## Appendix

**Scan Configuration:**
- Baseline Scan: Triggered on push/PR to main branch
- Full Scan: Scheduled weekly (Monday 2 AM)
- Target: `http://localhost:8080` (Dockerized Spring Boot app)

**Security Findings:**
- Total Warnings: 4 (HTTP security headers)
- Critical Vulnerabilities: 0
- Medium Vulnerabilities: 0

**Repository Links:**
- GitHub Repository: https://github.com/NamgyelHuk708/SWE302_PA4c
- Actions: https://github.com/NamgyelHuk708/SWE302_PA4c/actions
- Issues: https://github.com/NamgyelHuk708/SWE302_PA4c/issues
