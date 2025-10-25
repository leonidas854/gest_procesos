
import {input,
    Result,
    GanttBlock,
    ProcesoDetallado
} from "../types/process";



export const fcfs_algoritmo = (data: input): Result => {
    const n = data.procesos.length;
    const t_llegada = data.t_Llegada ?? Array(n).fill(0);

    let procesos: ProcesoDetallado[] = data.procesos.map((proc, i) => ({
        nombre: proc,
        t_cpu: data.t_cpu[i],
        t_llegada: t_llegada[i],
        prioridad: 0, 
        indiceOriginal: i,
    }));

    
    procesos.sort((a, b) => a.t_llegada - b.t_llegada);

    const resultadosEspera = new Array(n).fill(0);
    const resultadosRetorno = new Array(n).fill(0);
    const cronograma: GanttBlock[] = [];
    let tiempoActual = 0;

    for (const proceso of procesos) {
       
        if (tiempoActual < proceso.t_llegada) {
            cronograma.push({
                proceso: 'IDLE',
                inicio: tiempoActual,
                fin: proceso.t_llegada,
                duracion: proceso.t_llegada - tiempoActual
            });
            tiempoActual = proceso.t_llegada;
        }

  
        resultadosEspera[proceso.indiceOriginal] = tiempoActual - proceso.t_llegada;

        const inicioEjecucion = tiempoActual;
        tiempoActual += proceso.t_cpu;
        const finEjecucion = tiempoActual;

        cronograma.push({
            proceso: proceso.nombre,
            inicio: inicioEjecucion,
            fin: finEjecucion,
            duracion: proceso.t_cpu
        });

        resultadosRetorno[proceso.indiceOriginal] = finEjecucion - proceso.t_llegada;
    }

    const totalEspera = resultadosEspera.reduce((a, b) => a + b, 0);
    const totalRetorno = resultadosRetorno.reduce((a, b) => a + b, 0);

    return {
        processes: [data],
        t_espera: resultadosEspera,
        t_retorno: resultadosRetorno,
        t_promedio_espera: parseFloat((totalEspera / n).toFixed(2)),
        t_promedio_retorno: parseFloat((totalRetorno / n).toFixed(2)),
        tipo: 'FCFS',
        cronograma: cronograma,
    };
};