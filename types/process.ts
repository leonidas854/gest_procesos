export type Tipo = 'FCFS' | 'SJF' | 'SRT' | 'RR' | 'PRIORIDAD';

export type Combinacion =
  | 'FCFS + SJF'
  | 'FCFS + SRT'
  | 'FCFS + Prioridad'
  | 'SJF + Prioridad'
  | 'SRT + Prioridad'
  | 'RR + Prioridad'
  | 'FCFS + RR';

export interface input {
   procesos: Array<string>;
   Tipo:Tipo;
   t_cpu:Array<number>;
   combinaciones?: Combinacion;
   prioridad?: Array<number>;
   t_Llegada?: Array<number>;
   quantum?: number;
   ctx? : number;
}
export interface Result {
    processes: input[];
    t_espera : Array<number>;
    t_retorno : Array<number>;
    t_promedio_espera : number;
    t_promedio_retorno : number;
    descripcion? : string;
    uso_comun?:string;
    tipo?:string;
    cronograma: GanttBlock[];
}

export interface GanttBlock {
    proceso: string; 
    inicio: number;
    fin: number;
    duracion: number;
}

export interface ProcesoDetallado {
    nombre: string;
    t_cpu: number;
    t_llegada: number;
    prioridad: number;
    indiceOriginal: number;
    tiempoRestante?: number;
}



