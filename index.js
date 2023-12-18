const httpProxy = require("http-proxy");
const http = require("http");

const PORT = process.env.PORT || 8001;

const proxy = httpProxy.createProxyServer();

http.createServer((req, res) => {
  res.writeHead(200, {
    "access-control-allow-origin": "*",
    "access-control-allow-methods": "*",
  });
  proxy.web(req, res, { target: "https://atarcloud.com", changeOrigin: true });
}).listen(PORT)
