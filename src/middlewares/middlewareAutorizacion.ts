import {Request, Response} from 'express';

export function midGeneral(req: Request, res: Response, next: any) {
    
    if(req.session.usuarioLogueado){
        next()
    } else {
        return res.redirect('/auth/login')
    }
}

export function midGG(req: Request, res: Response, next: any) {

    if(req.session.tipo == 2 || req.session.tipo == 5) next()

    else return res.redirect('/')
}