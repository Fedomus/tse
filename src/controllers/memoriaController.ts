import { Response, Request } from "express";
import apiAreas from "../api/apiAreas";
import apiTarjetas from "../api/apiTarjetas";
import apiMemorias from "../api/apiMemorias";
import { ICreateMemoria } from "../interfaces/ICreateMemoria";
import { IEditArea } from "../interfaces/IEditArea";
import { ICreateAccion } from "../interfaces/ICreateAccion";
import { IEditMemoria } from "../interfaces/IEditMemoria";

export default class memoriaController {

    private apiAreas = new apiAreas();
    private apiTarjetas = new apiTarjetas();
    private apiMemorias = new apiMemorias();

    public async getFormulario(req: Request, res: Response) {

        return res.render('../views/pages/memoria/formulario.ejs')
    }

    public async getAcciones(req: Request, res:Response){
        let acciones = await this.apiMemorias.obtenerAcciones();
        return res.status(200).json(acciones)
    }
    
    public async getGerencias(req: Request, res: Response) {
        let gerencias = await this.apiAreas.obtenerGerencias();
        return res.status(200).json(gerencias)
    }


    public async getSubgerencias(req: Request, res: Response){
        let subgerencias = await this.apiAreas.obtenerSubgerencias();
        return res.status(200).json(subgerencias)
    }

    public async getCoordinaciones(req: Request, res: Response){
        let coordinaciones = await this.apiAreas.obtenerCoordinaciones();
        return res.status(200).json(coordinaciones)
    }

    public async getDepartamentos(req: Request, res: Response){
        let departamentos = await this.apiAreas.obtenerDepartamentos();
        return res.status(200).json(departamentos)
    }

    public async getTags(req: Request, res: Response){
        let tags = await this.apiTarjetas.getTags();
        return res.status(200).json(tags)
    }

    public async getMemorias(req: Request, res: Response){

        let memorias = await this.apiMemorias.obtenerMemorias();
    
        return res.status(200).json(memorias)
    }

    public async postMemorias(req: Request, res: Response){

        let memoria: ICreateMemoria = req.body;

        try{
            await this.apiMemorias.crearMemoria(memoria);
            res.status(200).json({success: true})
        }
        catch{
            res.status(204).json({error: 'no se pudo crear memoria'})
        }
 
    }

    public async putArea(req: Request, res: Response) {

        let data: IEditArea = req.body;        

        try {
            await this.apiAreas.editarDescripcionArea(data);
            res.status(200).json({ success: true});
        }
        catch{
            res.status(204).json({error: 'no se pudo editar la descripcion'})
        }
        
    }

    public async postAcciones(req: Request, res: Response) {

        let nuevaAccion: ICreateAccion = req.body;

        try {
            await this.apiMemorias.crearAccion(nuevaAccion);
            res.status(200).json({success: true})
        }
        catch{
            res.status(204).json({error: 'no se pudo crear accion'})
        }
   

    }


    public async putMemoria(req: Request, res: Response) {

        try{

            let data: IEditMemoria = req.body

            await this.apiMemorias.guardarSintesis(data)
       
            res.status(200).json({success: true})
        }
        catch{

            res.status(204).json({success: false})
        }
        
    }

}