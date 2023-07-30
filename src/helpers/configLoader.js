
const fs = require('fs');
const path = require('path');

module.exports.getOrInit = (configName) => {

  let configPath = path.join(__dirname, '..', '..', 'config', configName);

  if (fs.existsSync(configPath) === false)
  {
    fs.writeFileSync(configPath,
          fs.readFileSync(path.join(__dirname, 'configs', 'default_' + configName)));
  }
  return require(configPath);

}
