import {ENV} from '../environment/env';
import logger from "../logger";
import Knex from 'knex';

let knex: any;

try {
    knex = Knex({
        client: 'mysql',
        connection: {
            host: ENV.DB_HOST,
            port: ENV.DB_PORT,
            user: ENV.DB_USER,
            password: ENV.DB_PASS,
            database: ENV.DB_NAME
        }
    })
    logger.info("PID Worker " + process.pid + ". Base de datos conectada.")
} catch(err) {
    logger.error(`Error en la conexión a la base de datos: ${err}`)
}

export default class contenedorSQL {
    protected tabla: string;
    protected knex = knex;

    constructor(tabla: string){
        this.tabla = tabla; 
    }

    protected async save(elem: any) {
        await this.knex(this.tabla).insert(elem)
        .then(() => console.log('Elemento guardado'))
        .catch((error: string) => logger.error('Error en save: ' + error))
    }

    protected async getAll() {
        return await this.knex(this.tabla).select('*')
        .then((result: any) => {
            return result
        }).catch((err: string) => {
            logger.error('Error en getAll: ' + err);
        });
    }

    // protected async getById(id: any) {
    //         return await this.knex(this.tabla)
    //         .where({ id: id })
    //         .then( (elem: any) => {
    //             return elem;
    //         })
    //         .catch( (err: string) => {console.log('Error al intentar el getById. ' + err);})
    // }
    
    // protected async deleteById(id: any) {
    //         await this.knex(this.tabla)
    //         .where({id: id})
    //         .del()
    //         .then(() => console.log('Elemento eliminado'))
    //         .catch((err: string) => console.log('Error al intentar el deleteById. ' + err));
    // }

    // protected async deleteAll() {
    //         await this.knex(this.tabla).del()
    //         .then(() => console.log('Se eliminaron todos los registros'))
    //         .catch((error: string) => { 
    //             console.log('Error en deleteAll. ' + error)
    //         })
    // }

}
