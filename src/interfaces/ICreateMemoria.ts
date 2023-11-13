type tipo = "gerencia" | "subgerencia" | "coordinacion" | "departamento";

export interface ICreateMemoria{
    anio: number,
    areaNombre: string ,
    areaTipo: tipo
}