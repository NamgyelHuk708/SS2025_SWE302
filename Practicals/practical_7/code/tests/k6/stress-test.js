import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  // Stress test - gradually increase load beyond normal capacity for 5 minutes
  stages: [
    { duration: "30s", target: 10 },   // Baseline
    { duration: "1m", target: 25 },    // Above normal load
    { duration: "1m", target: 50 },    // High load
    { duration: "1m", target: 75 },    // Stress load
    { duration: "1m", target: 100 },   // Breaking point load
    { duration: "1m", target: 100 },   // Sustain stress for 1 minute
    { duration: "30s", target: 0 },    // Recovery
  ],
  thresholds: {
    http_req_duration: ["avg<2000", "p(95)<3000"], // Simple, lenient thresholds
    http_req_failed: ["rate<0.1"], // Less than 10% error rate
  },
};

const BASE_URL = __ENV.BASE_URL || "https://e04cff0787a3.ngrok-free.app";

export default function () {
  // Simple test flow like smoke test
  const endpoints = [
    { name: "Homepage", url: BASE_URL },
    { name: "Random Dog API", url: `${BASE_URL}/api/dogs` },
    { name: "Breeds API", url: `${BASE_URL}/api/dogs/breeds` },
  ];

  endpoints.forEach((endpoint) => {
    const response = http.get(endpoint.url);
    check(response, {
      [`${endpoint.name} - status is 200`]: (r) => r.status === 200,
      [`${endpoint.name} - response time < 3s`]: (r) => r.timings.duration < 3000,
    });
  });
  
  sleep(1); // Simple think time
}
