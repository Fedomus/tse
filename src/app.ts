import express from "express";
import {IRouter} from './interfaces/IRouter';
import moment from 'moment';
import logger from "./logger";
import cluster from 'cluster';



declare module 'express-session' {
    interface SessionData {
        usuarioLogueado: boolean;
        usuario: string;
        tipo: number;
        area: number;
    }
}


export class App {
    
    private app: any;
    private middleware: any[];
    private routers: IRouter[];
    private modoCluster: boolean;


    constructor(
        
        private sslCredentials: object,
        private port: number,
        private modo: string,
        private numCPUs: number,
        middleware: any[],
        routers: IRouter[],
        private staticPath: string = "/public",
    
    ) {
        this.app = express()
        this.sslCredentials = sslCredentials;
        this.port = port;
        this.modoCluster = modo == 'cluster';
        this.numCPUs= numCPUs;
        this.middleware = middleware;
        this.routers = routers;
        
    }

    public start(){

        this.startMiddleware(this.middleware);

        this.assets(this.staticPath);

        this.setTemplateEngine();

        this.startRouters(this.routers);

        this.listen();

    }

    private startMiddleware(mware: any[]) {
        try {
            mware.forEach((m) => {
                this.app.use(m);
            });
        }
        catch(err) {
            logger.error('Error en startMiddleware: ' + err)
        }

    }

    private startRouters(routers: IRouter[]) {
        try{
            routers.forEach((r) => {
                this.app.use(r.path, r.name);
            });
        }
        catch(err) {
            logger.error('Error en startRouters: '  +err)
        }

    }

    private assets(path: string) {
        this.app.use(express.static(__dirname + path));
    }

    private setTemplateEngine() {
        try{
            this.app.set('view engine', 'ejs');
            this.app.set('views', './src/views');
            this.app.locals.moment = moment;
        } 
        catch(err){
            logger.error('Error en setTemplateEngine: ' + err)
        }

    }

    private listen() {

        if (this.modoCluster && cluster.isPrimary){
            logger.info(`Número de procesadores: ${this.numCPUs}`);
            logger.info(`PID Máster: ${process.pid}`);
            for (let i = 0; i < this.numCPUs; i++) {
                cluster.fork()
            }
            cluster.on('exit', worker => {
                logger.info(`Worker ${worker.process.pid} died ${new Date().toLocaleString()}`);
                cluster.fork()
            })
        } else {
            try {
                this.app.listen(this.port);
                logger.info(`PID Worker ${process.pid}. Servidor escuchando en puerto ${this.port} y 443`);
            } catch(err) {
                logger.error(`Error en el servidor: ${err}`)
            }
        }
    }
    
}
