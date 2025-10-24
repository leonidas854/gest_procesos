import {Tipo, Combinacion} from  "../types/process"

export const Descripciones: Record<Tipo | Combinacion, { descripcion: string; uso_comun: string }> = {
  FCFS: {
    descripcion:
      "First Come, First Served (FCFS): atiende los procesos en el orden en que llegan. No es expropiativo, lo que significa que un proceso no puede ser interrumpido hasta que termine. Sencillo pero puede generar el efecto convoy.",
    uso_comun:
      "Sistemas por lotes o entornos donde el orden de llegada tiene mayor prioridad que la rapidez de respuesta.",
  },
  SJF: {
    descripcion:
      "Shortest Job First (SJF): selecciona el proceso con la ráfaga de CPU más corta. Minimiza el tiempo promedio de espera, pero requiere conocer o estimar la duración de los procesos. No expropiativo.",
    uso_comun:
      "Ideal para sistemas por lotes o simulaciones donde se conoce el tiempo de CPU de cada proceso.",
  },
  SRT: {
    descripcion:
      "Shortest Remaining Time (SRT): versión expropiativa del SJF. Si llega un proceso con menor tiempo restante, interrumpe al actual. Favorece procesos cortos y mejora el tiempo de respuesta promedio.",
    uso_comun:
      "Sistemas interactivos o multitarea donde se busca reducir la latencia y mejorar la capacidad de respuesta.",
  },
  RR: {
    descripcion:
      "Round Robin (RR): asigna un quantum de tiempo fijo a cada proceso. Si no termina en su turno, pasa al final de la cola. Es expropiativo y equitativo entre todos los procesos.",
    uso_comun:
      "Sistemas operativos de tiempo compartido o entornos interactivos donde todos los procesos deben recibir CPU regularmente.",
  },
  PRIORIDAD: {
    descripcion:
      "Planificación por Prioridad: los procesos se ordenan según su nivel de prioridad. Puede ser expropiativo o no, dependiendo de si un proceso de mayor prioridad interrumpe al actual.",
    uso_comun:
      "Sistemas en tiempo real o entornos donde algunas tareas son más críticas que otras.",
  },

  // -------------------- COMBINADOS --------------------
  "FCFS + SJF": {
    descripcion:
      "Combina el orden de llegada de FCFS con el criterio de ráfaga más corta de SJF para desempatar procesos con la misma llegada. No expropiativo.",
    uso_comun:
      "Simulaciones académicas o sistemas con llegada simultánea de procesos donde se busca simplicidad y eficiencia.",
  },
  "FCFS + SRT": {
    descripcion:
      "Aplica FCFS como orden base, pero permite interrupciones siguiendo el criterio de menor tiempo restante (SRT). Es expropiativo y prioriza procesos cortos que llegan después.",
    uso_comun:
      "Sistemas mixtos que combinan equidad de llegada con rapidez de respuesta a procesos cortos.",
  },
  "FCFS + Prioridad": {
    descripcion:
      "Ejecuta primero según prioridad, pero los procesos con la misma prioridad se atienden por orden de llegada (FCFS).",
    uso_comun:
      "Sistemas que necesitan respetar prioridades sin perder el orden de llegada como factor justo.",
  },
  "SJF + Prioridad": {
    descripcion:
      "Primero se selecciona el grupo de procesos con mayor prioridad y, dentro de ellos, el de menor ráfaga de CPU (SJF). No expropiativo.",
    uso_comun:
      "Entornos donde se busca balancear eficiencia y prioridad de tareas críticas.",
  },
  "SRT + Prioridad": {
    descripcion:
      "Combina la prioridad de los procesos con el criterio de tiempo restante (SRT). Un proceso puede interrumpir a otro si tiene mayor prioridad o menor tiempo restante.",
    uso_comun:
      "Sistemas en tiempo real o multitarea avanzada donde la prioridad y el tiempo son factores clave.",
  },
  "RR + Prioridad": {
    descripcion:
      "Cada proceso recibe un quantum de CPU (RR), pero los de mayor prioridad son seleccionados antes. Es expropiativo y flexible.",
    uso_comun:
      "Sistemas interactivos o multinivel donde se desea justicia entre procesos sin ignorar prioridades.",
  },
  "FCFS + RR": {
    descripcion:
      "Round Robin puede verse como una versión expropiativa de FCFS con interrupciones controladas mediante quantum. Equilibra justicia y simplicidad.",
    uso_comun:
      "Sistemas de transición entre planificación por lotes (FCFS) y tiempo compartido (RR).",
  },
};