import {input,
    Result,
    GanttBlock,
    ProcesoDetallado
} from "../types/process";


export const prioridad_algoritmo = (data: input): Result => {
    const n = data.procesos.length;
    if (!data.prioridad || data.prioridad.length !== n) {
        throw new Error('El array de prioridades es requerido para este algoritmo y debe tener la misma longitud que el de procesos.');
    }

    const t_llegada = data.t_Llegada ?? Array(n).fill(0);

    let procesos: ProcesoDetallado[] = data.procesos.map((proc, i) => ({
        nombre: proc,
        t_cpu: data.t_cpu[i],
        t_llegada: t_llegada[i],
        prioridad: data.prioridad![i],
        indiceOriginal: i,
    }));

    const resultadosEspera = new Array(n).fill(0);
    const resultadosRetorno = new Array(n).fill(0);
    const procesosCompletados: ProcesoDetallado[] = [];
    const cronograma: GanttBlock[] = [];
    
    let tiempoActual = 0;

    while (procesosCompletados.length < n) {
        const procesosListos = procesos.filter(p => 
            p.t_llegada <= tiempoActual && !procesosCompletados.some(pc => pc.indiceOriginal === p.indiceOriginal)
        );

        if (procesosListos.length === 0) {
            const procesosPendientes = procesos.filter(p => !procesosCompletados.some(pc => pc.indiceOriginal === p.indiceOriginal));
            const proximaLlegada = Math.min(...procesosPendientes.map(p => p.t_llegada));
            cronograma.push({ proceso: 'IDLE', inicio: tiempoActual, fin: proximaLlegada, duracion: proximaLlegada - tiempoActual });
            tiempoActual = proximaLlegada;
            continue;
        }


        procesosListos.sort((a, b) => a.prioridad - b.prioridad);
        const procesoActual = procesosListos[0];

    
        resultadosEspera[procesoActual.indiceOriginal] = tiempoActual - procesoActual.t_llegada;
        const inicioEjecucion = tiempoActual;
        tiempoActual += procesoActual.t_cpu;
        
        cronograma.push({
            proceso: procesoActual.nombre,
            inicio: inicioEjecucion,
            fin: tiempoActual,
            duracion: procesoActual.t_cpu
        });
        
        resultadosRetorno[procesoActual.indiceOriginal] = tiempoActual - procesoActual.t_llegada;
        procesosCompletados.push(procesoActual);
    }
    
    const totalEspera = resultadosEspera.reduce((a, b) => a + b, 0);
    const totalRetorno = resultadosRetorno.reduce((a, b) => a + b, 0);

    return {
        processes: [data],
        t_espera: resultadosEspera,
        t_retorno: resultadosRetorno,
        t_promedio_espera: parseFloat((totalEspera / n).toFixed(2)),
        t_promedio_retorno: parseFloat((totalRetorno / n).toFixed(2)),
        tipo: 'Prioridad (No Apropiativo)',
        cronograma: cronograma,
    };
};