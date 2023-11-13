import { IEditArea } from "../../interfaces/IEditArea";
import logger from "../../logger";
import contenedorSQL from "../contenedorSQL";

export class coordinacionesDAO extends contenedorSQL {

    constructor() {
        super("coordinaciones")
    }


    async editarDescripcion(data: IEditArea){

        await this.knex(this.tabla)
        .where({coordinacionnombre: data.areaNombre})
        .update({
            coordinaciondescripcion:data.areaDescripcion,
        })
        .catch(err => logger.error(err))

    }
}