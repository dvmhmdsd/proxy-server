const httpProxy = require('http-proxy');

const PORT = process.env.PORT || 8001

httpProxy.createProxyServer({target:'https://atarcloud.com', changeOrigin: true}).listen(PORT); 