const http = require('http');

const endpoints = [
  '/api/crop-lots',
  '/api/buyer-requirements',
  '/api/smart-matches',
  '/api/available-lots',
  '/api/negotiations',
  '/api/mandi-comparisons',
  '/api/warehouse-options',
  '/api/recent-activities',
  '/api/fpo-dashboard'
];

function makeRequest(path) {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:3001' + path, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, data });
      });
    }).on('error', reject);
  });
}

async function testAll() {
  for (const endpoint of endpoints) {
    try {
      const result = await makeRequest(endpoint);
      console.log(`${endpoint}: ${result.status} - ${typeof result.data === 'string' ? result.data.substring(0, 80) : JSON.stringify(result.data).substring(0, 80)}`);
    } catch (err) {
      console.log(`${endpoint}: ERROR - ${err.message}`);
    }
  }
}

testAll();