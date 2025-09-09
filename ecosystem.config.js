module.exports = {
  apps: [{
    name: 'design-platform',
    script: 'npm',
    args: 'run dev',
    cwd: '/home/user/webapp/design-request-platform',
    interpreter: 'none',
    watch: false,
    autorestart: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development',
      PORT: 3000
    }
  }]
}