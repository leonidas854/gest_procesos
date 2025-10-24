"use client";

import React from 'react';
import { Proceso } from '@/components/ProcesosInputForm'; // Importa la interfaz Proceso

// --- INTERFACES INTERNAS ---

interface TaskListProps {
  procesos: Proceso[];
}

interface TimeScaleProps {
  procesos: Proceso[];
  // Podríamos añadir una duración total máxima o una escala de tiempo dinámica
  // Para simplificar, asumiremos que las barras de Gantt se calculan en base a tiempoCPU
  maxTime: number; 
}

interface DiagramaGanttProps {
  procesos: Proceso[];
  // Podríamos añadir aquí más props para configurar el diagrama, si fuera necesario
}

// --- SUB-COMPONENTE: TaskList (Lista de Nombres de Tareas) ---

const TaskList: React.FC<TaskListProps> = ({ procesos }) => {
  return (
    <div className="gantt-task-list">
      {procesos.map(proceso => (
        <div key={proceso.id} className="gantt-task-list-item">
          {proceso.nombre}
        </div>
      ))}
    </div>
  );
};

// --- SUB-COMPONENTE: TimeScale (Escala de Tiempo y Barras de Gantt) ---

const TimeScale: React.FC<TimeScaleProps> = ({ procesos, maxTime }) => {
  // Genera un array de números para la escala de tiempo (días/unidades)
  const timeUnits = Array.from({ length: maxTime + 1 }, (_, i) => i); 
  
  return (
    <div className="gantt-time-scale">
      {/* Cabecera de la escala de tiempo */}
      <div className="gantt-time-scale-header">
        {timeUnits.map(unit => (
          <div key={unit} className="time-unit">{unit}</div>
        ))}
      </div>

      {/* Filas de las tareas con sus barras de Gantt */}
      <div className="gantt-time-scale-body">
        {procesos.map(proceso => (
          <div key={proceso.id} className="gantt-row">
            {/* Las "celdas" para cada unidad de tiempo */}
            {timeUnits.map(unit => (
              <div key={`${proceso.id}-${unit}`} className="gantt-grid-cell"></div>
            ))}
            {/* Barra de Gantt del proceso */}
            {/* Aquí asumimos que el tiempoLlegada y tiempoCPU son los que determinan la posición y el ancho */}
            {proceso.tiempoLlegada !== undefined && proceso.tiempoCPU > 0 && (
              <div 
                className="gantt-bar"
                style={{
                  left: `${(proceso.tiempoLlegada / maxTime) * 100}%`, // Posición inicial
                  width: `${(proceso.tiempoCPU / maxTime) * 100}%`,   // Ancho de la barra
                  // Estos estilos son simplificados, en un algoritmo real la posición y duración
                  // de la barra cambiarían según el resultado de la planificación.
                }}
              >
                {proceso.tiempoCPU}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};


// --- COMPONENTE PRINCIPAL: DiagramaGantt ---

export default function DiagramaGantt({ procesos }: DiagramaGanttProps) {
  // Calculamos el tiempo máximo para la escala del Gantt
  // Esto debería ser la suma de todos los tiempos de CPU + tiempos de llegada + cambios de contexto, etc.
  // Por ahora, una estimación simple: suma de todos los tiempos de CPU + el mayor tiempo de llegada.
  const maxTime = procesos.reduce((acc, p) => acc + (p.tiempoCPU || 0), 0) + 
                  (procesos.length > 0 ? Math.max(...procesos.map(p => p.tiempoLlegada || 0)) : 0);

  return (

      <div className="gantt-container">
        <TaskList procesos={procesos} />
        <TimeScale procesos={procesos} maxTime={maxTime} />
      </div>
  );
}
