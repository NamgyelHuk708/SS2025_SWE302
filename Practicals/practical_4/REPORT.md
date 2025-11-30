# Practical Report: Static Application Security Testing (SAST)

## Objective

Implement automated security testing using Snyk integrated with GitHub Actions for CI/CD pipeline.

**Learning Outcomes:**
- Automate security vulnerability detection in dependencies
- Integrate static code analysis for security issues
- Establish continuous monitoring and reporting
- Apply DevSecOps best practices

**Repository:** https://github.com/NamgyelHuk708/SWE302_PA4

## Requirements & Setup

**Tools & Technologies:**
- Framework: Spring Boot 3.4.11
- Language: Java 17
- Build Tool: Maven 3.9+
- CI/CD: GitHub Actions
- Security Scanner: Snyk
- Reporting: SARIF format

**Environment Setup:**
```bash
# Clone repository
cd SWE302_PA4

# Build project
mvn clean compile

# Run tests
mvn test

# Security scan (via GitHub Actions)
git push origin main
```

**Configuration Files:**
- `.github/workflows/maven.yml` - CI/CD pipeline
- `.snyk` - Security policies
- `pom.xml` - Project dependencies

## Implementation

**Pipeline Architecture:**

GitHub Actions workflow with three jobs:
1. **Change Detection** - Path filtering for relevant files (`src/**`, `pom.xml`, `dockerfile`)
2. **Build & Test** - Maven compilation and unit tests
3. **Security Scanning** - Matrix strategy for parallel dependency and code scans

**Key Features Implemented:**

**Snyk Integration:**
```yaml
- name: Dependency Vulnerability Scan
  uses: snyk/actions/maven@0.4.0
  with:
    args: --severity-threshold=medium --sarif-file-output=snyk-deps.sarif
```

**Matrix Strategy for Parallel Scanning:**
```yaml
strategy:
  matrix:
    scan-type: [dependencies, code]
```

**Scheduled Weekly Scans:**
```yaml
on:
  schedule:
    - cron: "0 2 * * 1"  # Monday 2 AM
```

**SARIF Upload to GitHub Security:**
```yaml
- name: Upload SARIF results
  uses: github/codeql-action/upload-sarif@v4
  with:
    sarif_file: snyk-${{ matrix.scan-type }}.sarif
```

**Vulnerability Remediation:**

Detected 2 medium severity CVEs:
- `ch.qos.logback:logback-core@1.5.18` - External Initialization issue
- `org.apache.tomcat.embed:tomcat-embed-core@10.1.46` - Resource shutdown issue

Resolution: Upgraded Spring Boot from 3.4.10 to 3.4.11

```xml
<parent>
  <version>3.4.11</version>  <!-- Previously 3.4.10 -->
</parent>
```

## Results & Testing

All security scans completed successfully with vulnerabilities identified and remediated.

**Initial Scan Results:**

![Initial vulnerability detection](image/1.png)

**Security Analysis:**

![Security analysis overview](image/2.png)

**Snyk Monitoring Dashboard:**

![Continuous monitoring](image/3.png)

**Explanation:**

Workflow executed with matrix strategy scanning both dependencies and code. Initial scan detected 2 medium severity CVEs, which were resolved through Spring Boot version upgrade. SARIF reports uploaded to GitHub Security tab for centralized tracking.

**Security Metrics:**

| Metric | Value |
|--------|-------|
| Initial Vulnerabilities | 2 (Medium) |
| Resolved Vulnerabilities | 2 (100%) |
| Current Vulnerabilities | 0 |
| Dependencies Scanned | 39 |
| Scan Frequency | Every push + Weekly |

## Reflection

**Key Learnings:**
- SAST integration with GitHub Actions for automated security
- Matrix strategy for parallel dependency and code scanning
- SARIF format for standardized security reporting
- DevSecOps practices in CI/CD pipelines

**Challenges:**
- **Permission Errors:** Fixed by adding `security-events: write` permission
- **CodeQL Deprecation:** Updated from v3 to v4 for future compatibility
- **Workflow Optimization:** Implemented path filtering to reduce unnecessary runs

**Possible Improvements:**
- Add container image scanning
- Implement security gates to block vulnerable deployments
- Integrate Slack/email notifications for critical issues
- Add compliance reporting

## Conclusion

Successfully implemented automated SAST pipeline with Snyk and GitHub Actions, achieving zero known vulnerabilities through systematic detection and remediation.

## References

- [Snyk Documentation](https://docs.snyk.io/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [SARIF Format Specification](https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

## Appendix

**Complete Workflow Configuration:**

`.github/workflows/maven.yml` - Implements change detection, build/test, and parallel security scanning with SARIF upload

**Snyk Configuration:**

`.snyk` - Security policies with 130+ lines managing vulnerability exceptions

**Key Dependencies:**

Spring Boot 3.4.11, Maven build tool, Java 17
