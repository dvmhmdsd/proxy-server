const httpProxy = require('http-proxy');

const PORT = process.env.PORT || 8001

httpProxy.createProxyServer({target:'https://api-dev.hectare.app'}).listen(PORT); 