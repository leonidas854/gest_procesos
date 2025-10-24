import {input,
    Result,
    GanttBlock,
    ProcesoDetallado
} from "../../types/process";



export const srt_algoritmo = (data: input): Result => {
    const n = data.procesos.length;
    const t_llegada = data.t_Llegada ?? Array(n).fill(0);

    let procesos: ProcesoDetallado[] = data.procesos.map((proc, i) => ({
        nombre: proc,
        t_cpu: data.t_cpu[i],
        t_llegada: t_llegada[i],
        prioridad: 0, // No se usa
        indiceOriginal: i,
        tiempoRestante: data.t_cpu[i],
    }));

    const resultadosEspera = new Array(n).fill(0);
    const resultadosRetorno = new Array(n).fill(0);
    const cronogramaCrudo: GanttBlock[] = [];
    
    let tiempoActual = 0;
    let procesosCompletados = 0;
    let ultimoProcesoEjecutado: string | null = null;

    while (procesosCompletados < n) {
        const procesosListos = procesos.filter(p => p.t_llegada <= tiempoActual && p.tiempoRestante! > 0);

        if (procesosListos.length === 0) {
            ultimoProcesoEjecutado = 'IDLE';
            tiempoActual++;
            continue;
        }

     
        procesosListos.sort((a, b) => a.tiempoRestante! - b.tiempoRestante!);
        const procesoActual = procesosListos[0];

        if (procesoActual.nombre !== ultimoProcesoEjecutado) {
             cronogramaCrudo.push({ proceso: procesoActual.nombre, inicio: tiempoActual, fin: tiempoActual + 1, duracion: 1});
        } else {
             cronogramaCrudo[cronogramaCrudo.length - 1].fin++;
             cronogramaCrudo[cronogramaCrudo.length - 1].duracion++;
        }
        ultimoProcesoEjecutado = procesoActual.nombre;

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
    if(cronogramaCrudo.length > 0){
        cronograma.push(JSON.parse(JSON.stringify(cronogramaCrudo[0])));
        for (let i = 1; i < cronogramaCrudo.length; i++) {
            if (cronogramaCrudo[i].proceso === cronograma[cronograma.length - 1].proceso) {
                cronograma[cronograma.length - 1].fin = cronogramaCrudo[i].fin;
                cronograma[cronograma.length - 1].duracion = cronograma[cronograma.length - 1].fin - cronograma[cronograma.length - 1].inicio;
            } else {
                cronograma.push(JSON.parse(JSON.stringify(cronogramaCrudo[i])));
            }
        }
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