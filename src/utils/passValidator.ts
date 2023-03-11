import bcrypt from 'bcrypt';
import {IUser} from '../interfaces/IUser';

export function contraseniaValida(user: IUser, contrasenia: string) {
    return bcrypt.compareSync(contrasenia, user.usuarioscontrasenia)
}

