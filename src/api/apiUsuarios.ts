import { createHash } from '../utils/hashGenerator';
import {usuariosDAO} from '../models/DAOs/usuariosDAO';
import {IBodyUser} from '../interfaces/IBodyUser';
import { IUser } from '../interfaces/IUser';
import { usuariosViewDAO } from '../models/DAOs/usuariosViewDAO';
import logger from '../logger';

type options = 'ok' | 'error' | 'ya existe';

export default class apiUsuarios {
    
    private usuariosDAO: usuariosDAO = new usuariosDAO();
    private usuariosViewDAO: usuariosViewDAO = new usuariosViewDAO();

    public async comprobarAutorizacion(nombre: string, contrasenia: string): Promise<any> {
        try {
            const existeUsuario: boolean = await this.usuariosDAO.validarNombre(nombre);
            if(existeUsuario){
                const contraseniaValida: any = await this.usuariosDAO.validarContrasenia(nombre, contrasenia);
                if(contraseniaValida) {
                    return 'contrasenia correcta'
                } 
                return 'contrasenia incorrecta'
            }
            return 'nombre incorrecto'
        } catch(err) {
            logger.error('Error en apiUsuarios-comprobarAutorizacion. ' + err);
        }
    }

    public async obtenerIdPorNombre(nombre: string) {
        const usuario: IUser = await this.usuariosDAO.obtenerPorNombre(nombre);
        return usuario.idusuarios;
    }

    public async obtenerTipoPorNombre(nombre: string) {
        try{
            const usuario: IUser = await this.usuariosDAO.obtenerPorNombre(nombre);
            return usuario.usuariostipo
        }
        catch(err){
            logger.error('Error en apiUsuarios-obtenerTipoPorNombre: ' + err);
        }
    }

    public async obtenerTodos(){ 
        try{
            return await this.usuariosViewDAO.obtenerTodos();
        }
        catch(err) {
            logger.error('Error en apiUsuarios-obtenerTodos: ' + err);
        }
    }

    public async altaUsuario(user: IBodyUser): Promise<options>{
        try{
            const {nombre, area} = user;
            if(nombre && area){
                const existeUsuario: boolean = await this.usuariosDAO.validarNombre(nombre);
                if(existeUsuario) return 'ya existe';
                let pass: string = createHash('temporal319');
                let tipo: number;
                switch(area){
                    case 6:
                        tipo = 2;
                        break;
                    case 8:
                        tipo = 1;
                        break;
                    case 18: 
                        tipo = 1;
                    case 17: 
                        tipo = 4;
                        break;
                    default: 
                        tipo = 3;
                        break;
                }
                const newUser: IUser = {
                    idusuarios: null,
                    usuariosnombre: nombre,
                    usuarioscontrasenia: pass,
                    usuariosarea: area,
                    usuariostipo: tipo
                }
                const result = await this.usuariosDAO.agregarUsuario(newUser);
                if(result == 'error') return 'error';
                return 'ok';
            }
            return 'error'
        }
        catch(err){
            logger.error('Error en apiUsuarios-altaUsuario: ' + err);
            return 'error'
        }
    }

    public async obtenerAreaPorNombre(nombre: string): Promise<number> {

        const usuario: IUser = await this.usuariosDAO.obtenerPorNombre(nombre);

        return usuario.usuariosarea;

    }

    public async actualizarPass(usuario: string, newPass: string) {
        return await this.usuariosDAO.actualizarPass(usuario, newPass)
        .then((result: string) => {
            return result
        })
        .catch(err => {
            logger.error('Error en apiUsuarios-actualizarPass: ' + err)
        })
    }

    
}