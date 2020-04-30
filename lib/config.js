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
  }
}

module.exports = Config;