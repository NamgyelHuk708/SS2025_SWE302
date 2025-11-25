import http from "k6/http";
import { check, sleep } from "k6";
import { Rate, Counter } from "k6/metrics";

// Custom metrics
const errorRate = new Rate("errors");
const totalRequests = new Counter("total_requests");

export const options = {
  // Spike test - HIGH LOAD VERSION for local testing only
  // Use this for local testing with higher VUs (adjust based on your system)
  stages: [
    { duration: "10s", target: 10 },   // Normal load
    { duration: "5s", target: 250 },   // EXTREME spike for local testing
    { duration: "1m", target: 250 },   // Maintain spike for 1 minute
    { duration: "10s", target: 10 },   // Drop back to normal
    { duration: "5s", target: 0 },     // Ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<3000", "p(99)<8000"], // More lenient for extreme load
    http_req_failed: ["rate<0.15"], // Allow up to 15% failures during extreme spike
    errors: ["rate<0.15"],
  },
};

const BASE_URL = __ENV.BASE_URL || "https://aea9f3065411.ngrok-free.app";

export default function () {
  // Simplified user flow for extreme spike test
  
  // 1. Quick homepage check
  let response = http.get(BASE_URL, {
    headers: {
      'User-Agent': 'k6-extreme-spike-test/1.0'
    }
  });
  
  const homepageChecks = check(response, {
    "homepage responds": (r) => r.status < 500,
    "homepage not timing out": (r) => r.timings.duration < 5000,
  });
  
  if (!homepageChecks) {
    errorRate.add(1);
  }
  
  totalRequests.add(1);
  sleep(0.05); // Very minimal sleep during extreme spike
  
  // 2. API endpoint most likely to be hit during traffic spike
  response = http.get(`${BASE_URL}/api/dogs`);
  
  const dogChecks = check(response, {
    "dogs API responds": (r) => r.status < 500,
    "dogs API eventually responds": (r) => r.timings.duration < 8000,
  });
  
  if (!dogChecks) {
    errorRate.add(1);
  }
  
  totalRequests.add(1);
  sleep(0.05);
  
  // 3. Occasionally hit other endpoints (reduced probability during extreme load)
  if (Math.random() < 0.1) {
    response = http.get(`${BASE_URL}/api/dogs/breeds`);
    
    const breedChecks = check(response, {
      "breeds API responds": (r) => r.status < 500,
    });
    
    if (!breedChecks) {
      errorRate.add(1);
    }
    
    totalRequests.add(1);
  }
  
  sleep(0.05 + Math.random() * 0.1); // Minimal think time during extreme spike
}

export function handleSummary(data) {
  return {
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
  };
}

function textSummary(data, options = {}) {
  const indent = options.indent || '';
  
  let summary = `\n${indent}EXTREME Spike Load Test Summary (Local Only)\n`;
  summary += `${indent}============================================\n\n`;
  
  if (data.metrics && data.metrics.http_req_duration && data.metrics.http_req_duration.values) {
    const duration = data.metrics.http_req_duration.values;
    summary += `${indent}Response Time During EXTREME Spike:\n`;
    summary += `${indent}  Average: ${(duration.avg || 0).toFixed(2)}ms\n`;
    summary += `${indent}  95th percentile: ${(duration['p(95)'] || 0).toFixed(2)}ms\n`;
    summary += `${indent}  99th percentile: ${(duration['p(99)'] || 0).toFixed(2)}ms\n`;
    summary += `${indent}  Max: ${(duration.max || 0).toFixed(2)}ms\n\n`;
  }
  
  if (data.metrics && data.metrics.http_reqs && data.metrics.http_reqs.values) {
    const reqs = data.metrics.http_reqs.values;
    summary += `${indent}Total Requests: ${reqs.count || 0}\n`;
    summary += `${indent}PEAK Request Rate: ${(reqs.rate || 0).toFixed(2)}/s\n\n`;
  }
  
  if (data.metrics && data.metrics.http_req_failed && data.metrics.http_req_failed.values) {
    const failed = data.metrics.http_req_failed.values;
    const errorRate = ((failed.rate || 0) * 100).toFixed(2);
    summary += `${indent}Error Rate: ${errorRate}%\n`;
    if (parseFloat(errorRate) > 10) {
      summary += `${indent}⚠️  EXTREME load causing high error rate - this is expected!\n`;
    } else if (parseFloat(errorRate) > 5) {
      summary += `${indent}⚠️  Moderate error rate under extreme load\n`;
    } else {
      summary += `${indent} System handling extreme load surprisingly well!\n`;
    }
    summary += '\n';
  }
  
  if (data.metrics && data.metrics.vus_max && data.metrics.vus_max.values) {
    summary += `${indent}Peak Virtual Users: ${data.metrics.vus_max.values.max}\n\n`;
  }
  
  summary += `${indent}🚀 EXTREME Spike Test Assessment:\n`;
  if (data.metrics && data.metrics.http_req_duration && data.metrics.http_req_failed) {
    const avgResponseTime = data.metrics.http_req_duration.values?.avg || 0;
    const errorRate = (data.metrics.http_req_failed.values?.rate || 0) * 100;
    
    if (avgResponseTime < 1000 && errorRate < 5) {
      summary += `${indent}  🟢 AMAZING - System handles extreme spike excellently!\n`;
    } else if (avgResponseTime < 3000 && errorRate < 15) {
      summary += `${indent}  🟡 GOOD - System shows stress but remains functional\n`;
    } else {
      summary += `${indent}  🔴 EXPECTED - System under extreme stress (this is normal for spike tests)\n`;
    }
  }
  
  return summary;
}
