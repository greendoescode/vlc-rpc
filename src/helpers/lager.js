/* eslint-disable comma-dangle */
const fs = require('fs');
const os = require('os');
const path = require('path');
const vlcjs = require('vlc.js');
const { config } = require('./configLoader.js').getOrInit('config.js');

const client = new vlcjs.VLCClient(config);
const destination = path.join(__dirname, '/../../logs/');
const logs = [{
  details: {
    arch: os.arch(),
    type: os.type()
  }
}];

module.exports = (...args) => {
  const log = {
    msg: args,
    time: Date.now()
  };
  client.getStatus()
    .then((status) => {
      log.status = status;
      logs.push(log);
    })
    .catch((err) => {
      log.status = err.message;
      logs.push(log);
    });
};

process.on('exit', () => {
  if (!fs.existsSync(destination)) fs.mkdirSync(destination);
  fs.writeFileSync(`${destination}${Date.now()}.log`, JSON.stringify(logs));
});
