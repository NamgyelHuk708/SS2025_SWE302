import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  // Soak test - sustained load for 30 minutes to detect memory leaks, degradation
  stages: [
    { duration: "2m", target: 15 },    // Ramp up to sustainable load
    { duration: "28m", target: 15 },   // Maintain load for 28 minutes (total 30min)
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
