// logger.js
const log = (message, level = 'info') => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level.toUpperCase()}]: ${message}`);
};

const info = (message) => log(message, 'info');
const error = (message) => log(message, 'error');
const warn = (message) => log(message, 'warn');

export { info, error, warn };
