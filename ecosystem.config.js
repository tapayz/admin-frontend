module.exports = {
  apps: [
    {
      name: "tapayz",
      script: "yarn",
      args: "start",
      watch: false,
      env: {
        NODE_ENV: "development",
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
      },
    },
  ],
};
