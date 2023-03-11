import logger from '../../logger';
import contenedorSQL from '../contenedorSQL';

const tabla: string = 'pegi'

export class pegiDAO extends contenedorSQL {

    constructor() {
        super(tabla)
    }

    public async obtenerTodosPorArea(area: number) {
        try{
            let pegi = await this.getAll();
            let pegiFiltrado = pegi.filter(row=> row.idareas == area)
            return pegiFiltrado;
        } catch(err) {
            logger.error('Error en pegiDAO-obtenerTodosPorArea: ' + err)
        }
    }

    public async obtenerTodos(): Promise<any> {
        try{
            return await this.getAll();
        } catch(err) {
            logger.error('Error en pegiDAO-obtenerTodos: ' + err)
        }
    }
    
}

