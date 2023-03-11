import logger from '../../logger';
import contenedorSQL from '../contenedorSQL';

const tabla: string = 'tags'

export class tagsDAO extends contenedorSQL {

    constructor() {
        super(tabla)
    }
    
    public async obtenerTodos(): Promise<any> {
        try{
            return await this.getAll();
        } catch (err){
            logger.error("Error en tagsDAO-obtenerTodos: " + err);
        }
    }
    
}

