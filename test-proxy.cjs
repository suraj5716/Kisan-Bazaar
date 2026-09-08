const http = require('http');

http.get('http://localhost:3000/api/crop-lots', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response head:', data.substring(0, 150));
  });
}).on('error', (e) => {
  console.log('Error:', e.message);
});