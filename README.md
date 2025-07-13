#  Node.js CPU-Aware Load Balancer with Real-Time Dashboard

A lightweight, custom-built **load balancer** in Node.js that intelligently routes requests based on real-time CPU usage of backend servers. Comes with a live dashboard showing request logs, response times, error logs, and traffic visualizations.

---

##  Features

-  **CPU-Aware Routing**: Chooses the backend server with the lowest CPU usage.
-  **Real-Time Dashboard**: Live updates of request logs, server info, and traffic patterns.
-  **Response Time Tracking**: Measures and displays backend response time per request.
-  **Error Logging**: Displays failed requests (e.g., when a server is down).
-  **Traffic Simulator**: Simulates continuous load for performance testing.
-  **Scalable**: Easily increase the number of backend servers (e.g., 5 or 6).

---

## Clone Project 
```
https://github.com/arjun1127/Load-balancer-js.git
cd Load-balancer-js
npm install
```
## To run the load balancer
### in linux 
```
chmod +x run-all.sh
sh run-all.sh

```
### Then visit http://localhost:5000

## How It Works

Load Balancer uses http-proxy to forward requests.

Before routing, it:

Queries all backend servers for current CPU usage.

Selects the one with lowest load.

Logs every request’s metadata to data.json.

Dashboard polls data.json and renders it live using JavaScript

(Here i have not considered the cpu useage(its just random)))

# RESULT 

<img width="1333" height="647" alt="Screenshot from 2025-07-13 16-40-24" src="https://github.com/user-attachments/assets/fd20a295-e9c7-48db-a7ea-f40ea707cf57" />


