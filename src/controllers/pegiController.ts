import apiPegi from '../api/apiPegi';
import { Response, Request } from "express";
import { IPegi } from '../interfaces/IPegi';
import logger from '../logger';

export default class apiController {
    
    private api: apiPegi = new apiPegi();

    public async getPegi(req: Request, res: Response){
        try{
            let pegi = await this.api.obtenerPegi();
            let pegiConvertido: IPegi = this.convertirData(pegi)
            pegiConvertido = {
                ejes: this.quitarDuplicados(pegiConvertido.ejes, 'idejes'),
                objetivos: this.quitarDuplicados(pegiConvertido.objetivos, 'idobjetivos'),
                lineas: this.quitarDuplicados(pegiConvertido.lineas, 'idlineas'),
                planesDeAccion: this.quitarDuplicados(pegiConvertido.planesDeAccion, 'idplanesdeaccion')
            }
            return res.json(pegiConvertido)
        }
        catch(err){
            logger.error('Error en getPegi: ' + err);
            return res.json({result: 'error en el servidor'})
        }
    }

    private convertirData(pegiFiltrado: any[]){
        try {
            let ejes: any[] = [] ;
            let objetivos: any[]  = [];
            let lineas: any[]  = [];
            let planesDeAccion: any[]  = [];
    
            for (const row of pegiFiltrado) {
                ejes.push({
                    idejes: row.idejes,
                    ejesnombre: row.ejesnombre
                })
                objetivos.push({
                    idobjetivos: row.idobjetivos,
                    objetivosnombre: row.objetivosnombre,
                    objetivoseje: row.objetivoseje
                })
                lineas.push({
                    idlineas: row.idlineas,
                    lineasnombre: row.lineasnombre,
                    lineasobjetivo: row.lineasobjetivo
                })
                planesDeAccion.push({
                    idplanesdeaccion: row.idplanesdeaccion,
                    planesdeaccionnombre: row.planesdeaccionnombre,
                    planesdeaccionlinea: row.planesdeaccionlinea,
                    planesdeaccionarea: row.planesdeaccionarea,
                    areasnombre: row.areasnombre,
                    areasdescripcion: row.areasdescripcion
                })
            }
    
            return {
                ejes: ejes, 
                objetivos: objetivos, 
                lineas: lineas, 
                planesDeAccion: planesDeAccion
            }
        }
        catch(err) {
            logger.error('Error en convertirData: ' + err)
            
            return {
                ejes: [], 
                objetivos: [], 
                lineas: [], 
                planesDeAccion: []
            }
        }
        
    }

    private quitarDuplicados(arrIn: any[] | undefined, propiedad: string) {
        try {

            if(arrIn) {
                let arrOut: any[]= [];

                arrOut.push(arrIn[0])
        
                for(let elem of arrIn){
        
                    let repetido = arrOut.find((item: any) => item[propiedad] === elem[propiedad])
                    
                    if(repetido === undefined) arrOut.push(elem)
                    
                }
        
                return arrOut;
            }
      
        } catch(err) {
            logger.error('Error en quitarDuplicados: ' + err)
        }
      
    }

    public async getPegiFiltrado(req: Request, res: Response): Promise<Response>{
        try {
            let area = req.session.area;
            let pegiFiltrado = await this.api.obtenerPegi(area);
            let pegiConvertido: IPegi = this.convertirData(pegiFiltrado)
            pegiConvertido = {
                ejes: this.quitarDuplicados(pegiConvertido.ejes, 'idejes'),
                objetivos: this.quitarDuplicados(pegiConvertido.objetivos, 'idobjetivos'),
                lineas: this.quitarDuplicados(pegiConvertido.lineas, 'idlineas'),
                planesDeAccion: this.quitarDuplicados(pegiConvertido.planesDeAccion, 'idplanesdeaccion')
            }
            return res.json(pegiConvertido)
        }
        catch(err) {
            logger.error('Error en getPegiFiltrado: ' + err);
            return res.json({result: 'error en el servidor'})
        }
    }

    public async descargarPegi(req: Request, res: Response): Promise<void> {
        try {
            const file = `${__dirname}/public/files/IF-2022-62930192-APN-GG%INCAA.pdf`;
            res.download(file);
        }
        catch(err) {
            logger.error('Error en descargarPegi: ' + err)
        }

    }

    public async descargarNorma(req: Request, res: Response): Promise<void>{
        try{
            const file = `${__dirname}/public/files/RS-2022-71880387-APN-INCAA%MC.pdf`;
            res.download(file)
        }
        catch(err){
            logger.error('Error en descargarNorma: ' + err)
        }
    }
}