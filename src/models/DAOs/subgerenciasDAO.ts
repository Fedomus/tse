import { IEditArea } from "../../interfaces/IEditArea";
import logger from "../../logger";
import contenedorSQL from "../contenedorSQL";

export class subgerenciasDAO extends contenedorSQL {

    constructor() {
        super("subgerencias")
    }

    public async obtenerTodos(): Promise<any> {
        try{
            return await this.getAll()
        } 
        catch(err){
            logger.error("Error en subgerenciasDAO-obtenerTodos. " + err);
        }
    }

    
    async editarDescripcion(data: IEditArea){
        
        await this.knex(this.tabla)
        .where({subgerencianombre: data.areaNombre})
        .update({
            subgerenciadescripcion:data.areaDescripcion,
        })
        .catch(err => logger.error(err))
    }
}