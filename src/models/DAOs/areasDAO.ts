import logger from '../../logger';
import contenedorSQL from '../contenedorSQL';

const tabla: string = 'areas'

export class areasDAO extends contenedorSQL {

    constructor() {
        super(tabla)
    }

    public async obtenerTodos(): Promise<any> {
        try{
            return await this.getAll()
        } 
        catch(err){
            logger.error("Error en areasDAO-obtenerTodos. " + err);
        }
    }

    public async obtenerNombrePorId(id: number): Promise<any> {
        try{
            let area: any;
            await this.knex(this.tabla)
            .where({idareas: id})
            .then( (elem: any) => {
                if(elem){
                    area = elem.areasnombre;
                }
            })
            return area
        }
        catch(err){
            logger.error("Error en areasDAO-obtenerNombrePorId: " + err)
        }
    }

    public async actualizarDatos(idArea, body) {
        try {
            await this.knex(this.tabla)
            .where({idareas: idArea})
            .update({
                areasnombre: body.iniciales,
                areasdescripcion: body.nombre
            })
            return 'ok'
        }
       catch(err) {
        logger.error('Error en areasDAO-actualizarDatos: ' + err) 
        return'error'
       }
    }
    
}