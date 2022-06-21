/*
 * Simple Node server to serve files through HTTP and HTTPS.
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

const httpPort = 8000;
const httpsPort = 8443;

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

const serveFiles = (request, response) => {
    const uri = url.parse(request.url).pathname;
    let filename = path.join(process.cwd(), uri);

    console.log('requested filename:', filename);

    fs.exists(filename, function (exists) {
        if (!exists) {
            response.writeHead(404, { "Content-Type": "text/html" });
            response.write("404 Not Found\n");
            response.end();
            return;
        }

        if (fs.statSync(filename).isDirectory()) {
            if (!filename.match(/\/$/)) {
                filename += '/';
            }

            filename += 'index.html';
        }

        fs.readFile(filename, "binary", function (err, file) {
            if (err) {
                response.writeHead(500, { "Content-Type": "text/plain" });
                response.write(err + "\n");
                response.end();
                return;
            }

            console.log('Responding for document', filename);

            response.write(file, "binary");
            response.end();
        });
    });
};

http.createServer(function (request, response) {
    serveFiles(request, response);
}).listen(parseInt(httpPort, 10));

https.createServer(options, function (request, response) {
    serveFiles(request, response);
}).listen(parseInt(httpsPort, 10));

console.log("Serving at https://localhost:" + httpsPort);
console.log("Serving at http://localhost:" + httpPort);
console.log("CTRL+C to stop server");