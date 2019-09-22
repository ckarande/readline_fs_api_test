// Include core packages from node 
const path = require('path');
const fs = require('fs');
const readline = require('readline');
const { once } = require('events');


const filename = 'ufo_incidents_1000.txt'
const fullPath = path.join(__dirname, 'reports', filename);

// Terminate invalid requests by sending an error code
const terminate = (res) => {
    res.writeHead(400, { 'Content-type': 'text/plain' });
    res.end('Bad Request!');
};

const serveRequestedResourceByLineEvent = (req, res) => {
    (async function processLineByLine() {
        try {
          const rl = readline.createInterface({
            input: fs.createReadStream(fullPath),
            crlfDelay: Infinity
          });
      
          rl.on('line', (line) => {
            // Process the line.
            res.write(line);
          });
      
          await once(rl, 'close');
          res.end();
        } catch (err) {
          console.error(err);
        }
      })();
}

// Alternate option using iterator

const serveRequestedResourceByIterator = (req, res) => {
    // Wrap try/catch to handle any errors
    try {
        async function processLineByLine() {
            const fileStream = fs.createReadStream(fullPath);
    
            const rl = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity
            });
            // Note: we use the crlfDelay option to recognize all instances of CR LF
            // ('\r\n') in input.txt as a single line break.
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            for await (const line of rl) {
                // Each line in input.txt will be successively available here as `line`.
                res.write(line);
            }
            return res.end();
        }
    
        processLineByLine();

    } catch (err) {
        terminate(res);
    }
};

// Serve as a stream
const serveRequestedResourceAsStream = (req, res) => {
    // Wrap try/catch to handle any errors
    try {
            const fileStream = fs.createReadStream(fullPath);
            fileStream.pipe(res);
            //res.end();

    } catch (err) {
        terminate(res);
    }
};


// Handle get requests to the HTTP endpoint
exports.get = (req, res) => {
    // Serve requested resource the user
    //serveRequestedResourceAsStream(req, res);
    //serveRequestedResourceByIterator(req, res);
    serveRequestedResourceByLineEvent(req, res);

};
