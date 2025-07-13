const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  if (req.url === '/data') {
    const data = fs.readFileSync('./data.json', 'utf8');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(data);
  } else if (req.url === '/metrics') {
    const metrics = fs.readFileSync('./metrics.json', 'utf8');
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(metrics);
  } else {
    const html = fs.readFileSync('./dashboard.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  }
}).listen(5000, () => {
  console.log('Dashboard at http://localhost:5000');
});
