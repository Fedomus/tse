import logger from "../../logger";
import contenedorSQL from "../contenedorSQL";
import { tagsDAO } from "./tagsDAO";


export default class relacionesDAO extends contenedorSQL{

    private tagsDAO: tagsDAO = new tagsDAO();

    constructor() {
        super('relaciones')
    }

    public async agregarRelaciones(tags: string[], idTarjeta: number){
        try {
            for (const t of tags) {
                const idTag = await this.tagsDAO.obtenerIdPorNombre(t);
                this.save({
                    idrelacion: null,
                    relaciontarjeta: idTarjeta,
                    relaciontag: idTag
                })
            }
        }
        catch(err) {
            logger.error("Error en relacionesDAO - agregarRelacion: " + err)
        }
    }

    async editarRelaciones(idTarjeta: number, tags: string[]) {
    
        this.knex(this.tabla)
        .where({
            relaciontarjeta: idTarjeta
        })
        .del()
        .then(
            async () => {
                for (const t of tags) {
            
                    const idTag = await this.tagsDAO.obtenerIdPorNombre(t);
        
                    this.save({
                        idrelacion: null,
                        relaciontag: idTag,
                        relaciontarjeta: idTarjeta
                    })
                }
            }
        )
        .catch((err: any) => {
            logger.error("Error en relacionesDAO- editarRelaciones: " + err)
        })
    }

    async obtenerPorTarjeta(idTarjeta: number) {

        try {
            return this.knex(this.tabla)
            .where({
                relaciontarjeta: idTarjeta
            })
        }
        catch(err) {
            logger.error("Error en relacionesDAO- obtenerPorTarjeta: " + err)
        }

    }
}