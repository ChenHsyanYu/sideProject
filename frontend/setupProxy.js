const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://sideproject-production-f126.up.railway.app",
      changeOrigin: true,
    })
  );
};
