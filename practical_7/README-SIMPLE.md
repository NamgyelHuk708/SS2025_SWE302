# Performance Testing Report - SWE302 Practical 7

## Project Overview

This document presents the performance testing implementation and results for a Next.js-based Dog Image Browser application that integrates with the Dog CEO API.

### Technology Stack
- **Frontend Framework**: Next.js application
- **API Integration**: Dog CEO API
- **Local Development**: Port 3000 (localhost)
- **Cloud Accessibility**: ngrok for public URL tunneling

### Testing Infrastructure
- **Local Environment**: k6 performance testing tool
- **Cloud Platform**: Grafana Cloud k6 service

## Implementation Details

### Test Suite Overview

Four distinct performance testing scenarios were developed:

| Test Script | Purpose | Description |
|------------|---------|-------------|
| `average-load-test.js` | Baseline Performance | Simulates typical user traffic patterns |
| `spike-load-test.js` | Burst Testing | Evaluates system response to sudden traffic surges (100 VU maximum) |
| `stress-test.js` | Capacity Testing | Determines system breaking points and resource limits |
| `soak-test.js` | Endurance Testing | Validates system stability over extended 30-minute duration |

## Execution Instructions

### Initial Setup
```bash
# Install project dependencies
npm install

# Launch the development server
npm run dev
```

### Running Tests Locally
```bash
# Execute average load scenario
npm run test:k6:average

# Execute spike load scenario
npm run test:k6:spike

# Execute stress test scenario
npm run test:k6:stress

# Execute soak test scenario
npm run test:k6:soak
```

### Cloud-Based Test Execution
*Note: Requires authentication via `k6 cloud login`*
```bash
# Cloud-based average load test
npm run test:k6:cloud:average

# Cloud-based spike test
npm run test:k6:cloud:spike

# Cloud-based stress test
npm run test:k6:cloud:stress

# Cloud-based endurance test
npm run test:k6:cloud:soak
```

## Performance Testing Results

### Local Environment Metrics

**Average Load Test**  
![Local Average Load Results](img/1.png)  
*Configuration: Ramped from 10 to 20 virtual users across 9-minute test window*

**Spike Load Test**  
![Local Spike Load Results](img31.png)  
*Configuration: Peak traffic of 100 concurrent users sustained for 1.5 minutes*

**Stress Test**  
![Local Stress Test Results](img/4.png)  
*Configuration: Progressive user increase reaching 100 VUs over 5.5-minute period*

**Soak Test**  
![Local Soak Test Results](img/2.png)  
*Configuration: Constant 15 virtual users maintained throughout 30-minute duration*

## Performance Analysis

### Critical Metrics

- **Response Time Performance**: Application maintained average response times below 200ms threshold
- **Concurrent User Capacity**: System successfully managed 100 simultaneous users without degradation
- **Long-term Reliability**: 30-minute endurance testing revealed no memory leaks or performance regression
- **Environment Parity**: Consistent results achieved across both local and cloud testing platforms

## Summary

### Testing Objectives Achieved

- Four comprehensive test scenarios successfully implemented and executed  
- Local k6 testing framework validated across all scenarios  
- Cloud-based Grafana k6 integration completed  
- Application performance benchmarks established and verified  
- Complete documentation with visual evidence provided

