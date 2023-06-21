import {createHash} from './utils/hashGenerator';
import { usuariosDAO } from "./models/DAOs/usuariosDAO";
import logger from './logger';

const dbUsuarios = new usuariosDAO();


async function actualizarContrasenias() {

    const usuarios = await dbUsuarios.getAll();

    try{
        for (const usuario of usuarios) {

            await dbUsuarios.actualizarPass(usuario.usuariosnombre, createHash('temporal319'))
            
        }

        logger.info('Contraseñas actualizadas')
    }
    catch(err){

        logger.error('Hubo un error y no se pudieron actualizar las contraseñas')
    }

}

actualizarContrasenias();