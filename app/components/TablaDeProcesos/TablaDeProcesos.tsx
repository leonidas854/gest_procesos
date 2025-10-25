"use client";
import React, { useState, useEffect } from "react";
import { input_data } from "../../Procesos/Resultado";
import { input, Result } from "../../types/process";
import "./TablaDeProcesos.css";
import DiagramaGantt from "../diagramaGantt/diagramaGantt";

// --- INTERFACES ---
interface Proceso {
  id: number;
  nombre: string;
  tiempoCPU: number;
  nivelPrioridad?: number;
  tiempoLlegada?: number;
}

interface TablaDeProcesosProps {
  algoritmo?: string;
}

// --- COMPONENTE PRINCIPAL ---
const TablaDeProcesos: React.FC<TablaDeProcesosProps> = ({ algoritmo }) => {
  // Estados principales
  const [cantidadProcesos, setCantidadProcesos] = useState(3);
  const [mostrarPrioridades, setMostrarPrioridades] = useState(false);
  const [mostrarTiempoLlegada, setMostrarTiempoLlegada] = useState(false);
  const [procesos, setProcesos] = useState<Proceso[]>([]);
  const [quantum, setQuantum] = useState(2);
  const [cambioContexto, setCambioContexto] = useState(0);
  const [resultado, setResultado] = useState<Result | null>(null);

  // Generar procesos cuando cambia la cantidad o configuración
  useEffect(() => {
    const nuevos: Proceso[] = Array.from({ length: cantidadProcesos }, (_, i) => ({
      id: i + 1,
      nombre: `P${i + 1}`,
      tiempoCPU: 0,
      nivelPrioridad: mostrarPrioridades ? 0 : undefined,
      tiempoLlegada: mostrarTiempoLlegada ? 0 : undefined,
    }));
    setProcesos(nuevos);
  }, [cantidadProcesos, mostrarPrioridades, mostrarTiempoLlegada]);

  // Cambiar valores de las celdas
  const handleCambioValor = (id: number, campo: keyof Proceso, valor: string) => {
    setProcesos(prev =>
      prev.map(p => (p.id === id ? { ...p, [campo]: campo === "nombre" ? valor : Number(valor) } : p))
    );
  };

  // --- CÁLCULO PRINCIPAL ---
  const handleCalcular = () => {
    if (!algoritmo) return alert("Selecciona un algoritmo antes de calcular");

    const nombres = procesos.map(p => p.nombre);
    const t_cpu = procesos.map(p => p.tiempoCPU);
    const t_llegada = procesos.map(p => p.tiempoLlegada ?? 0);
    const prioridad = procesos.map(p => p.nivelPrioridad ?? 0);

    const data: input = {
      procesos: nombres,
      Tipo: algoritmo as any,
      t_cpu,
      t_Llegada: t_llegada,
      prioridad,
      quantum,
      ctx: cambioContexto,
    };

    try {
      const result = input_data(data);
      console.log("Resultado del algoritmo:", result);
      setResultado(result);
    } catch (error) {
      console.error("Error al ejecutar el algoritmo:", error);
      alert(`Error al calcular el algoritmo: ${(error as Error).message}`);
    }
  };

  // Columnas a mostrar
  const columnas = [
    { key: "nombre", label: "Nombre de Proceso", fijo: true },
    { key: "tiempoCPU", label: "Tiempo de CPU", fijo: true },
    { key: "nivelPrioridad", label: "Nivel de Prioridad", mostrar: mostrarPrioridades },
    { key: "tiempoLlegada", label: "Tiempo de Llegada", mostrar: mostrarTiempoLlegada },
  ].filter((col) => col.fijo || col.mostrar);

  return (
    <main className="main-page">
      <div className="content-wrapper">
        <div className="top-section">
          {/* --- SECCIÓN IZQUIERDA --- */}
          <section className="input-section">
            <div className="card">
              <h2 className="main-header">DATOS INICIALES</h2>

              <div className="control-group">
                {/* CANTIDAD DE PROCESOS */}
                <div>
                  <label className="label">CANTIDAD DE PROCESOS</label>
                  <input
                    type="number"
                    value={cantidadProcesos}
                    onChange={(e) => setCantidadProcesos(Number(e.target.value))}
                    min="1"
                    max="20"
                    className="input-field"
                  />
                </div>

                {/* CHECKBOXES */}
                <div className="grid-controls">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={mostrarPrioridades}
                      onChange={(e) => setMostrarPrioridades(e.target.checked)}
                      className="checkbox-input"
                    />
                    <span className="checkbox-span">NIVEL DE PRIORIDADES</span>
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={mostrarTiempoLlegada}
                      onChange={(e) => setMostrarTiempoLlegada(e.target.checked)}
                      className="checkbox-input"
                    />
                    <span className="checkbox-span">TIEMPO DE LLEGADA</span>
                  </label>
                </div>

                {/* QUANTUM Y CAMBIO DE CONTEXTO */}
                <div className="grid-controls">
                  <div>
                    <label className="label">Q (quantum)</label>
                    <input
                      type="number"
                      value={quantum}
                      onChange={(e) => setQuantum(Number(e.target.value))}
                      min="0"
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="label">Cambio de contexto</label>
                    <input
                      type="number"
                      value={cambioContexto}
                      onChange={(e) => setCambioContexto(Number(e.target.value))}
                      min="0"
                      className="input-field"
                    />
                  </div>
                </div>
                <button className="calculate-button" onClick={handleCalcular}>Calcular Algoritmo</button>
              </div>
            </div>
          </section>

          {/* TABLA DE PROCESOS -- QUE ESTE A LA DERECHA DE DATOS INICIALES */}
          <div className="tabla-procesos-container">
            <h3>CONTENIDO DE PROCESOS</h3>

            <div className="tabla-wrapper">
              <table className="tabla-procesos">
                <thead>
                  <tr>
                    <th>#</th>
                    {columnas.map((col) => (
                      <th key={col.key}>{col.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {procesos.map((proceso, index) => (
                    <tr key={proceso.id}>
                      <td className="numero-fila">{index + 1}</td>
                      <td>
                        <input
                          type="text"
                          value={proceso.nombre}
                          onChange={(e) =>
                            handleCambioValor(proceso.id, "nombre", e.target.value)
                          }
                          className="input-nombre"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={proceso.tiempoCPU}
                          onChange={(e) =>
                            handleCambioValor(proceso.id, "tiempoCPU", e.target.value)
                          }
                          min="0"
                          className="input-numero"
                        />
                      </td>

                      {mostrarPrioridades && (
                        <td>
                          <input
                            type="number"
                            value={proceso.nivelPrioridad ?? ""}
                            onChange={(e) =>
                              handleCambioValor(proceso.id, "nivelPrioridad", e.target.value)
                            }
                            min="0"
                            className="input-numero"
                          />
                        </td>
                      )}

                      {mostrarTiempoLlegada && (
                        <td>
                          <input
                            type="number"
                            value={proceso.tiempoLlegada ?? ""}
                            onChange={(e) =>
                              handleCambioValor(proceso.id, "tiempoLlegada", e.target.value)
                            }
                            min="0"
                            className="input-numero"
                          />
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="resumen-configuracion">
              <strong>Procesos generados:</strong> {cantidadProcesos}
            </div>
          </div>
        </div>

        {/* --- SECCIÓN DE RESULTADOS --- */}
        <section className="results-section">
          <div className="card">
            <h2 className="main-header">RESULTADOS</h2>

            {resultado ? (
              <div className="results-container">
                {/* Grid de resultados */}
                <div className="results-grid">
                  <div className="result-card">
                    <h3>Tiempos de Espera</h3>
                    <div className="result-list">
                    {resultado.t_espera.map((tiempo, index) => (
                      <div key={index} className="result-item">
                        <span>
                        {/* Accedemos al nombre del proceso desde el objeto input */}
                              {(typeof resultado.processes[index] === 'string' 
                              ? resultado.processes[index] 
                              : (resultado.processes[index] as any)?.nombre || `Proceso ${index + 1}`
                              )}:
                              </span>
                            <span>{tiempo} ms</span>
                             </div>
                         ))}
                    </div>
                  </div>
                  
                  <div className="result-card">
                    <h3>Tiempos de Retorno</h3>
                    <div className="result-list">
                      {resultado.t_retorno.map((tiempo, index) => (
                      <div key={index} className="result-item">
              <span>
                {(typeof resultado.processes[index] === 'string' 
                  ? resultado.processes[index] 
                  : (resultado.processes[index] as any)?.nombre || `Proceso ${index + 1}`
                )}:
              </span>
              <span>{tiempo} ms</span>
            </div>
          ))}
                    </div>
                  </div>
                  
                  <div className="result-card">
                    <h3>Tiempos Promedio</h3>
                    <div className="result-averages">
                      <div className="average-item">
                        <span>Espera Promedio:</span>
                        <span>{resultado.t_promedio_espera.toFixed(2)} ms</span>
                      </div>
                      <div className="average-item">
                        <span>Retorno Promedio:</span>
                        <span>{resultado.t_promedio_retorno.toFixed(2)} ms</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="result-card">
                    <h3>Información del Algoritmo</h3>
                    <div className="algorithm-info">
                      <p><strong>Tipo:</strong> {resultado.tipo}</p>
                      <p><strong>Descripción:</strong> {resultado.descripcion}</p>
                      <p><strong>Uso común:</strong> {resultado.uso_comun}</p>
                    </div>
                  </div>
                </div>
                
                {/* Contenedor separado para el diagrama de Gantt */}
                <div className="gantt-container">
                  <h3 className="gantt-title">DIAGRAMA DE GANTT</h3>
                  <DiagramaGantt resultado={resultado} />
                </div>
              </div>
            ) : (
              <div className="results-placeholder">
                <p>Los resultados aparecerán aquí después del cálculo.</p>
                <p className="results-placeholder-small">
                  Procesos listos: {procesos.length}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default TablaDeProcesos;