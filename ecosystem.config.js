module.exports = {
  apps: [
    {
      name: 'logitech-new-design',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    }
  ]
};
