import log4js from "log4js";
import {ENV} from "./environment/env";

log4js.configure({
      appenders: {
            logConsola: {type: 'console'},
            logArchivo: {type: 'file', filename: './log/logs.log'},
      },
      categories: {
            default: {appenders: ["logConsola"], level: 'info'},
            consola: {appenders: ['logConsola'], level: 'info'},
            archivo: {appenders: ['logArchivo'], level: 'warn'},
      }
})

let logConsola = log4js.getLogger("consola");
logConsola.level = "info";

let logArchivo = log4js.getLogger("archivo");
logArchivo.level = "warn";

let logger: any;

switch(ENV.NODE_ENV){

      case "desarrollo":
            logger = logConsola
            break;
      case "produccion":
            logger = logArchivo
            break;
      default: 
            logger = logConsola
}

export default logger;