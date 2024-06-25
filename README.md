# Node.js Proxy Server

Temporarily bypass any `CORS` issues by using this server

## Usage

Just deploy this server and put the deployment link as base url for the request that causing the `CORS` issue and put the target url as a `server_uri` header

**e.g**
If you're trying to access url `https://example.com` and it returns `Access Control Allow Origin` issue, then use this proxy and it will solve this issue.

1. Deploy the proxy into the service you want e.g: `vercel` and get the link of the deployment. Let's assume it's: `https://test.vercel.com`
2. Use the deployment URL as the base url

```
https://test.vercel.com
```

3. Pass the target url (`https://example.com`) as `server_uri` header

```
server_uri: https://example.com
```
