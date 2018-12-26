module.exports = {
    apps: [{
      name: 'nodeserver',
      script: './index.js'
    }],
    deploy: {
      production: {
        user: 'ubuntu',
        host: 'ec2-54-169-130-7.ap-southeast-1.compute.amazonaws.com',
        key: '~/.ssh/nodeserver.pem',
        ref: 'origin/master',
        repo: 'git@github.com:SyabilHafizdini/node-server.git',
        path: '/home/ubuntu/node-server',
        'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
      }
    }
  }