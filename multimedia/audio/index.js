const url = require("url");
const path = require("path");
const http = require("http");
const https = require('https');
const fs = require('fs');

const httpPort = 8000;
const httpsPort = 8443;

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

const serveFiles = (request, response) => {
  const uri = url.parse(request.url).pathname;
  let filename = path.join(process.cwd(), uri);

  fs.exists(filename, function(exists) {
    if(!exists) {
      response.writeHead(404, {"Content-Type": "text/plain"});
      response.write("404 Not Found\n");
      response.end();
      return;
    }

    if (fs.statSync(filename).isDirectory()) {
      filename += '/index.html';
    }

    fs.readFile(filename, "binary", function(err, file) {
      if (err) {
        response.writeHead(500, {"Content-Type": "text/plain"});
        response.write(err + "\n");
        response.end();
        return;
      }

      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });
  });
};

http.createServer(function(request, response) {
  serveFiles(request, response);
}).listen(parseInt(httpPort, 10));

https.createServer(options, function(request, response) {
  serveFiles(request, response);
}).listen(parseInt(httpsPort, 10));

console.log("Serving at https://localhost:" + httpsPort);
console.log("Serving at http://localhost:" + httpPort);
console.log("CTRL + C to shutdown");