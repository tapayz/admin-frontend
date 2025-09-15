module.exports = {
  apps: [
    {
      name: "tapayz",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: 4602,
      },
      watch: false,
    },
  ],
};
