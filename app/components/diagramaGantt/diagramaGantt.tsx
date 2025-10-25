"use client";

import React from "react";
import "./diagramaGantt.css";
import { Result } from "../../types/process";

// --- Tipos ---
interface DiagramaGanttProps {
  resultado: Result; // Viene desde TablaDeProcesos
}

/**
 * Este componente recibe el resultado de un algoritmo de planificación,
 * con los intervalos (inicio, fin y nombre de proceso),
 * y dibuja el diagrama de Gantt correspondiente.
 */
const DiagramaGantt: React.FC<DiagramaGanttProps> = ({ resultado }) => {
  if (!resultado || !resultado.cronograma || resultado.cronograma.length === 0) {
    return (
      <div className="gantt-placeholder">
        <p>No hay datos para mostrar en el diagrama de Gantt.</p>
      </div>
    );
  }

  // Obtener el tiempo máximo total (último fin)
  const maxTime = Math.max(...resultado.cronograma.map((item) => item.fin));

  // Generar escala de tiempo
  const timeUnits = Array.from({ length: maxTime + 1 }, (_, i) => i);

  return (
    <div className="gantt-container">
      {/* --- Cabecera de escala --- */}
      <div className="gantt-header">
        {timeUnits.map((t) => (
          <div key={t} className="gantt-time-cell">
            {t}
          </div>
        ))}
      </div>

      {/* --- Cuerpo con las barras --- */}
      <div className="gantt-body">
        {resultado.cronograma.map((item, index) => {
          const duracion = item.fin - item.inicio;
          const left = (item.inicio / maxTime) * 100;
          const width = (duracion / maxTime) * 100;

          return (
            <div
              key={index}
              className="gantt-bar"
              style={{
                left: `${left}%`,
                width: `${width}%`,
                backgroundColor: getColor(item.proceso),
              }}
            >
              <span className="gantt-bar-label">{item.proceso}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DiagramaGantt;

// --- UTILIDAD: Asignar color único a cada proceso ---
function getColor(nombre: string): string {
  const colors = [
    "#4F46E5",
    "#059669",
    "#D97706",
    "#DC2626",
    "#9333EA",
    "#0EA5E9",
    "#16A34A",
    "#F59E0B",
  ];
  const index = nombre.charCodeAt(1) % colors.length; // Ej: P1 → índice
  return colors[index];
}
