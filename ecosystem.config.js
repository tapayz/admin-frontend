// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'crypted-pay',
      script: 'npm',
      args: 'start',                 // next start (프로덕션)
      watch: false,
      env: {
        NODE_ENV: 'development',
        PORT: 3000,                  // 개발이라도 Nginx 뒤에선 3000 고정 권장
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,                  // 운영도 3000
      },
    },
  ],
};
