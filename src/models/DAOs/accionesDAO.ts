import { ICreateAccion } from "../../interfaces/ICreateAccion";
import logger from "../../logger";
import contenedorSQL from "../contenedorSQL";

export class accionesDAO extends contenedorSQL {

    constructor() {
        super("acciones")
    }

    async crearAccion(accion: ICreateAccion){

        return await this.knex(this.tabla)
        .insert({
            accionmemoria: accion.memoria,
            acciondescripcion: accion.descripcion,
            accioneje: accion.eje,
            accionresultados: accion.resultados,
            accionresumen: accion.resumen,
            acciontipo: accion.tipo,
            acciontitulo: accion.titulo,
            acciontags: accion.tags.join(";")
        })
        .catch((err: any)=> logger.error(err))
    }

}