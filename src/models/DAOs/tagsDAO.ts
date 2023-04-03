import logger from '../../logger';
import contenedorSQL from '../contenedorSQL';

const tabla: string = 'tags'

export class tagsDAO extends contenedorSQL {

    constructor() {
        super(tabla)
    }
    
    public async obtenerTodos() {
        try{
            return await this.getAll();
        } catch (err){
            logger.error("Error en tagsDAO-obtenerTodos: " + err);
        }
    }

    public async obtenerIdPorNombre(tag: string) {
        try {
            return this.knex(this.tabla) 
            .where({tagsnombre: tag})
            .first() 
            .then((result: any) => {
                return result.idtags
            })
        }
        catch(err) {
            logger.error("Error en tagsDAO-obtenerIdPorNombre: " + err)
        }
    }

    async obtenerNombrePorId(id: number) {
        try {
            return this.knex(this.tabla) 
            .where({idTags: id})
            .first() 
            .then((result: any) => {
                return result.tagsnombre
            })
        }
        catch(err) {
            logger.error("Error en tagsDAO-obtenerNombrePorId: " + err)
        }
    }
    
}

