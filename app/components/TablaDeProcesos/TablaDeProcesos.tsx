import React from 'react';
import './TablaDeProcesos.css';

interface Process {
  id: number;
  tiempoRafaga: number;
  tiempoLlegada: number;
}

interface ProcessTableProps {
  processes: Process[];
  onProcessChange: (id: number, field: string, value: number) => void;
  onAddProcess: () => void;
  onRemoveProcess: (id: number) => void;
}

const ProcessTable: React.FC<ProcessTableProps> = ({
  processes,
  onProcessChange,
  onAddProcess,
  onRemoveProcess
}) => {
  return (
    <div className="process-table-container">
      <h3>CONTENIDO DE PROCESOS</h3>
      
      <div className="table-controls">
        <button className="add-btn" onClick={onAddProcess}>
          + Agregar Proceso
        </button>
      </div>

      <table className="process-table">
        <thead>
          <tr>
            <th>Proceso</th>
            <th>Tiempo de Ráfaga</th>
            <th>Tiempo de Llegada</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {processes.map((process) => (
            <tr key={process.id}>
              <td>P{process.id}</td>
              <td>
                <input
                  type="number"
                  value={process.tiempoRafaga}
                  onChange={(e) => onProcessChange(process.id, 'tiempoRafaga', Number(e.target.value))}
                  min="0"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={process.tiempoLlegada}
                  onChange={(e) => onProcessChange(process.id, 'tiempoLlegada', Number(e.target.value))}
                  min="0"
                />
              </td>
              <td>
                <button 
                  className="remove-btn"
                  onClick={() => onRemoveProcess(process.id)}
                  disabled={processes.length <= 1}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProcessTable;