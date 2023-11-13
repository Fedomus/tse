import express, { Application } from "express";
import { middlewareGlobal } from "./middlewares/middlewareGlobal";
import moment from 'moment';
import Routes from "./routes/routes";

declare module 'express-session' {
    interface SessionData {
        usuarioLogueado: boolean;
        usuario: string;
        tipo: number;
        area: number;
    }
}

export class App{

    private puerto: number | string;

    constructor(
        puerto: number | string
    ) {
        this.puerto = puerto;
    }

    private app: Application = express();

    private routes: Routes = new Routes();

    private router=[
        {path: '/', name: this.routes.home()},
        {path: '/auth', name: this.routes.auth()},
        {path:'/tse', name: this.routes.tse()},
        {path: '/api', name: this.routes.api()},
        {path: '/admin', name: this.routes.admin()},
        {path: '/memoria', name: this.routes.memoria()}
    ]

    private startMiddleware() {
        middlewareGlobal.forEach((m) => {
            this.app.use(m);
        });
    }

    private startRouter() {
        this.router.forEach((r) => {
            this.app.use(r.path, r.name);
        });
    }

    private setTemplateEngine() {
        this.app.set('view engine', 'ejs');
        this.app.set('views', './src/views');
        //Defino la propiedad moment que luego llamo en el html
        this.app.locals.moment = moment;
    }

    private setPuerto(){
        this.app.set('port', this.puerto);
    } 

    public iniciarAplicacion(): Application {

        this.setPuerto();
       
        this.startMiddleware();

        this.setTemplateEngine();

        this.startRouter();

        return this.app;
    }

}
