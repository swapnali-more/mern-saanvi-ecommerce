const { createProxyMiddleware } = require('http-proxy-middleware');

function setupProxy(app: any) {
  app.use('/api', createProxyMiddleware({ target: 'http://localhost:4000', changeOrigin: true }));
}

export default setupProxy;
