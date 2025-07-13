const http = require('http');
const httpProxy = require('http-proxy');
const fs = require('fs');

const servers = [
  { host: 'localhost', port: 3001 },
  { host: 'localhost', port: 3002 },
  { host: 'localhost', port: 3003 },
  { host: 'localhost', port: 3004 },
  { host: 'localhost', port: 3005 },
];

const proxy = httpProxy.createProxyServer({});
const logs = [];

async function fetchCpuUsage(server) {
  const startTime = Date.now();
  return new Promise((resolve) => {
    http.get(`http://${server.host}:${server.port}`, (res) => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        try {
          const data = JSON.parse(raw);
          const responseTime = Date.now() - startTime;
          resolve({ ...server, cpuUsage: data.cpuUsage, responseTime, status: 'OK' });
        } catch (e) {
          resolve({ ...server, cpuUsage: 100, responseTime: 0, status: 'ParseError' });
        }
      });
    }).on('error', () => {
      resolve({ ...server, cpuUsage: 100, responseTime: 0, status: 'Down' });
    });
  });
}

async function getBestServer() {
  const usages = await Promise.all(servers.map(fetchCpuUsage));
  const best = usages.reduce((a, b) => a.cpuUsage < b.cpuUsage ? a : b);
  return { best, usages };
}

const server = http.createServer(async (req, res) => {
  const { best, usages } = await getBestServer();

  const log = {
    time: Date.now(),
    server: `${best.port}`,
    url: req.url,
    responseTime: best.responseTime,
    error: best.status !== 'OK' ? best.status : null
  };

  logs.push(log);
  fs.writeFileSync('./data.json', JSON.stringify(logs.slice(-100))); // keep last 100 entries
  fs.writeFileSync('./metrics.json', JSON.stringify(usages));        // all servers

  proxy.web(req, res, { target: `http://${best.host}:${best.port}` });
});

server.listen(8080, () => {
  console.log('Load Balancer on http://localhost:8080');
});
