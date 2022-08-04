import http from 'k6/http';
import { check, sleep } from 'k6';
// import { Rate } from 'k6/metrics';

// export const errorRate = new Rate('errors');

// export let options = {

// //   },
// };
// BaseLine Testing ------------------
// export let options = {
//   insecureSkipTLSVerify: true,
//   noConnectionReuse: false,
//   scenarios: {
//     constant_request_rate: {
//       executor: 'constant-arrival-rate',
//       rate: '1000',
//       timeUnit: '1s',
//       //note: 1000 iterations per second
//       duration: '60s',
//       preAllocatedVUs: 5,
//       maxVUs: 15000
//     },
//   },
//   thresholds: {
//     http_req_duration: ['p(99)<=2000', 'p(95)<=1500', 'p(90)<=1000'],
//     http_req_failed: ['rate<=0.01']
//   },
// };

// // Load Testing ----------------------
export let options = {
  stages: [
    { duration: "5m", target: 200 },
    { duration: "15m", target: 200 },
    { duration: "5m", target: 0 }
  ],
  thresholds: {
    http_req_duration: ['p(99)<=2000', 'p(95)<=1500', 'p(90)<=1000'],
    http_req_failed: ['rate<=0.01']
  },
};

  export default function () {
    const responses = http.batch([
      ['GET', `http://localhost:3000/reviews?product_id=${Math.floor(Math.random() * 	(5774952 * 0.1) + (5774952 * 0.9))}`, null, { tags: { ctype: 'application/json' } }],
      ['GET', `http://localhost:3000/reviews/meta?product_id=${Math.floor(Math.random() * 	(5774952 * 0.1) + (5774952 * 0.9))}`, null, { tags: { ctype: 'application/json' } }],
    ]);
    check(responses[0], {
      'main page status was 200': (res) => res.status === 200,
    });

    sleep(1);
  }


// // Load Testing ----------------------
// export let options = {
//   stages: [
//     { duration: "5m", target: 200 },
//     { duration: "15m", target: 200 },
//     { duration: "5m", target: 0 }
//   ],
// };

// // spike Testing ------------------
// export let options = {
//   stages: [
//     { duration: "1m", target: 2000 },
//     { duration: "9m", target: 2000 },
//     { duration: "3m", target: 10000 },
//     { duration: "7m", target: 10000 },
//     { duration: "10m", target: 0 }
//   ];
// };