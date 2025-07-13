const http = require('http');
const port = process.argv[2] || 3001;
const id = `Server-${port}`;

http.createServer((req, res) => {
  const cpuUsage = Math.floor(Math.random() * 60) + 20;
  const response = {
    server: id,
    cpuUsage,
    timestamp: Date.now()
  };

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(response));
}).listen(port, () => {
  console.log(`${id} running at http://localhost:${port}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use!`);
  } else {
    console.error(err);
  }
});
