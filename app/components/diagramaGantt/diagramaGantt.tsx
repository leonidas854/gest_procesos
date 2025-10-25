"use client";

import React from "react";
import "./diagramaGantt.css";
import { Result } from "../../types/process";

// --- Tipos ---
interface DiagramaGanttProps {
  resultado: Result;
}

interface GanttTask {
  id: string;
  name: string;
  start: number;
  end: number;
  duration: number;
}

const DiagramaGantt: React.FC<DiagramaGanttProps> = ({ resultado }) => {
  if (!resultado || !resultado.cronograma || resultado.cronograma.length === 0) {
    return (
      <div className="gantt-placeholder">
        <p>No hay datos para mostrar en el diagrama de Gantt.</p>
      </div>
    );
  }

  // Procesar datos para el diagrama
  const tasks: GanttTask[] = resultado.cronograma.map((item, index) => ({
    id: `task-${index}`,
    name: item.proceso,
    start: item.inicio,
    end: item.fin,
    duration: item.fin - item.inicio
  }));

  // Encontrar tiempo máximo
  const maxTime = Math.max(...tasks.map(task => task.end));
  
  // Generar escala de tiempo
  const timeScale = Array.from({ length: maxTime + 1 }, (_, i) => i);

  return (
    <div className="gantt-chart">
      {/* Header del diagrama */}
      <div className="gantt-header">
        <div className="gantt-header-left">
          <div className="header-cell process-header">Proceso</div>
        </div>
        <div className="gantt-header-right">
          {timeScale.map(time => (
            <div key={time} className="header-cell time-cell">
              {time}
            </div>
          ))}
        </div>
      </div>

      {/* Cuerpo del diagrama */}
      <div className="gantt-body">
        {tasks.map((task, index) => (
          <GanttRow 
            key={task.id}
            task={task}
            maxTime={maxTime}
            colorIndex={index}
          />
        ))}
      </div>

      {/* Timeline inferior */}
      <div className="gantt-timeline">
        {timeScale.map(time => (
          <div key={time} className="timeline-marker">
            <span>{time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente para cada fila del Gantt
interface GanttRowProps {
  task: GanttTask;
  maxTime: number;
  colorIndex: number;
}

const GanttRow: React.FC<GanttRowProps> = ({ task, maxTime, colorIndex }) => {
  const left = (task.start / maxTime) * 100;
  const width = (task.duration / maxTime) * 100;

  return (
    <div className="gantt-row">
      {/* Etiqueta del proceso */}
      <div className="gantt-row-label">
        <span>{task.name}</span>
      </div>
      
      {/* Área de la barra */}
      <div className="gantt-row-bars">
        {/* Línea de tiempo de fondo */}
        <div className="gantt-background-line"></div>
        
        {/* Barra del proceso */}
        <div
          className="gantt-task-bar"
          style={{
            left: `${left}%`,
            width: `${width}%`,
            backgroundColor: getColor(colorIndex),
          }}
        >
          <span className="task-bar-label">
            {task.name} ({task.duration}u)
          </span>
        </div>
      </div>
    </div>
  );
};

// Función mejorada para colores
function getColor(index: number): string {
  const colors = [
    "#4F46E5", "#059669", "#D97706", "#DC2626", 
    "#9333EA", "#0EA5E9", "#16A34A", "#F59E0B",
    "#EF4444", "#8B5CF6", "#06B6D4", "#84CC16"
  ];
  return colors[index % colors.length];
}

export default DiagramaGantt;