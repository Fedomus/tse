import { IEditArea } from "../../interfaces/IEditArea";
import logger from "../../logger";
import contenedorSQL from "../contenedorSQL";

export class gerenciasDAO extends contenedorSQL {

    constructor() {
        super("gerencias")
    }

    async editarDescripcion(data: IEditArea){

        await this.knex(this.tabla)
        .where({gerencianombre: data.areaNombre})
        .update({
            gerenciadescripcion:data.areaDescripcion,
        })
        .catch(err => logger.error(err))
    }
}