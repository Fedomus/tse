import tarjetasDAO from '../models/DAOs/tarjetasDAO';
import {ITarjeta} from '../interfaces/ITarjeta';
import tarjetasViewDAO from '../models/DAOs/tarjetasViewDAO';
import { tagsDAO } from '../models/DAOs/tagsDAO';
import logger from '../logger';

export default class apiTarjetas {

    private tarjetasDAO: tarjetasDAO = new tarjetasDAO();
    private tarjetasViewDAO: tarjetasViewDAO = new tarjetasViewDAO();
    private tagsDAO: tagsDAO = new tagsDAO();

    private ordenarTarjetas(tarjetas){

        tarjetas.sort((a: ITarjeta, b: ITarjeta) => {
            let c: Date = new Date(a.tarjetasfecha);
            let d: Date = new Date(b.tarjetasfecha);
            return d > c ? 1 : -1;
        });
        
        return tarjetas;
    }

    public async obtenerTarjetasAprobadas(): Promise<ITarjeta[]> { 

        const tarjetas: ITarjeta[] = this.ordenarTarjetas(await this.tarjetasViewDAO.obtenerTarjetasAprobadas())

        return tarjetas;

    }

    public async obtenerTarjetasEvaluandose(): Promise<ITarjeta[]> { 

        const tarjetas: ITarjeta[] = this.ordenarTarjetas(await this.tarjetasViewDAO.obtenerTarjetasEvaluandose())
        
        return tarjetas;

    }

    public async obtenerTarjetasRechazadas(): Promise<ITarjeta[]> {

        const tarjetas: ITarjeta[] = this.ordenarTarjetas(await this.tarjetasViewDAO.obtenerTarjetasRechazadas())

        return tarjetas

    }

    public async agregarTarjeta(nuevaTarjeta: ITarjeta) {
        try{
            return await this.tarjetasDAO.agregarTarjeta(nuevaTarjeta);
        }
        catch(err){
            logger.error('Error en apiTarjetas-agregarTarjeta: ' + err);
        }
    }

    public async getTags(){
        try{
            return await this.tagsDAO.obtenerTodos();
        }
        catch(err){
            logger.error('Error en apiTarjetas-getTags: '+ err);
        }
    }

    public async guardarCambiosYAprobar(idTarjeta: number, data): Promise<string> {
        try {
            if(data.titulo && data.cuerpo && data.tags) {
                return await this.tarjetasDAO.actualizarDatosYAprobar(idTarjeta, data);
            } else {
                return 'campos incompletos'
            }
        }
        catch(err) {
            return 'error'
        }
    }

    public async rechazarTarjeta(idTarjeta: number) {
        try{
            return await this.tarjetasDAO.rechazarTarjeta(idTarjeta);
        }
        catch(err) {
            return 'error'
        }
    }
    public async aprobarTarjeta(idTarjeta: number) {
        try{
            return await this.tarjetasDAO.aprobarTarjeta(idTarjeta);
        }
        catch(err) {
            return 'error'
        }
    }
    public async evaluarTarjeta(idTarjeta: number) {
        try{
            return await this.tarjetasDAO.evaluarTarjeta(idTarjeta);
        }
        catch(err) {
            return 'error'
        }
    }

}