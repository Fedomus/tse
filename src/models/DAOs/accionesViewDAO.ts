import logger from "../../logger";
import contenedorSQL from "../contenedorSQL";

export class accionesViewDAO extends contenedorSQL {

    constructor() {
        super("acciones_view")
    }

}