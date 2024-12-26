import chalk from 'chalk';
import { format } from 'date-fns';
import fs from 'fs';
import path from 'path';

// Logger Class
class Logger {
  constructor(level = 'info', options = {}) {
    this.levels = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
    };

    // Default options for logger configuration
    this.level = this.levels[level] ?? this.levels.info;
    this.logToFile = options.logToFile || false;
    this.filePath = options.filePath || './logs';
    this.env = options.env || 'development'; // e.g., 'production', 'development'
    this.enabled = options.enabled ?? true; // Allow disabling logging

    // Ensure log directory exists
    if (this.logToFile && !fs.existsSync(this.filePath)) {
      fs.mkdirSync(this.filePath, { recursive: true });
    }
  }

  // Check if the current logging level is enabled
  _isLevelEnabled(level) {
    return this.levels[level] >= this.level;
  }

  // Format message with timestamp
  _formatMessage(level, message, ...args) {
    const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    let formattedMessage = `[${timestamp}] [${level.toUpperCase()}]: ${message}`;

    // Append additional arguments if provided
    if (args.length > 0) {
      try {
        formattedMessage += ` ${JSON.stringify(args, null, 2)}`;
      } catch (error) {
        formattedMessage += ` (Error stringifying arguments: ${error.message})`;
      }
    }

    return formattedMessage;
  }

  // Log to console and/or file depending on the environment
  _logToOutput(level, message, ...args) {
    const formattedMessage = this._formatMessage(level, message, ...args);

    // If logging to the console
    if (this.enabled) {
      if (typeof window !== 'undefined' && window.console) {
        // In browser
        this._logToConsoleBrowser(level, formattedMessage);
      } else if (typeof process !== 'undefined' && process.env) {
        // In Node.js
        this._logToConsoleNode(level, formattedMessage);
      }
    }

    // Optionally log to file (in production or as per configuration)
    if (this.logToFile && this.env === 'production') {
      this._logToFile(level, formattedMessage);
    }
  }

  // Handle logging for browser environment
  _logToConsoleBrowser(level, formattedMessage) {
    switch (level) {
      case 'debug':
        console.debug(chalk.blue('🐞 ' + formattedMessage));
        break;
      case 'info':
        console.info(chalk.green('ℹ️ ' + formattedMessage));
        break;
      case 'warn':
        console.warn(chalk.yellow('⚠️ ' + formattedMessage));
        break;
      case 'error':
        console.error(chalk.red('❌ ' + formattedMessage));
        break;
      default:
        console.log(formattedMessage);
        break;
    }
  }

  // Handle logging for Node.js environment
  _logToConsoleNode(level, formattedMessage) {
    switch (level) {
      case 'debug':
        console.debug(chalk.blue('🐞 ' + formattedMessage));
        break;
      case 'info':
        console.info(chalk.green('ℹ️ ' + formattedMessage));
        break;
      case 'warn':
        console.warn(chalk.yellow('⚠️ ' + formattedMessage));
        break;
      case 'error':
        console.error(chalk.red('❌ ' + formattedMessage));
        break;
      default:
        console.log(formattedMessage);
        break;
    }
  }

  // Log to file (optional)
  _logToFile(level, formattedMessage) {
    if (this.enabled) {
      const logFilePath = path.join(this.filePath, `${format(new Date(), 'yyyy-MM-dd')}.log`);
      const logMessage = `${formattedMessage}\n`;
      fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
          console.error('Failed to write to log file:', err);
        }
      });
    }
  }

  // Core log methods
  debug(message, ...args) {
    if (this._isLevelEnabled('debug')) {
      this._logToOutput('debug', message, ...args);
    }
  }

  info(message, ...args) {
    if (this._isLevelEnabled('info')) {
      this._logToOutput('info', message, ...args);
    }
  }

  warn(message, ...args) {
    if (this._isLevelEnabled('warn')) {
      this._logToOutput('warn', message, ...args);
    }
  }

  error(message, ...args) {
    if (this._isLevelEnabled('error')) {
      this._logToOutput('error', message, ...args);
    }
  }

  // Disable logging dynamically
  disable() {
    this.enabled = false;
  }

  // Enable logging dynamically
  enable() {
    this.enabled = true;
  }
}

// Logger instance with production-specific settings
const logger = new Logger('info', {
  logToFile: process.env.NODE_ENV === 'production',
  filePath: './logs',
  env: process.env.NODE_ENV || 'development',
});

export default logger;

export const log = (...args) => logger.info('', ...args);
