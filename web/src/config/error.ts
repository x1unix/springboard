export default class ConfigNotFoundError extends Error {
  name = ConfigNotFoundError.name;

  constructor() {
    super('Config not found. Please create a new config file at "config/config.json"');
  }
}
