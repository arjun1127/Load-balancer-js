const http = require('http');

setInterval(() => {
  http.get('http://localhost:8080/simulated', (res) => {
    res.on('data', () => {});
  });
}, 200); // 200ms interval (adjust for higher/lower traffic)
