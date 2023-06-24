
const fs = require('fs');
const path = require('path');

module.exports.getOrInit = () => {

  let configPath = path.join(__dirname, '..', '..', 'config', 'config.js');

  if (fs.existsSync(configPath) === false)
  {
    fs.writeFileSync(configPath,
          fs.readFileSync(path.join(__dirname, '..', '..', 'config', 'default_config.js')));
  }
  return require(configPath);

}
