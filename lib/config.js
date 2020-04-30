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
}

module.exports = Config;