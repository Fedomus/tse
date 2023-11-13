type tipo = "gerencia" | "subgerencia" | "coordinacion" | "departamento";

export interface IEditArea{ 

    areaTipo: tipo,
    areaNombre: string,
    areaDescripcion: string

}