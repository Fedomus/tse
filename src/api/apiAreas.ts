import { IEditArea } from '../interfaces/IEditArea';
import logger from '../logger';
import { accionesDAO } from '../models/DAOs/accionesDAO';
import {areasDAO} from '../models/DAOs/areasDAO';
import { coordinacionesDAO } from '../models/DAOs/coordinacionesDAO';
import { departamentosDAO } from '../models/DAOs/departamentosDAO';
import { gerenciasDAO } from '../models/DAOs/gerenciasDAO';
import { subgerenciasDAO } from '../models/DAOs/subgerenciasDAO';

export default class apiAreas {
    
    private dao: areasDAO = new areasDAO();
    private GerenciasDAO = new gerenciasDAO();
    private SubgerenciasDAO = new subgerenciasDAO();
    private CoordinacionesDAO = new coordinacionesDAO();
    private DepartamentosDAO = new departamentosDAO();

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

    public async obtenerGerencias(){
        return await this.GerenciasDAO.getAll()
        .then(response => {
            return response
        })
        .catch(err => {
            logger.error("Error en obtenerGerencias: " + err)
        })
    }

    public async obtenerSubgerencias(){
        return await this.SubgerenciasDAO.getAll()
        .then(response => {
            return response
        })
        .catch(err => {
            logger.error("Error en obtenerSubgerencias: " + err)
        })
    }

    public async obtenerCoordinaciones(){
        return await this.CoordinacionesDAO.getAll()
        .then(response =>{
            return response
        })
        .catch(err => {
            logger.error("Error en obtenerCoordinaciones: " + err)
        })
    }

    public async obtenerDepartamentos(){
        return await this.DepartamentosDAO.getAll()
        .then(response => {
            return response
        })
        .catch(err => {
            logger.error("Error en obtenerDepartamentos. " + err)
        })
    }

    public async editarDescripcionArea(data: IEditArea){

        switch(data.areaTipo){

            case "gerencia":
                await this.GerenciasDAO.editarDescripcion(data);
                break;

            case "subgerencia":
                await this.SubgerenciasDAO.editarDescripcion(data);
                break;

            case "coordinacion":
                await this.CoordinacionesDAO.editarDescripcion(data);
                break;

            case "departamento":
                await this.DepartamentosDAO.editarDescripcion(data)
                break;
        }

    }

}