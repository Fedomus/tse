import logger from '../logger';
import {areasDAO} from '../models/DAOs/areasDAO';

export default class apiAreas {
    
    private dao: areasDAO = new areasDAO();

    public async obtenerTodas(){
        try{
            return await this.dao.obtenerTodos()
        }
        catch(err){
            logger.error('Error en apiAreas-obtenerTodas: ' + err);
        }
    }

    public async obtenerNombrePorId(idArea: number) {
        try {
            return await this.dao.obtenerNombrePorId(idArea);
        }
        catch(err) {
            logger.error('Error en apiAreas-obtenerNombrePorId: ' + err)
        }
    }

    public async editarArea(idArea, body) {
        return await this.dao.actualizarDatos(idArea, body)
        .then(response => {
            return response
        })
        .catch(err => {
            logger.error('Error en editarArea: ' +err)
        }) 
    }

}