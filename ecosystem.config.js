module.exports = {
  /**
   * Application specific configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    {
      name: 'Kubernetes-Demo',
      script: 'server.js',
      // instances: "max",
      // exec_mode: "cluster",
      env: {
        NODE_ENV: 'development',
        PORT: 7000,
        NODE_CONFIG_DIR: 'config/'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 8000,
        NODE_CONFIG_DIR: 'config/'
      }
    }
  ]
};
