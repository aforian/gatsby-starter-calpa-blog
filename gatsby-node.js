const { registerLocalFs } = require('netlify-cms-proxy-server/dist/middlewares');

exports.onCreateDevServer = async ({ app }) => {
  await registerLocalFs(app);
};

exports.onCreateNode = require('./gatsby/onCreateNode');

exports.createPages = require('./gatsby/CreatePages');

exports.onCreateWebpackConfig = require('./gatsby/onCreateWebpackConfig');
