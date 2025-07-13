#!/bin/bash

echo "🔁 Killing existing Node.js servers using ports..."

# Kill processes on these ports
for port in 3001 3002 3003 3004 3005 5000 8080; do
  fuser -k ${port}/tcp 2>/dev/null
done

echo "✅ Ports cleared. Starting servers..."

# Start backend servers
node server.js 3001 &
node server.js 3002 &
node server.js 3003 &
node server.js 3004 &
node server.js 3005 &

# Start dashboard server
node dashboard-server.js &

# Start metrics processor
node metrics.js &

# Start load balancer
node lb.js &

# Start traffic generator
node traffic-gen.js &


# If the logs are collecting even after the servers are killed, it might be because the servers are not actually being killed.
# so better to use `pkill` instead of `fuser` to kill the process.
# pkill -f server.js
# pkill -f lb.js
# pkill -f traffic-gen.js
# pkill -f dashboard-server.js
# pkill -f metrics.js