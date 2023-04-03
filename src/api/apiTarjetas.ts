import tarjetasDAO from '../models/DAOs/tarjetasDAO';
import {ITarjeta} from '../interfaces/ITarjeta';
import tarjetasViewDAO from '../models/DAOs/tarjetasViewDAO';
import { tagsDAO } from '../models/DAOs/tagsDAO';
import logger from '../logger';
import relacionesDAO from '../models/DAOs/relacionesDAO';
import { usuariosDAO } from '../models/DAOs/usuariosDAO';

export default class apiTarjetas {

    private tarjetasDAO: tarjetasDAO = new tarjetasDAO();
    private tarjetasViewDAO: tarjetasViewDAO = new tarjetasViewDAO();
    private tagsDAO: tagsDAO = new tagsDAO();
    private relacionesDAO: relacionesDAO = new relacionesDAO();
    private usuariosDAO: usuariosDAO = new usuariosDAO()

    private ordenarTarjetas(tarjetas: ITarjeta[]){

        tarjetas.sort((a: ITarjeta, b: ITarjeta) => {
            let c: Date = new Date(a.tarjetasfecha);
            let d: Date = new Date(b.tarjetasfecha);
            return d > c ? 1 : -1;
        });
        
        return tarjetas;
    }

    private async obtenerTags(idTarjeta?: number) {

            if(idTarjeta) {

                let tags: string[] = [];

                for (const rel of await this.relacionesDAO.obtenerPorTarjeta(idTarjeta)) {
    
                    tags.push(await this.tagsDAO.obtenerNombrePorId(rel.relaciontag));
    
                }
    
                return tags
            }
        
    }

    public async obtenerTarjetasAprobadas() { 

        let tarjetas: ITarjeta[] = this.ordenarTarjetas(await this.tarjetasViewDAO.obtenerTarjetasAprobadas())

        for (const t of tarjetas) {

            t.tarjetastags = await this.obtenerTags(t.idtarjetas);
            t.tarjetasultmodusuario = await this.usuariosDAO.obtenerNombrePorId(t.tarjetasultmodusuario)
        }

        return tarjetas;

    }

    public async obtenerTarjetasEvaluandose() { 

        const tarjetas: ITarjeta[] = this.ordenarTarjetas(await this.tarjetasViewDAO.obtenerTarjetasEvaluandose())

        for (const t of tarjetas) {

            t.tarjetastags = await this.obtenerTags(t.idtarjetas);
            t.tarjetasultmodusuario = await this.usuariosDAO.obtenerNombrePorId(t.tarjetasultmodusuario)
        }

        
        return tarjetas;

    }

    public async obtenerTarjetasRechazadas(): Promise<ITarjeta[]> {

        const tarjetas: ITarjeta[] = this.ordenarTarjetas(await this.tarjetasViewDAO.obtenerTarjetasRechazadas())

        for (const t of tarjetas) {

            t.tarjetastags = await this.obtenerTags(t.idtarjetas);
            t.tarjetasultmodusuario = await this.usuariosDAO.obtenerNombrePorId(t.tarjetasultmodusuario)
        }


        return tarjetas

    }

    public async agregarTarjeta(nuevaTarjeta: ITarjeta, tags: string[]) {
        try{
            return await this.tarjetasDAO.agregarTarjeta(nuevaTarjeta)
            .then(async response => {
                if(response== 'tarjeta agregada') {
                    const idTarjeta = await this.tarjetasDAO.obtenerIdPorTitulo(nuevaTarjeta.tarjetastitulo);
                    await this.relacionesDAO.agregarRelaciones(tags, idTarjeta)
                    return 'tarjeta agregada'
                }
            })
        }
        catch(err){
            logger.error('Error en apiTarjetas-agregarTarjeta: ' + err);
        }
    }

    public async getTags(){
        try{
            let tags = await this.tagsDAO.obtenerTodos();

            return tags
        }
        catch(err){
            logger.error('Error en apiTarjetas-getTags: '+ err);
        }
    }

    async obtenerTagsOrdenados() {
 
        let arrayTags: string[] = [];

        let tags= await this.getTags();

        for (const t of tags) {
            
            arrayTags.push(t.tagsnombre)

        }

        return arrayTags.sort()

    }

    public async guardarCambiosYAprobar(idTarjeta: number, data: any): Promise<string> {
        try {
            if(data.titulo && data.cuerpo && data.tags) {
                await this.relacionesDAO.editarRelaciones(idTarjeta, data.tags);
                return await this.tarjetasDAO.actualizarDatosYAprobar(idTarjeta, data);
            } else {
                return 'campos incompletos'
            }
        }
        catch(err) {
            return 'error'
        }
    }

    public async rechazarTarjeta(idTarjeta: number, idUsuario: number | null) {
        try{
            return await this.tarjetasDAO.rechazarTarjeta(idTarjeta, idUsuario);
        }
        catch(err) {
            return 'error'
        }
    }
    public async aprobarTarjeta(idTarjeta: number, idUsuario: number | null) {
        try{
            return await this.tarjetasDAO.aprobarTarjeta(idTarjeta, idUsuario);
        }
        catch(err) {
            return 'error'
        }
    }
    public async evaluarTarjeta(idTarjeta: number, idUsuario: number | null) {
        try{
            return await this.tarjetasDAO.evaluarTarjeta(idTarjeta, idUsuario);
        }
        catch(err) {
            return 'error'
        }
    }

}