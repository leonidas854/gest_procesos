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

  // Convertir directamente el cronograma a tareas
  const tasks: GanttTask[] = resultado.cronograma.map((item, index) => ({
    id: `task-${index}`,
    name: item.proceso,
    start: item.inicio,
    end: item.fin,
    duration: item.fin - item.inicio
  }));

  // Encontrar tiempo máximo
  const maxTime = Math.max(...tasks.map(task => task.end), 0);
  
  // Generar escala de tiempo
  const timeScale = Array.from({ length: maxTime + 1 }, (_, i) => i);

  // Obtener procesos únicos
  const uniqueProcesses = Array.from(new Set(tasks.map(task => task.name)));

  return (
    <div className="gantt-chart-responsive">
      {/* Header de tiempos */}
      <div className="gantt-time-header">
        <div className="time-header-cell process-label-header">Proceso</div>
        {timeScale.map(time => (
          <div key={time} className="time-header-cell">
            {time}
          </div>
        ))}
      </div>

      {/* Cuerpo del diagrama */}
      <div className="gantt-body-responsive">
        {uniqueProcesses.map((processName) => (
          <div key={processName} className="gantt-row-responsive">
            <div className="process-label">{processName}</div>
            
            <div className="gantt-bars-container">
              {timeScale.map(time => (
                <div key={time} className="time-cell"></div>
              ))}
              
              {tasks
                .filter(task => task.name === processName)
                .map((task, index) => (
                  <div
                    key={`${task.id}-${index}`}
                    className="gantt-bar-responsive"
                    style={{
                      left: `${task.start * 40}px`,
                      width: `${task.duration * 40}px`,
                      backgroundColor: getColor(uniqueProcesses.indexOf(processName)),
                    }}
                  >
                    <span className="bar-label">{task.name}</span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* Timeline inferior */}
      <div className="gantt-timeline-responsive">
        <div className="timeline-spacer"></div>
        {timeScale.map(time => (
          <div key={time} className="timeline-marker-responsive">
            <span>{time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Función para colores
function getColor(index: number): string {
  const colors = [
    "#B04C01", // Marrón intenso base
    "#C56302", // Naranja oscuro tostado
    "#C98402", // Naranja miel
    "#F4AE3F", // Dorado suave
    "#F6DE36", // Amarillo vibrante
    "#FAE68F", // Amarillo claro pastel
    "#F8F4BD", // Crema cálido
    "#F3C24D", // Dorado brillante
    "#E6922A", // Naranja suave
    "#D87B00", // Ámbar fuerte
    "#A64B00", // Marrón rojizo
    "#FFD36E", // Amarillo cálido suave
    "#F7E19A", // Beige dorado
    "#E0A800", // Mostaza viva
    "#F5C768", // Dorado pastel
    "#C27E00"  // Ocre dorado
  ];
  return colors[index % colors.length];
}

export default DiagramaGantt;