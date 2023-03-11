import contenedorSQL from '../contenedorSQL';
import {IUser} from '../../interfaces/IUser';
import {contraseniaValida} from '../../utils/passValidator';
import logger from '../../logger';

const tabla: string = 'usuarios'

export class usuariosDAO extends contenedorSQL {

    constructor() {
        super(tabla)
    }

    public async obtenerPorNombre(nombre: string): Promise<any> {
        try{
            let result: IUser | undefined;
            return await this.knex(this.tabla)
            .where({ usuariosnombre: nombre })
            .first()
            .then((user: IUser) => {
                if(user){
                    result = user;
                } 
                else {
                    result = undefined;
                }
                return result;
            });
            
        } 
        catch(err) {
            logger.error("Error en usuariosDAO-obtenerPorNombre: " + err);
        }
    }

    private async obtenerPorId(id: number): Promise<any> {
        try{
            let result: IUser | null;
            return await this.knex(this.tabla)
            .where({ idusuarios: id })
            .first()
            .then((user: IUser) => {
                if(user){
                    result = user;
                } 
                else {
                    result = null;
                }
                return result;
            });
            
        } 
        catch(err) {
            logger.error("Error en usuariosDAO-obtenerPorId: " + err);
        }
    }

    public async validarNombre(nombre: string): Promise<any> {
        try{
            return await this.knex(this.tabla)
            .where({ usuariosnombre: nombre })
            .first()
            .then((user: IUser | undefined) => {
                if(user){
                    return true
                } 
                else {
                    return false
                }
            });
        } 
        catch(err) {
            logger.error("Error en usuariosDAO-validarNombre: " + err);
        }
    }

    public async validarContrasenia(nombre: string, contrasenia: string){
        try{
            const user: IUser = await this.obtenerPorNombre(nombre);
            if(contraseniaValida(user, contrasenia)){
                return true
            }
            return false
        } 
        catch(err){
            logger.error("Error en usuariosDAO-validarContrasenia: " + err);
        }
 
    }

    public async agregarUsuario(usuario: IUser): Promise<string>{
        try{
            await this.save(usuario)
            return 'usuario agregado';
        }
        catch(err){
            logger.error("Error en usuariosDAO-agregarUsuario: " + err);
            return 'error'
        }
    }

    public async obtenerTodos(){
        try{
            return await this.getAll();
        }
        catch(err){
            logger.error("Error en usuariosDAO-obtenerTodos: " + err);
            
        }
    }

    public async actualizarPass(usuario: string, newPass: string): Promise<string> {
        return await this.knex(this.tabla)
        .where({ usuariosnombre: usuario })
        .first()
        .update({
            usuarioscontrasenia: newPass
        })
        .then((user: IUser) => {
            if(user) {
                return 'ok'
            }
            return 'no se encontro usuario'
        })     
        .catch((err: Error) => {
            logger.error("Error en usuariosDAO-actualizarPass: " + err);
            return 'error'
        });
    }
    
}

