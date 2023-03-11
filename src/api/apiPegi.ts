import logger from '../logger';
import {pegiDAO} from '../models/DAOs/pegiDAO';

export default class apiPegi {
    private pegiDAO: pegiDAO = new pegiDAO();
    
    public async obtenerPegi(id?: number): Promise<any> {
        try {
            if(id){
                return await this.pegiDAO.obtenerTodosPorArea(id); 
            } else {
                return await this.pegiDAO.obtenerTodos();
            }
        } 
        catch(err) {
            logger.error('Error en apiPegi-obtenerPegi: ' + err);
        }
    }

}