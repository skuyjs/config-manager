const path = require('path');

class Config {
  constructor(config) {
    const _config = config;
    let toEnved = false;

    this.get = (key) =>  {
      return _config[key];
    };

    this.set = (key, value) =>  {
      _config[key] = value;
      if (toEnved) this.toEnv();
    };

    this.toEnv = () => {
      Object.keys(_config)
        .map(key => [key, key.toUpperCase()])
        .forEach(([key, keyupper]) => {
          process.env[keyupper] = _config[key];
        });
      toEnved = true;
    };
  }

  static fromFile(file) {
    const location = path.resolve(file);
    let config;
    switch (path.extname(location)) {
      case '.json':
        config = require(location);
        break;
      default:
        config = require(location);
    }

    return new Config(config);
  }

}

module.exports = Config;