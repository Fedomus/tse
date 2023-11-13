import { ICreateAccion } from "../../interfaces/ICreateAccion";
import { ICreateMemoria } from "../../interfaces/ICreateMemoria";
import { IEditMemoria } from "../../interfaces/IEditMemoria";
import logger from "../../logger";
import contenedorSQL from "../contenedorSQL";

export class memoriasDAO extends contenedorSQL {

    constructor() {
        super("memorias")
    }

    async crearMemoria(memoria: ICreateMemoria){
        return await this.knex(this.tabla)
        .insert({
            anio: memoria.anio,
            area: memoria.areaNombre,
            areatipo: memoria.areaTipo
        })
        .catch((error: string) => logger.error('Error en crearMemoria: ' + error))
    }

    async guardarSintesis(data: IEditMemoria){
        await this.knex(this.tabla)
        .where({id: data.id})
        .update({
            sintesis: data.sintesis
        })
        .catch((err: any) => {
            logger.error('error en guardarSintesis. ' + err)
        })
    }
}