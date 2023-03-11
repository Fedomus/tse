import { Response, Request } from "express";
import apiTarjetas from '../api/apiTarjetas';
import logger from "../logger";

export default class rootController {

    private apiTarjetas: apiTarjetas = new apiTarjetas();

    public async getTse(req: Request, res: Response): Promise<any> {

        try {        
            const tags = await this.apiTarjetas.getTags();
            return res.render('../views/pages/tse.ejs', {
                usuarioLogueado: req.session.usuarioLogueado,
                usuario: req.session.usuario,
                tipo: req.session.tipo,
                tags: tags,
                error: false
            });
        } 
        catch(err) {
            logger.error('Error en getTse: ' + err);
            return res.json({result: 'Error en el servidor'})
        }
    }

    public async getNewPass(req: Request, res: Response){
        try{
            return res.render('../views/pages/contrasenia', {
                usuarioLogueado: req.session.usuarioLogueado,
                usuario: req.session.usuario,
                tipo: req.session.tipo,
                error: false
            })
        }
        catch(err){
            logger.error('Error en getNewPass: ' + err);
            return res.json({result: 'Error en el servidor'})
        }
    }
}