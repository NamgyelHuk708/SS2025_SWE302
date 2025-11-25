import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "10s", target: 20 },   // Normal load
    { duration: "20s", target: 100 },  // SPIKE to 100 VUs (adjust higher if your laptop can handle)
    { duration: "30s", target: 0 },    // Quick ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<5000"], // More lenient during spike
    http_req_failed: ["rate<0.3"], // Allow up to 30% errors during extreme spike
  },
};

const BASE_URL = __ENV.BASE_URL || "https://e04cff0787a3.ngrok-free.app";

export default function () {
  const endpoints = [
    { name: "Homepage", url: BASE_URL },
    { name: "Random Dog API", url: `${BASE_URL}/api/dogs` },
    { name: "Breeds API", url: `${BASE_URL}/api/dogs/breeds` },
  ];

  endpoints.forEach((endpoint) => {
    const response = http.get(endpoint.url);
    check(response, {
      [`${endpoint.name} - status is 200`]: (r) => r.status === 200,
      [`${endpoint.name} - responded`]: (r) => r.status !== 0,
    });
  });

  sleep(0.3); // Shorter sleep for spike
}