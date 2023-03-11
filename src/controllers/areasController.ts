import apiAreas from '../api/apiAreas';
import logger from "../logger";

export default class areasController {
    
    private apiAreas: apiAreas = new apiAreas();

    public async getAreas(req, res) {
        try {           
            const areas = await this.apiAreas.obtenerTodas();
            res.json(areas)
        } 
        catch(err) {
            logger.error('Error en getAreas: ', err);
            return res.json({result: 'error en el servidor'})
        }
    }

    public async editarArea(req, res) {
        try {
            let idArea = req.params.id;
            let body = req.body;
            if(body.nombre && body.iniciales) {
                return await this.apiAreas.editarArea(idArea, body)
                .then(response => {
                    if(response == 'ok') {
                        return res.status(200).redirect('/admin')
                    }
                })
            }
        }
        catch(err) {
            logger.error('error en editarArea: ' + err)
            return res.json({result: 'error en el servidor'})
        }
    }
}