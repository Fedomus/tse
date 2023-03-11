import contenedorSQL from '../contenedorSQL';
import {ITarjeta} from '../../interfaces/ITarjeta';
import logger from '../../logger';

const tabla: string = 'tarjetas_view'

export default class tarjetasViewDAO extends contenedorSQL {

    constructor() {
        super(tabla)
    }

    public async obtenerTarjetas(): Promise<any> {
        try{
            const tarjetas: ITarjeta[] = await this.getAll();
            return tarjetas;
        } 
        catch(err) {
            logger.error("Error en tarjetasViewDAO-obtenerTarjetas: " + err);
        }
    }

    public async obtenerTarjetasAprobadas(): Promise<any> {
        try{
            const tarjetas: ITarjeta[] = await this.getAll();
            let aprobadas: ITarjeta[] = tarjetas.filter((t) => t.tarjetasestado == 1)
            return aprobadas;
        } 
        catch(err) {
            logger.error("Error en tarjetasViewDAO-obtenerTarjetasAprobadas: " + err);
        }
    }

    public async obtenerTarjetasEvaluandose(): Promise<any> {
        try{
            const tarjetas: ITarjeta[] = await this.getAll();
            let evaluandose: ITarjeta[] | [] = tarjetas.filter((t) => t.tarjetasestado == 2)
            return evaluandose;
        } 
        catch(err) {
            logger.error("Error en tarjetasViewDAO-obtenerTarjetasEvaluandose: " + err);
        }
    }

    public async obtenerTarjetasRechazadas(): Promise<any> {
        try{
            const tarjetas: ITarjeta[] = await this.getAll();
            let rechazadas: ITarjeta[] | [] = tarjetas.filter((t) => t.tarjetasestado == 0)
            return rechazadas
        }
        catch(err) {
            logger.error("Error en tarjetasViewDAO-obtenerTarjetasRechazadas: " + err);
        }

    }
    
}