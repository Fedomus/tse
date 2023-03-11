import apiAreas from '../api/apiAreas';
import apiUsuarios from '../api/apiUsuarios';
import { Response, Request } from "express";
import logger from "../logger";

export default class authController {
    private api: apiUsuarios = new apiUsuarios();
    private apiAreas: apiAreas = new apiAreas();

    public async getLogin(req: Request, res: Response): Promise<any> {
        try {
            return res.render('../views/pages/login.ejs', {
                usuarioLogueado: false,
                error: false,
                tipo: null
            })
        } catch(err){
            logger.error("Error en getLogin: " + err)
            return res.json({result: 'error en el servidor'})
        }
    }

    public async postLogin(req: Request, res: Response): Promise<any> {
        try {
            const {nombre, contrasenia} = req.body;
            if(nombre && contrasenia) {
                const autorizacion: string = await this.api.comprobarAutorizacion(nombre, contrasenia);
                switch(autorizacion) {
                    case 'nombre incorrecto':
                        return res.render('../views/pages/login', {
                            usuarioLogueado: req.session.usuarioLogueado || false,
                            usuario: req.session.usuario || null,
                            error: 'Nombre de usuario incorrecto'
                        })
                    case 'contrasenia incorrecta':
                        return res.render('../views/pages/login', {
                            usuarioLogueado: req.session.usuarioLogueado || false,
                            usuario: req.session.usuario || null,
                            error: 'Contraseña incorrecta'
                        })
                    case 'contrasenia correcta':
                        req.session.usuario = nombre;
                        req.session.tipo = await this.api.obtenerTipoPorNombre(nombre);
                        req.session.area = await this.api.obtenerAreaPorNombre(nombre);
                        req.session.usuarioLogueado= true;
                        req.session.save()
                        return res.redirect('/tse')
                }
            }  else {
                return res.render('../views/pages/login', {
                    usuarioLogueado: req.session.usuarioLogueado || false,
                    usuario: req.session.usuario || null,
                    error: 'Debe completar todos los campos.'
                })
            }
        } catch(err) {
            logger.error('Error en postLogin: ' + err);
            return res.json({result: 'error en el servidor'})
        }
    }

    public async getLogout(req: Request, res: Response): Promise<any> {
        try {
            req.session.destroy( error => {
                if (error) {
                    res.send({status: 'Logout Error', body: error})
                }
            })
            return res.redirect('/')
        } catch(err) {
            logger.error('Error en getLogout: ' + err)
            return res.json({result: 'error en el servidor'})
        }
    }

    public async getSessionData(req: Request, res: Response): Promise<Response> {
        try {
            return res.json({area:req.session.area})
        } catch(err){
            logger.error('Error en getSessionData: ' + err)
            return res.json({result: 'error en el servidor'})
        }   
    }

    public async postNewPass(req: Request, res: Response) {
        try {
            const {pass, newPass, newPass2} = req.body;
            const {usuario} = req.session;
            if(pass && newPass && newPass2 && usuario) {
                if(newPass==newPass2) {
                    const validacion = await this.api.comprobarAutorizacion(usuario, pass)
                    if(validacion=='contrasenia correcta') {
                        return await this.api.actualizarPass(usuario, newPass)
                        .then((response: string | void) => {
                            if (response == 'ok') {
                                return res.status(200).redirect('/tse')
                            } 
                        })
                    }
                    if(validacion == 'contrasenia incorrecta') {
                        return res.status(201).json({result: 'contrasenia incorrecta'})
                    }
                }
            }
        } catch(err) {
            logger.error('Error en postNewPass: ' + err)
            return res.json({result: 'error en el servidor'})
        }
        
    }
    
}
