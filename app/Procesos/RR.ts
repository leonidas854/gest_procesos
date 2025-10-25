import {input,
    Result,
    GanttBlock,
    ProcesoDetallado
} from "../types/process";


export const rr_algoritmo = (data: input): Result => {
    if (!data.quantum || data.quantum <= 0) {
        throw new Error('El algoritmo Round Robin requiere un "quantum" positivo.');
    }

    const ctx = data.ctx ?? 0;
    const n = data.procesos.length;
    const quantum = data.quantum;
    const t_llegada = data.t_Llegada ?? Array(n).fill(0);
    

    let procesos: ProcesoDetallado[] = data.procesos.map((proc, i) => ({
        nombre: proc,
        t_cpu: data.t_cpu[i],
        t_llegada: t_llegada[i],
        prioridad: data.prioridad?.[i] ?? 0,
        indiceOriginal: i,
        tiempoRestante: data.t_cpu[i], 
    }));

    procesos.sort((a, b) => a.t_llegada - b.t_llegada);

    const resultadosEspera = new Array(n).fill(0);
    const resultadosRetorno = new Array(n).fill(0);
    const cronograma: GanttBlock[] = [];
    const colaDeListos: ProcesoDetallado[] = [];
    
    let tiempoActual = 0;
    let procesosCompletados = 0;
    let indiceProximoProceso = 0;
    

    let ultimoProcesoEnCPU: ProcesoDetallado | null = null;

    while (procesosCompletados < n) {
        while (indiceProximoProceso < n && procesos[indiceProximoProceso].t_llegada <= tiempoActual) {
            colaDeListos.push(procesos[indiceProximoProceso]);
            indiceProximoProceso++;
        }

        if (colaDeListos.length === 0) {
            const proximaLlegada = procesos[indiceProximoProceso]?.t_llegada || tiempoActual;
            if (proximaLlegada > tiempoActual) {
                 cronograma.push({ proceso: 'IDLE', inicio: tiempoActual, fin: proximaLlegada, duracion: proximaLlegada - tiempoActual });
            }
            tiempoActual = proximaLlegada;
            ultimoProcesoEnCPU = null;
            continue;
        }

        const procesoActual = colaDeListos.shift()!;

        if (ctx > 0 && ultimoProcesoEnCPU !== null && ultimoProcesoEnCPU.nombre !== procesoActual.nombre) {
            const inicioCtx = tiempoActual;
            tiempoActual += ctx;
            cronograma.push({
                proceso: 'CTX.',
                inicio: inicioCtx,
                fin: tiempoActual,
                duracion: ctx
            });
            
            while (indiceProximoProceso < n && procesos[indiceProximoProceso].t_llegada <= tiempoActual) {
                colaDeListos.push(procesos[indiceProximoProceso]);
                indiceProximoProceso++;
            }
        }
        
        const tiempoDeEjecucion = Math.min(quantum, procesoActual.tiempoRestante!); 
        const inicioEjecucion = tiempoActual;
        
        cronograma.push({
            proceso: procesoActual.nombre,
            inicio: inicioEjecucion,
            fin: inicioEjecucion + tiempoDeEjecucion,
            duracion: tiempoDeEjecucion
        });
        
        tiempoActual += tiempoDeEjecucion;
        procesoActual.tiempoRestante! -= tiempoDeEjecucion; 

        while (indiceProximoProceso < n && procesos[indiceProximoProceso].t_llegada <= tiempoActual) {
            colaDeListos.push(procesos[indiceProximoProceso]);
            indiceProximoProceso++;
        }

        if (procesoActual.tiempoRestante! > 0) { 
            colaDeListos.push(procesoActual);
        } else {
            procesosCompletados++;
            resultadosRetorno[procesoActual.indiceOriginal] = tiempoActual - procesoActual.t_llegada;
            resultadosEspera[procesoActual.indiceOriginal] = resultadosRetorno[procesoActual.indiceOriginal] - procesoActual.t_cpu;
        }


        ultimoProcesoEnCPU = procesoActual;
    }

    const totalEspera = resultadosEspera.reduce((a, b) => a + b, 0);
    const totalRetorno = resultadosRetorno.reduce((a, b) => a + b, 0);

    return {
        processes: [data],
        t_espera: resultadosEspera,
        t_retorno: resultadosRetorno,
        t_promedio_espera: parseFloat((totalEspera / n).toFixed(2)),
        t_promedio_retorno: parseFloat((totalRetorno / n).toFixed(2)),
        tipo: `Round Robin`,
        cronograma: cronograma,
    };
};