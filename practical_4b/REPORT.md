# OWASP ZAP Security Scanning Report

**Project:** SWE302_PA4c - CI/CD Security Testing  
**Repository:** [https://github.com/NamgyelHuk708/SWE302_PA4c](https://github.com/NamgyelHuk708/SWE302_PA4c)  
**Date:** November 25, 2025  
**Author:** Namgyel Huk

---

## 1. Overview

This report documents the implementation of automated security testing using OWASP ZAP (Zed Attack Proxy) integrated with GitHub Actions for continuous security scanning.

---

## 2. Implementation Summary

### 2.1 Technologies Used
- **Security Tool:** OWASP ZAP
- **CI/CD Platform:** GitHub Actions
- **Application:** Spring Boot (Java 17)
- **Containerization:** Docker
- **Build Tool:** Maven

### 2.2 Scan Types Implemented
1. **Baseline Scan** - Quick security assessment on every push/PR
2. **Full Scan** - Comprehensive security analysis (scheduled weekly)

---

## 3. GitHub Actions Workflows

### 3.1 ZAP Baseline Scan 

![alt text](image/2.png)


### 3.2 Git Workflow

![alt text](image/1.png)

## 4. Configuration Details

### 4.1 Workflow Permissions
```yaml
permissions:
  contents: read
  issues: write
```

### 4.2 Key Features

---

## 5. Issues Encountered & Resolutions

### 7.1 Permission Error
**Problem:** "Resource not accessible by integration"

**Solution:**
- Added `permissions` block to workflows
- Configured `issues: write` permission
- Added `token: ${{ secrets.GITHUB_TOKEN }}`

### 7.2 Artifact Naming Error
**Problem:** "Artifact name zap_scan is not valid"

**Solution:**
- Removed conflicting `artifact_name` parameter
- Let ZAP action use default artifact handling

### 7.3 SonarCloud Configuration
**Problem:** Using friend's organization settings

**Solution:**
- Updated `sonar.organization` to `namgyelhuk708`
- Modified both `pom.xml` and `sonar-project.properties`

---
---

## 6. Conclusions

### 6.1 Achievements
- Successfully integrated OWASP ZAP with GitHub Actions
- Automated security scanning on every push
- Automatic issue creation for vulnerabilities
- Comprehensive reporting in multiple formats
- Configured proper permissions and security settings

### 6.2 Security Posture
The application has been scanned and shows **4 warnings** related to HTTP security headers. No critical vulnerabilities were found. The warnings are related to:
- Missing Content Security Policy headers
- Missing X-Frame-Options headers
- Missing Permissions Policy headers
- Cross-Origin headers configuration



## 7. Repository Links

- **GitHub Repository:** [https://github.com/NamgyelHuk708/SWE302_PA4c](https://github.com/NamgyelHuk708/SWE302_PA4c)
- **GitHub Actions:** [https://github.com/NamgyelHuk708/SWE302_PA4c/actions](https://github.com/NamgyelHuk708/SWE302_PA4c/actions)
- **Issues:** [https://github.com/NamgyelHuk708/SWE302_PA4c/issues](https://github.com/NamgyelHuk708/SWE302_PA4c/issues)

---
