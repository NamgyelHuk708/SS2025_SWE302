# Practical Report: Performance Testing with k6

## Objective

Implement comprehensive performance testing for a Next.js Dog Image Browser application using k6 load testing tool.

**Learning Outcomes:**
- Perform load, spike, stress, and soak testing
- Use k6 for performance testing automation
- Analyze application performance metrics
- Integrate with Grafana Cloud for monitoring
- Evaluate system capacity and reliability

**Repository:** (Link to repository if available)

## Requirements & Setup

**Tools & Technologies:**
- Frontend: Next.js application
- API: Dog CEO API
- Performance Testing: k6
- Cloud Platform: Grafana Cloud k6
- Development Server: localhost:3000
- Public Access: ngrok tunneling

**Environment Setup:**
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run local tests
npm run test:k6:average
npm run test:k6:spike
npm run test:k6:stress
npm run test:k6:soak

# Run cloud tests (requires k6 cloud login)
npm run test:k6:cloud:average
npm run test:k6:cloud:spike
npm run test:k6:cloud:stress
npm run test:k6:cloud:soak
```

**Configuration Files:**
- `tests/k6/average-load-test.js` - Baseline performance testing
- `tests/k6/spike-load-test.js` - Burst traffic testing
- `tests/k6/stress-test.js` - Capacity limit testing
- `tests/k6/soak-test.js` - 30-minute endurance testing
**Configuration Files:**
- `tests/k6/average-load-test.js` - Baseline performance testing
- `tests/k6/spike-load-test.js` - Burst traffic testing
- `tests/k6/stress-test.js` - Capacity limit testing
- `tests/k6/soak-test.js` - 30-minute endurance testing

## Implementation

**Test Scenarios Implemented:**

**1. Average Load Test:**
- Simulates typical user traffic patterns
- Ramps from 10 to 20 virtual users
- Duration: 9 minutes
- Purpose: Establish baseline performance metrics

**2. Spike Load Test:**
- Evaluates response to sudden traffic surges
- Peak: 100 concurrent users
- Spike duration: 1.5 minutes
- Purpose: Validate burst traffic handling

**3. Stress Test:**
- Determines system breaking points
- Progressive increase to 100 VUs
- Duration: 5.5 minutes
- Purpose: Identify capacity limits

**4. Soak Test:**
- Validates long-term stability
- Constant: 15 virtual users
- Duration: 30 minutes
- Purpose: Detect memory leaks and performance degradation

**Application Architecture:**

Next.js application integrating with Dog CEO API:
- Homepage rendering with SSR
- API endpoint testing (`/api/dogs`)
- Breed listing endpoint (`/api/dogs/breeds`)
- Dynamic routing and data fetching

**Testing Execution:**

Both local and cloud-based testing:
```bash
# Local execution with k6
k6 run tests/k6/average-load-test.js

# Cloud execution via Grafana
k6 cloud tests/k6/average-load-test.js
```

## Results & Testing

All performance tests executed successfully with consistent results across local and cloud platforms.

**HomePage Load Performance:**

![Homepage load metrics](img/5.png)

**Average Load Test Results:**

![Average load test metrics](img/1.png)

*Configuration: 10-20 VUs over 9 minutes*

**Spike Load Test Results:**

![Spike load test metrics](img31.png)

*Configuration: Peak 100 VUs for 1.5 minutes*

**Stress Test Results:**

![Stress test metrics](img/4.png)

*Configuration: Progressive ramp to 100 VUs over 5.5 minutes*

**Soak Test Results:**

![Soak test metrics](img/2.png)

*Configuration: 15 VUs constant for 30 minutes*

**Explanation:**

Performance testing validated application behavior under various load conditions:

**Key Findings:**
- Response times maintained below 200ms threshold
- Successfully handled 100 concurrent users without degradation
- No memory leaks detected during 30-minute soak test
- Consistent performance between local and cloud testing
- All API endpoints performed within acceptable limits

## Reflection

**Key Learnings:**
- k6 provides comprehensive performance testing capabilities
- Load testing reveals system behavior under realistic conditions
- Different test types serve distinct validation purposes
- Grafana Cloud integration enables distributed testing
- Performance baselines are essential for monitoring

**Challenges:**
- **Test Duration Management:** Soak test required 30 minutes, solved by automating via npm scripts
- **Cloud Integration:** Required k6 cloud login authentication for Grafana platform access
- **Realistic Load Patterns:** Designed ramp-up/ramp-down curves to simulate actual user behavior

**Possible Improvements:**
- Add response time percentile tracking (p95, p99)
- Implement custom performance thresholds and SLAs
- Add database performance monitoring
- Include API endpoint-specific metrics
- Set up automated performance regression testing in CI/CD

## Conclusion

Successfully implemented and executed four comprehensive performance test scenarios, validating application capacity of 100 concurrent users with sub-200ms response times and stable 30-minute endurance performance.

## References

- [k6 Documentation](https://k6.io/docs/)
- [Grafana Cloud k6](https://grafana.com/docs/grafana-cloud/k6/)
- [Performance Testing Best Practices](https://k6.io/docs/testing-guides/test-types/)

## Appendix

**Test Configuration Summary:**

| Test Type | Virtual Users | Duration | Purpose |
|-----------|--------------|----------|---------|
| Average Load | 10-20 | 9 min | Baseline performance |
| Spike Load | 100 peak | 1.5 min spike | Burst handling |
| Stress Test | 0-100 ramp | 5.5 min | Capacity limits |
| Soak Test | 15 constant | 30 min | Long-term stability |

**Performance Metrics Achieved:**
- Average response time: <200ms
- Maximum concurrent users: 100
- Zero failures during soak test
- Consistent performance across environments

