const express = require('express');

const app = express();
const https = require('https');
const http = require('http');
const cors = require('cors');
const proxyServerPort = process.env.PROXY_SERVER_PORT || 5000;
app.use(cors());
// eslint-disable-next-line max-lines-per-function
app.use('/', function (clientRequest, clientResponse) {
  const targetUrl = clientRequest.headers.server_uri;
  console.log('Received URL: ', targetUrl);
  const parsedHost = targetUrl?.split('/').splice(2).splice(0, 1).join('/');
  let parsedPort;
  let parsedSSL;
  if (targetUrl.startsWith('https://')) {
    parsedPort = 443;
    parsedSSL = https;
  } else if (targetUrl.startsWith('http://')) {
    parsedPort = 80;
    parsedSSL = http;
  }
  const options = {
    hostname: parsedHost,
    port: parsedPort,
    path: clientRequest.url,
    method: clientRequest.method,
    headers: {
      'User-Agent': clientRequest.headers['user-agent'],
    },
  };

  const serverRequest = parsedSSL.request(options, function (serverResponse) {
    let body = '';
    if (String(serverResponse.headers['content-type']).indexOf('text/html') !== -1) {
      serverResponse.on('data', function (chunk) {
        body += chunk;
        console.log('Response back ...')
      });

      serverResponse.on('end', function () {
        // Make changes to HTML files when they're done being read.
        // body = body.replace(`example`, `Cat!`);

        clientResponse.writeHead(serverResponse.statusCode, serverResponse.headers);
        clientResponse.end(body);
      });
    } else {
      serverResponse.pipe(clientResponse, {
        end: true,
      });
      clientResponse.contentType(serverResponse.headers['content-type']);
    }
  });

  serverRequest.end();
});

app.listen(proxyServerPort);
console.log(`Proxy server listening on port ${proxyServerPort}`);
