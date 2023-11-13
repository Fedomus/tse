import { ICreateAccion } from "../interfaces/ICreateAccion";
import { ICreateMemoria } from "../interfaces/ICreateMemoria";
import { IEditMemoria } from "../interfaces/IEditMemoria";
import { accionesDAO } from "../models/DAOs/accionesDAO";
import { accionesViewDAO } from "../models/DAOs/accionesViewDAO";
import { memoriasDAO } from "../models/DAOs/memoriasDAO";

export default class apiMemorias {

    private acciones = new accionesDAO();
    private memoria = new memoriasDAO();
    private accionesView = new accionesViewDAO();
    
    public async obtenerAcciones(){
        let acciones = await this.accionesView.getAll();
        return acciones
    }

    public async crearAccion(nuevaAccion: ICreateAccion){

        await this.acciones.crearAccion(nuevaAccion);
    }

    public async obtenerMemorias(){

        return await this.memoria.getAll();
    }

    public async crearMemoria(memoria: ICreateMemoria){

        await this.memoria.crearMemoria(memoria)
    }

    public async guardarSintesis(data: IEditMemoria) {

        await this.memoria.guardarSintesis(data);
    }

}