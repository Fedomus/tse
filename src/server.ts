import { App } from "./app";
import { middlewareGlobal } from "./middlewares/middlewareGlobal";
import Routes from "./routes/routes";
import parseArgs from 'minimist';
import os from 'os';
// import * as fs from 'fs';
import { ENV } from "./environment/env";

//Se define el proceso global
const options: object = {
      alias: {
          "p": "port",
          "m": "modo"
      },
      default: {
          "port": ENV.PORT,
          "modo": "cluster"
      }
};
const args = parseArgs(process.argv.slice(2), options)
const port: number = args.p
const modo: string = args.m
const numCPUs = os.cpus().length

//Se inicia la app
const routes: Routes = new Routes();
const app: App = new App(

    port,

    modo,

    numCPUs,

    middlewareGlobal,

    [
        {path: '/', name: routes.home()},
        {path: '/auth', name: routes.auth()},
        {path:'/tse', name: routes.tse()},
        {path: '/api', name: routes.api()},
        {path: '/admin', name: routes.admin()}
    ]

);

app.start();
