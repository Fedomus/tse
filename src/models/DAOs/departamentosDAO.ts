import { IEditArea } from "../../interfaces/IEditArea";
import logger from "../../logger";
import contenedorSQL from "../contenedorSQL";

export class departamentosDAO extends contenedorSQL {

    constructor() {
        super("departamentos")
    }


    async editarDescripcion(data: IEditArea){

        await this.knex(this.tabla)
        .where({departamentonombre: data.areaNombre})
        .update({
            departamentodescripcion:data.areaDescripcion,
        })
        .catch(err => logger.error(err))

    }
}