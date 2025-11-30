# Practical Report: Infrastructure as Code with Terraform and LocalStack

## Objective

Implement secure AWS infrastructure deployment using Terraform on LocalStack, featuring static website hosting with automated security scanning.

**Learning Outcomes:**
- Define cloud infrastructure as code with Terraform
- Deploy AWS S3 static website hosting
- Apply security best practices for cloud infrastructure
- Perform automated security scanning with Trivy
- Understand DevSecOps concepts and automation

**Repository:** https://github.com/NamgyelHuk708/SWE302_PA6

## Requirements & Setup

**Tools & Technologies:**
- Terraform - Infrastructure as Code
- LocalStack - Local AWS cloud emulation
- Next.js - React framework for static websites
- Trivy - Security vulnerability scanner
- Docker - Containerization platform
- AWS S3 - Static website hosting

**Environment Setup:**
```bash
# Clone repository
git clone https://github.com/NamgyelHuk708/SWE302_PA6.git
cd SWE302_PA6

# Start LocalStack
make setup

# Deploy infrastructure and application
make deploy

# Check deployment status
make status

# Run security scans
make scan
make compare-security
```

**Configuration Files:**
- `terraform/` - Secure infrastructure configuration
- `terraform-insecure/` - Fixed vulnerable code
- `nextjs-app/` - Static website application
- `Makefile` - Common deployment commands

## Implementation

**Infrastructure as Code:**

Defined AWS S3 infrastructure with Terraform:

**Secure Configuration (`terraform/`):**
- Server-side encryption with customer-managed KMS keys
- Automatic KMS key rotation enabled
- Access logging to dedicated logs bucket
- S3 bucket versioning for disaster recovery
- Least privilege IAM policies (no wildcards)
- Controlled public read for static website hosting

**Security Fixes Applied (`terraform-insecure/`):**

Fixed all CRITICAL and HIGH vulnerabilities:
- Added KMS encryption for S3 buckets
- Enabled automatic key rotation
- Implemented access logging
- Configured bucket versioning
- Replaced wildcard IAM actions with specific permissions
- Replaced wildcard resources with specific ARNs
- Applied least privilege principle

**Static Website Deployment:**

Built and deployed Next.js application:
```bash
# Build static export
npm run build

# Deploy to S3
awslocal s3 sync nextjs-app/out/ s3://deployment-bucket/ --delete
```

**Security Scanning:**

Automated Trivy scans for IaC vulnerabilities:
```bash
# Scan secure configuration
trivy config terraform/

# Scan fixed insecure configuration
trivy config terraform-insecure/
```

**LocalStack Setup:**

Containerized AWS emulation:
- Docker-based LocalStack deployment
- Automated Terraform provisioning
- S3 bucket creation and configuration
- Website hosting enablement

## Results & Testing

Successfully deployed infrastructure and static website with comprehensive security validation.

**Deployed Website:**

![Live Next.js website on LocalStack S3](image/1.png)

**Security Scan Results:**

![Trivy scan output](image/3.png)

**Security Comparison:**

![Secure vs insecure configuration](image/4.png)

**Explanation:**

Infrastructure deployed on LocalStack with Terraform automation. Security scans show:

**Secure Configuration:** 0 CRITICAL, 4 HIGH (intentional for static website), 0 MEDIUM, 1 LOW
**Fixed Insecure:** 0 CRITICAL, 0 HIGH, 0 MEDIUM, 1 LOW

The 4 HIGH findings in secure config are intentional - static websites require public read access. All actual vulnerabilities eliminated from insecure configuration.

| Metric | Before Fixes | After Fixes | Status |
|--------|--------------|-------------|--------|
| CRITICAL | Multiple | 0 | ✅ Fixed |
| HIGH | Multiple | 0 | ✅ Fixed |
| MEDIUM | Multiple | 0 | ✅ Fixed |
| LOW | Multiple | 1 | ✅ Acceptable |

## Reflection

**Key Learnings:**
- Infrastructure as Code enables reproducible, version-controlled deployments
- LocalStack allows cost-free AWS testing without cloud infrastructure
- Trivy automates security scanning for IaC before deployment
- Context matters for security findings - static websites need public access
- Shift-left security catches vulnerabilities early in development

**Challenges:**
- **Understanding Trivy Findings:** Secure config shows HIGH findings that are intentional for static website hosting (public read required)
- **IAM Policy Best Practices:** LOW finding suggests using groups/roles instead of direct user attachment - acceptable for development

**Why scan IaC for security issues?**

Security vulnerabilities in IaC lead to data breaches, unauthorized access, compliance violations, and financial losses. Scanning before deployment prevents production issues and is cheaper than fixing deployed vulnerabilities.

**How LocalStack helps development:**
- Cost savings (no AWS charges)
- Speed (instant provisioning)
- Rapid iteration without cloud cleanup
- Offline development capability
- Safe experimentation

**Possible Improvements:**
- Add CloudFront CDN for better performance
- Implement CI/CD pipeline with automated scans
- Include infrastructure testing with Terratest
- Deploy to actual AWS for production validation

## Conclusion

Successfully implemented secure AWS infrastructure as code using Terraform on LocalStack, eliminating all CRITICAL and HIGH vulnerabilities while deploying functional static website.

## References

- [Terraform Documentation](https://www.terraform.io/docs)
- [LocalStack Documentation](https://docs.localstack.cloud)
- [Trivy Documentation](https://trivy.dev/)
- [AWS S3 Security Best Practices](https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html)

## Appendix

**Project Structure:**
```
├── terraform/ - Secure infrastructure
├── terraform-insecure/ - Fixed vulnerable code
├── nextjs-app/ - Static website
├── scripts/ - Automation scripts
└── Makefile - Common commands
```

**Available Commands:**
- `make setup` - Start LocalStack
- `make deploy` - Full deployment
- `make status` - Check deployment
- `make scan` - Security scan
- `make clean` - Cleanup resources

**Security Features Implemented:**
- KMS encryption with auto-rotation
- Access logging for audit trails
- S3 bucket versioning
- Least privilege IAM policies
- Controlled public access for website hosting

