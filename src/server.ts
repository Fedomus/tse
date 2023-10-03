import { App } from "./app";
import parseArgs from 'minimist';
import os from 'os';
import { ENV } from "./environment/env";
import http from 'http';
import { Application } from "express";
import logger from "./logger";
import cluster from "cluster";
import debug from "debug";


//Utilizo Minimist para manejar el proceso global
const options: object = {
    alias: {
        "p": "puerto"
    },
    default: {
        "puerto": ENV.PORT
    }
};

const args = parseArgs(process.argv.slice(2), options)


// Defino el puerto de la aplicación
function normalizePort(val: string): number | string {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return "";
}

const puerto: number | string = normalizePort(args.p);


//Se inicia la aplicación
const Aplicacion: Application = new App(puerto).iniciarAplicacion();


//Obtengo el numero de CPUs de la máquina donde está corriendo node
const numCPUs = os.cpus().length


// Se crea el servidor
const server = http.createServer(Aplicacion);


function onError(error: any) {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    var bind = typeof puerto === 'string'
      ? 'Pipe ' + puerto
      : 'Port ' + puerto;
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        logger.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        logger.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
}


function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
          ? 'pipe ' + addr
          : 'port ' + addr?.port;
    debug('Listening on ' + bind);
}


//Se inicia el servidor en modo fork o cluster, usando el módulo nativo cluster

if (cluster.isPrimary){

    logger.info(`Número de procesadores: ${numCPUs}`);
    logger.info(`PID Máster: ${process.pid}`);

    for (let i = 0; i < numCPUs; i++) {
          cluster.fork()
    }

    cluster.on('exit', worker => {
          logger.info(`Worker ${worker.process.pid} died ${new Date().toLocaleString()}`);
          cluster.fork()
    })

} else {

    server.listen(puerto, () => {
        logger.info(`PID Worker ${process.pid}. Servidor escuchando en puerto ${puerto}`);
    });
    
    server.on('error', onError);
    server.on('listening', onListening);
    
}








          





