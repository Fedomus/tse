export interface ITarjeta {
    idtarjetas: number | undefined;
    tarjetastitulo: string;
    tarjetascuerpo: string;
    tarjetasautor: number | null;
    tarjetasareas: string | number;
    tarjetasexpediente: string;
    tarjetasactoadministrativo: string;
    tarjetasejes: number | string;
    tarjetasobjetivos: number | string;
    tarjetastags?: string[];
    tarjetaslineas: number | string;
    tarjetasplandeaccion: number | string;
    tarjetasestado: number;
    tarjetasfecha: Date | string;
    tarjetasultmodusuario?: number;
}