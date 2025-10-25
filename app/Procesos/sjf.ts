import {input,
    Result,
    GanttBlock,
    ProcesoDetallado
} from "../types/process";




export const sjf_algoritmo = (data: input): Result => {
    const n = data.procesos.length;
    const t_llegada = data.t_Llegada ?? Array(n).fill(0);

    let procesos: ProcesoDetallado[] = data.procesos.map((proc, i) => ({
        nombre: proc,
        t_cpu: data.t_cpu[i],
        t_llegada: t_llegada[i],
        prioridad : 0,
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
      
            if (proximaLlegada > tiempoActual) {
                cronograma.push({
                    proceso: 'IDLE',
                    inicio: tiempoActual,
                    fin: proximaLlegada,
                    duracion: proximaLlegada - tiempoActual
                });
            }
            tiempoActual = proximaLlegada;
            continue;
        }

        procesosListos.sort((a, b) => a.t_cpu - b.t_cpu);
        const procesoActual = procesosListos[0];

  
        const tiempoEspera = tiempoActual - procesoActual.t_llegada;
        resultadosEspera[procesoActual.indiceOriginal] = tiempoEspera;

        const tiempoInicioEjecucion = tiempoActual;
        const tiempoFinEjecucion = tiempoActual + procesoActual.t_cpu;
        
        cronograma.push({
            proceso: procesoActual.nombre,
            inicio: tiempoInicioEjecucion,
            fin: tiempoFinEjecucion,
            duracion: procesoActual.t_cpu
        });


        tiempoActual = tiempoFinEjecucion;
        resultadosRetorno[procesoActual.indiceOriginal] = tiempoActual - procesoActual.t_llegada;
        
        procesosCompletados.push(procesoActual);
    }
    
    const totalEspera = resultadosEspera.reduce((acc, val) => acc + val, 0);
    const totalRetorno = resultadosRetorno.reduce((acc, val) => acc + val, 0);
    
    return {
        processes: [data],
        t_espera: resultadosEspera,
        t_retorno: resultadosRetorno,
        t_promedio_espera: parseFloat((totalEspera / n).toFixed(2)),
        t_promedio_retorno: parseFloat((totalRetorno / n).toFixed(2)),
        tipo: 'SJF (No Apropiativo)',
        cronograma: cronograma 
    };
};