import contenedorSQL from "../contenedorSQL"

const tabla: string = 'usuarios_view'

export class usuariosViewDAO extends contenedorSQL {

    constructor() {
        super(tabla)
    }

    public async obtenerTodos() {
        return await this.getAll()
    }

}