// Include modules
const http = require('http');
const url = require('url');
const controller = require('./controller');
const protectCfg = {
    production: process.env.NODE_ENV === 'production', // if production is false, detailed error messages are exposed to the client
    maxEventLoopDelay: 10 // maximum detected delay between event loop ticks [default 42]
}

const protect = require('overload-protection')('http', protectCfg)

// Get port from env properties or set it a default port if not specified
const port = process.env.PORT || 3600;
// Create a http server, listening to requets on the port
http.createServer(function (req, res) {
    if (protect(req, res) === true) return
    // All requests come here first.
    router(req, res);
}).listen(port);
console.log(`Server running at http://localhost:${port}`);

// Delegate requests to controller functions as per the reqest method
const router = (req, res) => {
    switch (req.method) {
        case 'GET':
            controller.get(req, res);
            break;
        default:
            notFound(req, res);
            break;
    }
};

// Function to send Resource Not Found response for invalid paths
const notFound = (req, res) => {
    res.writeHead(404, { 'Content-type': 'text/plain' });
    res.end('Resource not found!');
};
