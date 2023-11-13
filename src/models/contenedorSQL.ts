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

    async save(elem: any) {
        await this.knex(this.tabla).insert(elem)
        .catch((error: string) => logger.error('Error en save: ' + error))
    }

    async getAll() {
        return await this.knex(this.tabla).select('*')
        .then((result: any) => {
            return result
        }).catch((err: string) => {
            logger.error('Error en getAll: ' + err);
        });
    }

}
