import { Response, Request } from "express";
import apiPegi from '../api/apiPegi';
import apiTarjetas from '../api/apiTarjetas';
import apiUsuarios from "../api/apiUsuarios";
import apiAreas from "../api/apiAreas";
import { IBodyUser } from "../interfaces/IBodyUser";
import logger from "../logger";

type options = 'ok' | 'error' | 'ya existe';

export default class adminController {
    private apiPegi: apiPegi = new apiPegi();
    private apiTarjetas: apiTarjetas = new apiTarjetas();
    private apiUsuarios: apiUsuarios = new apiUsuarios();
    private apiAreas: apiAreas = new apiAreas();

    public async getGGAdministracion(req: Request, res: Response) {
        try{
            const usuarios = await this.apiUsuarios.obtenerTodos();
            const areas = await this.apiAreas.obtenerTodas();
            const tarjetasEvaluandose = await this.apiTarjetas.obtenerTarjetasEvaluandose();
            const tarjetasAprobadas = await this.apiTarjetas.obtenerTarjetasAprobadas();
            const tarjetasRechazadas = await this.apiTarjetas.obtenerTarjetasRechazadas();
            const tags = await this.apiTarjetas.obtenerTagsOrdenados();
            return res.render('../views/pages/administracion.ejs', {
                usuarioLogueado: req.session.usuarioLogueado,
                usuario: req.session.usuario,
                usuarios: usuarios,
                areas: areas,
                tags: tags.sort(),
                tipo: req.session.tipo,
                tarjetas: tarjetasEvaluandose,
                tarjetasAprobadas: tarjetasAprobadas,
                tarjetasRechazadas: tarjetasRechazadas,
                error: false
            });
        }
        catch(err){
            logger.error('Error en getGGAdministracion: ' + err)
            return res.json({result: 'error en el servidor'})
        }
    }

    public async postAlta(req: Request, res: Response) {
        try{
            const newUser: IBodyUser = req.body;
            let result = await this.apiUsuarios.altaUsuario(newUser)
            if(result == 'ok') {
                return res.status(200).redirect('/admin')
            }
            if(result == 'ya existe') {
                return res.status(201).json({result: 'ya existe el usuario'})
            }
        }
        catch(err){
            logger.error('Error en postAlta: ' + err);
            return res.json({result: 'error en el servidor'})
        }
    }

}