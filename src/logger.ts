import * as log4js from "log4js";

log4js.configure({
    appenders: {
          loggerConsole: {type: 'console'},
          loggerWarn: {type: 'file', filename: './src/log/warn.log'},
          loggerError: {type: 'file', filename: './src/log/error.log'}
    },
    categories: {
          default: {appenders: ['loggerConsole'], level: 'debug'},
          consola: {appenders: ['loggerConsole'], level: 'error'},
          warn: {appenders: ['loggerWarn'], level: 'warn'},
          error: {appenders: ['loggerError'], level: 'error'},
    }
})

const logger = log4js.getLogger()

logger.level = "debug"

export default logger;