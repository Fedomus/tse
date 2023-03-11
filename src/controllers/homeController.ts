import { Response, Request } from "express";
import logger from "../logger";


export default class homeController {

    public async getHome(req: Request, res: Response): Promise<any> {
        try {        
            return res.render('../views/pages/home', {
                usuarioLogueado : req.session.usuarioLogueado,
                usuario : req.session.usuario,
                tipo : req.session.tipo
            });
        } 
        catch(err) {
            logger.error('Error en getHome: ' + err);
            return res.json({result: 'error en el servidor'})
        }
    }

}