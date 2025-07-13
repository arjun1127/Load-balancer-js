const fs = require('fs');
const http = require('http');

const dataFile = './data.json';
const statsFile = './metrics.json';

function processLogs() {
  if (!fs.existsSync(dataFile)) return;

  const logs = JSON.parse(fs.readFileSync(dataFile, 'utf8'));
  const stats = {
    responseTimes: {},
    errors: {}
  };

  logs.forEach(entry => {
    const server = entry.server;
    if (!stats.responseTimes[server]) stats.responseTimes[server] = [];
    if (!stats.errors[server]) stats.errors[server] = 0;

    if (entry.responseTime !== undefined) {
      stats.responseTimes[server].push(entry.responseTime);
    }

    if (entry.error) {
      stats.errors[server] += 1;
    }
  });

  const summary = {
    avgResponseTime: {},
    errors: stats.errors
  };

  for (const [server, times] of Object.entries(stats.responseTimes)) {
    const sum = times.reduce((a, b) => a + b, 0);
    summary.avgResponseTime[server] = times.length ? (sum / times.length).toFixed(2) : 'N/A';
  }

  fs.writeFileSync(statsFile, JSON.stringify(summary, null, 2));
}

setInterval(processLogs, 2000); // Update every 2s
