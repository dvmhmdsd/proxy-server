const http = require("http"),
  httpProxy = require("http-proxy");
const proxy = httpProxy.createProxyServer({});
const server = http.createServer(function (req, res) {
  proxy.web(req, res, {
    target: "https://atarcloud.com",
    secure: false,
    ws: false,
    prependPath: false,
    ignorePath: false,
  });
});

const PORT = process.env.PORT || 8000;

console.log(`listening on port ${PORT}`);
server.listen(PORT);

proxy.on("error", function (err, req, res) {
  console.log(err);
  res.writeHead(500, {
    "Content-Type": "text/plain",
  });
  res.end("Oops");
});

proxy.on("proxyRes", function (proxyRes, req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, OPTIONS, DELETE, PUT"
  );
});
