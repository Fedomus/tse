import homeController from "../controllers/homeController";
import authController from "../controllers/authController";
import tseController from '../controllers/tseController';
import {Request, Response, Router} from 'express';
import pegiController from '../controllers/pegiController';
import tarjetasController from "../controllers/tarjetasController";
import {midGeneral, midGG} from "../middlewares/middlewareAutorizacion";
import adminController from "../controllers/adminController";
import areasController from "../controllers/areasController";
import memoriaController from "../controllers/memoriaController";

export default class Routes {

    private authController: authController = new authController()
    private tseController: tseController = new tseController()
    private pegiController: pegiController = new pegiController()
    private tarjetasController: tarjetasController = new tarjetasController()
    private adminController: adminController = new adminController()
    private homeController: homeController = new homeController()
    private areasController: areasController = new areasController()
    private memoriaController: memoriaController = new memoriaController()

    public home(): Router {

        const routerHome = Router();

        routerHome.get('/', (req: Request, res: Response) => {this.homeController.getHome(req, res)});

        return routerHome;
    }

    public memoria(): Router {

        const routerMemoria = Router();

        routerMemoria.get("/", (req, res) => {this.memoriaController.getFormulario(req, res)});

        return routerMemoria
    }

    public auth(): Router {

        const routerAuth = Router();

        routerAuth.get('/login', (req: Request, res: Response) => {this.authController.getLogin(req,res)})
        routerAuth.post('/login', (req: Request, res: Response) => {this.authController.postLogin(req,res)})
        routerAuth.post('/newpass', (req: Request, res: Response) => {this.authController.postNewPass(req, res)})
        routerAuth.get('/logout', (req: Request, res: Response) => {this.authController.getLogout(req,res)})

        return routerAuth;
    }

    public tse(): Router {

        const routerTse = Router();

        routerTse.use(midGeneral);

        routerTse.get('/', (req, res) => {this.tseController.getTse(req, res)})
        routerTse.get('/descargarpegi', (req, res) => {this.pegiController.descargarPegi(req, res)})
        routerTse.get('/descargarnorma', (req, res) => {this.pegiController.descargarNorma(req, res)})
        routerTse.post('/nuevo', (req, res) => {this.tarjetasController.postNuevaTarjeta(req, res)})
        routerTse.get('/newpass', (req, res) => {this.tseController.getNewPass(req, res)})

        return routerTse;
    }

    public admin(): Router {

        const routerAdmin = Router()

        routerAdmin.use(midGG)

        routerAdmin.get('/', (req, res) => {this.adminController.getGGAdministracion(req, res)})
        routerAdmin.post('/alta', (req, res) => {this.adminController.postAlta(req, res)})
        routerAdmin.post('/hito/guardaryaprobar/:id', (req, res) => {this.tarjetasController.guardarCambiosYAprobar(req, res)})
        routerAdmin.post('/hito/rechazar/:id', (req, res) => {this.tarjetasController.rechazarTarjeta(req, res)})
        routerAdmin.post('/hito/aprobar/:id', (req, res) => {this.tarjetasController.aprobarTarjeta(req, res)})
        routerAdmin.post('/hito/evaluar/:id', (req, res) => {this.tarjetasController.evaluarTarjeta(req, res)})
        routerAdmin.post('/areas/:id', (req, res) => {this.areasController.editarArea(req, res)})

        return routerAdmin;
    }

    public api(): Router {

        const routerApi = Router()

        routerApi.get('/pegi', (req, res) => {this.pegiController.getPegi(req, res)})
        routerApi.get('/pegi2', midGeneral, (req, res) => {this.pegiController.getPegiFiltrado(req, res)})
        routerApi.get('/tarjetas', midGeneral, (req, res) => {this.tarjetasController.getTarjetasAprobadas(req, res)})
        routerApi.get('/sessiondata', midGeneral, (req, res) => {this.authController.getSessionData(req, res)})
        routerApi.get("/gerencias", (req, res) => this.memoriaController.getGerencias(req, res))
        routerApi.get("/subgerencias", (req, res) => this.memoriaController.getSubgerencias(req, res))
        routerApi.get("/coordinaciones", (req, res) => this.memoriaController.getCoordinaciones(req, res))
        routerApi.get("/departamentos", (req, res) => this.memoriaController.getDepartamentos(req, res))
        routerApi.get("/tags", (req, res) => this.memoriaController.getTags(req, res))

        routerApi.get("/memorias", (req, res) => this.memoriaController.getMemorias(req, res))
        routerApi.post("/memorias", (req, res) => this.memoriaController.postMemorias(req, res))
        routerApi.put("/memorias", (req, res) => this.memoriaController.putMemoria(req, res))

        routerApi.get('/areas', (req, res) => this.areasController.getAreas(req, res))
        routerApi.put('/areas', (req, res) => this.memoriaController.putArea(req, res))
        
        routerApi.get("/acciones", (req, res) => this.memoriaController.getAcciones(req, res))
        routerApi.post("/acciones", (req, res) => this.memoriaController.postAcciones(req, res))

        return routerApi;
    }
}

