type tipo = "realizada" | "proyectada";

export interface ICreateAccion{
    
    memoria: number,
    titulo: string,
    eje: string,
    descripcion?: string,
    resultados?: string,
    resumen: string,
    tags: string[],
    tipo: tipo

}   