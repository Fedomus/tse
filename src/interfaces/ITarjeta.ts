export interface ITarjeta {
    idtarjetas: number | null;
    tarjetastitulo: string;
    tarjetascuerpo: string;
    tarjetastags: string;
    tarjetasautor: number | null;
    tarjetasareas: string | number;
    tarjetasexpediente: string;
    tarjetasactoadministrativo: string;
    tarjetasejes: number | string;
    tarjetasobjetivos: number | string;
    tarjetaslineas: number | string;
    tarjetasplandeaccion: number | string;
    tarjetasestado: number;
    tarjetasfecha: Date | string;
}