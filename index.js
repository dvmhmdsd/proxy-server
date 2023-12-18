const httpProxy = require("http-proxy");

const PORT = process.env.PORT || 8001;

const proxy = httpProxy.createProxyServer({
  target: "https://atarcloud.com",
  changeOrigin: true,
});

proxy.on("proxyRes", function (proxyRes, req, res) {
  proxyRes.headers["access-control-allow-origin"] = "*";
  proxyRes.headers["Access-Control-Allow-Methods"] = "POST, GET, OPTIONS, PUT, DELETE";
});

proxy.listen(PORT);
