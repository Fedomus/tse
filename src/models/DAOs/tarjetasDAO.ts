import contenedorSQL from '../contenedorSQL';
import {ITarjeta} from '../../interfaces/ITarjeta';
import { usuariosDAO } from './usuariosDAO';
import logger from '../../logger';

const tabla: string = 'tarjetas'

export default class tarjetasDAO extends contenedorSQL {

    constructor() {
        super(tabla)
    }
    public async agregarTarjeta(nuevaTarjeta: ITarjeta) {
        try{
            await this.save(nuevaTarjeta)
            return 'tarjeta agregada'
        }
        catch(err){
            logger.error('Error en tarjetasDAO-agregarTarjeta: ' +err)
        }
    }    
    public async actualizarDatosYAprobar(idTarjeta: number, data): Promise<string> {
        try{
            await this.knex(this.tabla)
            .where({ idtarjetas: idTarjeta })
            .update({
                tarjetastitulo: data.titulo,
                tarjetascuerpo: data.cuerpo,
                tarjetasexpediente: data.expediente,
                tarjetasactoadministrativo: data.actoadministrativo,
                tarjetasestado: 1,
                tarjetasultmodusuario: data.usuario
            })
            return 'ok'
        }
        catch(err){
            logger.error('Error en tarjetasDAO-actualizarDatosYAprobar: ' +err)
            return 'error'
        }
    }
    public async aprobarTarjeta(idTarjeta: number, idUsuario: number | null) {
        try {
            await this.knex(this.tabla)
            .where({ idtarjetas: idTarjeta })
            .update({
                tarjetasestado: 1,
                tarjetasultmodusuario: idUsuario
            })
            return 'ok'
        } 
        catch(err) {
            logger.error('Error en tarjetasDAO-aprobarTarjeta: ' +err)
            return 'error'
        }
    }
    public async rechazarTarjeta(idTarjeta: number, idUsuario: number | null) {
        try {
            await this.knex(this.tabla)
            .where({ idtarjetas: idTarjeta })
            .update({
                tarjetasestado: 0,
                tarjetasultmodusuario: idUsuario
            })
            return 'ok'
        } 
        catch(err) {
            logger.error('Error en tarjetasDAO-rechazarTarjeta: ' +err)
            return 'error'
        }
    }
    public async evaluarTarjeta(idTarjeta: number, idUsuario: number | null) {
        try {
            await this.knex(this.tabla)
            .where({ idtarjetas: idTarjeta })
            .update({
                tarjetasestado: 2,
                tarjetasultmodusuario: idUsuario
            })
            return 'ok'
        } catch(err) {
            logger.error('Error en tarjetasDAO-evaluarTarjeta: ' +err)
            return 'error'
        }
    }

    public async obtenerIdPorTitulo(titulo : string) {
        return await this.knex(this.tabla)
        .where({tarjetastitulo: titulo})
        .first()
        .then((result: any)=> {
            return result.idtarjetas;
        })
    }
 
}