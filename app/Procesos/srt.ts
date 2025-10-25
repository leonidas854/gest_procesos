import {input,
    Result,
    GanttBlock,
    ProcesoDetallado
} from "../types/process";



export const srt_algoritmo = (data: input): Result => {
    const n = data.procesos.length;
    const t_llegada = data.t_Llegada ?? Array(n).fill(0);

    let procesos: ProcesoDetallado[] = data.procesos.map((proc, i) => ({
        nombre: proc,
        t_cpu: data.t_cpu[i],
        t_llegada: t_llegada[i],
        prioridad: 0,
        indiceOriginal: i,
        tiempoRestante: data.t_cpu[i],
    }));

    const resultadosEspera = new Array(n).fill(0);
    const resultadosRetorno = new Array(n).fill(0);
    const cronogramaCrudo: { proceso: string; tiempo: number }[] = []; 
    
    let tiempoActual = 0;
    let procesosCompletados = 0;

    while (procesosCompletados < n) {
        const procesosListos = procesos.filter(p => p.t_llegada <= tiempoActual && p.tiempoRestante! > 0);

        if (procesosListos.length === 0) {

            cronogramaCrudo.push({ proceso: 'IDLE', tiempo: tiempoActual });
            tiempoActual++;
            continue;
        }

        procesosListos.sort((a, b) => a.tiempoRestante! - b.tiempoRestante!);
        const procesoActual = procesosListos[0];

        cronogramaCrudo.push({ proceso: procesoActual.nombre, tiempo: tiempoActual });

        procesoActual.tiempoRestante!--;
        tiempoActual++;

        if (procesoActual.tiempoRestante === 0) {
            procesosCompletados++;
            const tiempoFinalizacion = tiempoActual;
            resultadosRetorno[procesoActual.indiceOriginal] = tiempoFinalizacion - procesoActual.t_llegada;
            resultadosEspera[procesoActual.indiceOriginal] = resultadosRetorno[procesoActual.indiceOriginal] - procesoActual.t_cpu;
        }
    }
    
    const cronograma: GanttBlock[] = [];
    if (cronogramaCrudo.length > 0) {
        let bloqueActual = {
            proceso: cronogramaCrudo[0].proceso,
            inicio: cronogramaCrudo[0].tiempo,
            fin: cronogramaCrudo[0].tiempo + 1
        };

        for (let i = 1; i < cronogramaCrudo.length; i++) {
            if (cronogramaCrudo[i].proceso === bloqueActual.proceso) {
                bloqueActual.fin++;
            } else {
                cronograma.push({ ...bloqueActual, duracion: bloqueActual.fin - bloqueActual.inicio });
                bloqueActual = {
                    proceso: cronogramaCrudo[i].proceso,
                    inicio: cronogramaCrudo[i].tiempo,
                    fin: cronogramaCrudo[i].tiempo + 1
                };
            }
        }
        cronograma.push({ ...bloqueActual, duracion: bloqueActual.fin - bloqueActual.inicio });
    }
    
    const totalEspera = resultadosEspera.reduce((a, b) => a + b, 0);
    const totalRetorno = resultadosRetorno.reduce((a, b) => a + b, 0);

    return {
        processes: [data],
        t_espera: resultadosEspera,
        t_retorno: resultadosRetorno,
        t_promedio_espera: parseFloat((totalEspera / n).toFixed(2)),
        t_promedio_retorno: parseFloat((totalRetorno / n).toFixed(2)),
        tipo: 'SRT (Apropiativo)',
        cronograma: cronograma,
    };
};