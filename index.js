const httpProxy = require('http-proxy');

const PORT = process.env.PORT || 8001

httpProxy.createProxyServer({target:'http://localhost:9000'}).listen(PORT); 