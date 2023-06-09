import apiAreas from '../api/apiAreas';
import apiTarjetas from '../api/apiTarjetas';
import apiUsuarios from '../api/apiUsuarios';
import {ITarjeta} from '../interfaces/ITarjeta';
import { Request, Response } from 'express';
import logger from '../logger';

export default class tarjetasController {
    
    private apiTarjetas: apiTarjetas = new apiTarjetas();
    private apiUsuarios: apiUsuarios = new apiUsuarios();
    private apiAreas: apiAreas = new apiAreas();

    public async getTarjetasAprobadas(req: Request, res: Response): Promise<Response> {
        try {
            const tarjetas: ITarjeta[]= await this.apiTarjetas.obtenerTarjetasAprobadas();            
            return res.json(tarjetas)
        } 
        catch(err) {
            logger.error('Error en getTarjetasAprobadas: ' + err)
            return res.status(202).json({result:"error en el servidor"})
        }
    }

    public async postNuevaTarjeta(req: Request, res: Response): Promise<any> {
        const {eje, objetivo, linea, plandeaccion, titulo, cuerpo, expediente, actoadministrativo, tags } = req.body;
        const nombre: string | undefined = req.session.usuario;
        if(eje && objetivo && linea && plandeaccion && titulo && cuerpo && tags && nombre) {
            const idArea: number = await this.apiUsuarios.obtenerAreaPorNombre(nombre);
            const autor: number | null = await this.apiUsuarios.obtenerIdPorNombre(nombre);
            if(autor) {
                const nuevaTarjeta: ITarjeta = {
                    idtarjetas: undefined, 
                    tarjetastitulo: titulo,
                    tarjetascuerpo: cuerpo,
                    tarjetasautor: autor,
                    tarjetasareas: idArea,
                    tarjetasexpediente: expediente,
                    tarjetasactoadministrativo: actoadministrativo,
                    tarjetasejes: eje,
                    tarjetasobjetivos: objetivo,
                    tarjetaslineas: linea,
                    tarjetasplandeaccion: plandeaccion,
                    tarjetasestado: 2,
                    tarjetasfecha: new Date(),
                    tarjetasultmodusuario: autor
                }
                return await this.apiTarjetas.agregarTarjeta(nuevaTarjeta, tags)
                .then(response => {
                    if(response == 'tarjeta agregada') {
                            return res.status(200).redirect('/tse')
                        }
                })
                .catch(err=> {
                    logger.error('Error en postNuevaTarjeta: ' + err)
                    return res.status(202).json({result:"error en el servidor"})
                })
            }
        }
    }

    public async guardarCambiosYAprobar(req: Request, res: Response){
        let idTarjeta : number = parseInt(req.params.id);
        let data = req.body;
        let usuario = req.session.usuario;
        if(data.titulo && data.cuerpo && data.tags && usuario) {
            let idUsuario = await this.apiUsuarios.obtenerIdPorNombre(usuario);
            data.usuario = idUsuario
            return await this.apiTarjetas.guardarCambiosYAprobar(idTarjeta, data)
            .then(response => {
                if(response == 'ok') return res.status(200).redirect('/admin')
            })
            .catch(err => {
                logger.error('Error en guardarCambiosYAprobar: ' + err)
                return res.status(202).json({result:"error en el servidor"})
            })
        }
    }

    public async rechazarTarjeta(req: Request, res: Response) {
        let idTarjeta : number = parseInt(req.params.id);
        let usuario= req.session.usuario;
        if(usuario) {
            let idUsuario = await this.apiUsuarios.obtenerIdPorNombre(usuario);
            return await this.apiTarjetas.rechazarTarjeta(idTarjeta, idUsuario)
            .then(result=> {
                if(result == 'ok') return res.status(200).redirect('/admin');
            })
            .catch(err=> {
                logger.error('Error en rechazarTarjeta: ' + err)
                return res.status(202).json({result:"error en el servidor"})
            })
        }
    }

    public async aprobarTarjeta(req: Request, res: Response) {
        let idTarjeta : number = parseInt(req.params.id);
        let usuario = req.session.usuario;
        if(usuario){
            let idUsuario = await this.apiUsuarios.obtenerIdPorNombre(usuario);
            return await this.apiTarjetas.aprobarTarjeta(idTarjeta, idUsuario)
            .then(result=>{
                if(result == 'ok') return res.status(200).redirect('/admin');
            })
            .catch(err=> {
                logger.error('Error en aprobarTarjeta: ' + err)
                return res.status(202).json({result:"error en el servidor"})
            })
        }

    }

    public async evaluarTarjeta(req: Request, res: Response) {
        let usuario = req.session.usuario;
        let idTarjeta : number = parseInt(req.params.id);
        if(usuario) {
            let idUsuario = await this.apiUsuarios.obtenerIdPorNombre(usuario);
            return await this.apiTarjetas.evaluarTarjeta(idTarjeta, idUsuario)
            .then(result=> {
                if(result == 'ok') return res.status(200).redirect('/admin')
            })
            .catch(err=>{
                logger.error('Error en evaluarTarjeta: ' + err)
                return res.status(202).json({result:"error en el servidor"})
            })
        }
    }
}




