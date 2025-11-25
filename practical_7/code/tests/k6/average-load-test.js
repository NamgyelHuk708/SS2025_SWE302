// import http from "k6/http";
// import { check, sleep } from "k6";

// export const options = {
//   // Simple average load test - any duration (keeping it flexible)
//   stages: [
//     { duration: "1m", target: 10 }, // Ramp up to 10 users
//     { duration: "3m", target: 10 }, // Stay at 10 users
//     { duration: "1m", target: 20 }, // Ramp up to 20 users
//     { duration: "3m", target: 20 }, // Stay at 20 users
//     { duration: "1m", target: 0 },  // Ramp down
//   ],
//   thresholds: {
//     http_req_duration: ["avg<2000", "p(95)<3000"], // Simple, lenient thresholds
//     http_req_failed: ["rate<0.1"], // Less than 10% error rate
//   },
// };

// const BASE_URL = __ENV.BASE_URL || "https://e04cff0787a3.ngrok-free.app";

// export default function () {
//   // Simple test flow like smoke test
//   const endpoints = [
//     { name: "Homepage", url: BASE_URL },
//     { name: "Random Dog API", url: `${BASE_URL}/api/dogs` },
//     { name: "Breeds API", url: `${BASE_URL}/api/dogs/breeds` },
//   ];

//   endpoints.forEach((endpoint) => {
//     const response = http.get(endpoint.url);
//     check(response, {
//       [`${endpoint.name} - status is 200`]: (r) => r.status === 200,
//       [`${endpoint.name} - response time < 3s`]: (r) => r.timings.duration < 3000,
//     });
//   });
  
//   sleep(1); // Simple think time
// }



import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "1m", target: 50 },  // Ramp up to 50 users
    { duration: "3m", target: 50 },  // Stay at 50 users for 3 minutes
    { duration: "1m", target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ["p(95)<2000"], // 95% of requests under 2s
    http_req_failed: ["rate<0.1"], // Less than 10% errors
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
      [`${endpoint.name} - response time < 3s`]: (r) =>
        r.timings.duration < 3000,
    });
  });

  sleep(1);
}