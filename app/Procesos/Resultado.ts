import {Tipo,
    Combinacion,
    input,
    Result
} from  "../../types/process"


import { Descripciones }from "../../data/planificacionInfo"

import { sjf_algoritmo } from "./sjf";
import { srt_algoritmo } from "./srt";
import { fcfs_algoritmo } from "./fcfs";
import { prioridad_algoritmo } from "./prioridades";


function generar_descripcion(tipo:Tipo , combinacion?:Combinacion){
    const key = combinacion || tipo;
    return Descripciones[key];
}
export function input_data(procesos:input):Result{

    let desc = generar_descripcion(procesos.Tipo,procesos.combinaciones);
    let tipo = procesos.Tipo;

     let result: Result = {
    processes: [],
    t_espera: [],
    t_retorno: [],
    t_promedio_espera: 0,
    t_promedio_retorno: 0,
    descripcion: "",
    uso_comun: "",
    tipo: "",
    cronograma: [],
  };

    switch(tipo){
        case "FCFS":
            result = fcfs_algoritmo(procesos);
            break;
        case "PRIORIDAD":
            result = prioridad_algoritmo(procesos);
            break;
        case "RR":
            result = sjf_algoritmo(procesos);
            break;
        case "SJF":
            result = sjf_algoritmo(procesos);
            break;
        case "SRT":
            result = srt_algoritmo(procesos);
            break;

        default:
            throw new Error('Tipo de planificacion no soportado $(tipo)');
    }


    result.descripcion = desc?.descripcion;
    result.uso_comun = desc?.uso_comun;


    return result;
}