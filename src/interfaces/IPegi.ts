interface eje {
    idejes: number;
    ejesnombre: string;
}

interface objetivo {
    idobjetivos: number;
    objetivosnombre: string;
    objetivoseje: number;
}

interface linea {
    idlineas: number;
    lineasnombre: string;
    lineasobjetivo: number;
}

interface planDeAccion {
    idplanesdeaccion: number;
    planesdeaccionnombre: string;
    planesdeaccionlinea: number;
    planesdeaccionarea: string;
}

export interface IPegi{
    ejes: eje[] | undefined;
    objetivos: objetivo[] | undefined;
    lineas: linea[] | undefined;
    planesDeAccion: planDeAccion[] | undefined;
}