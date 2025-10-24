"use client";
import React, { useState, useEffect } from "react";
import "./TablaDeProcesos.css";

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
  cantidadProcesos?: number;
  mostrarPrioridades?: boolean;
  mostrarTiempoLlegada?: boolean;
  onProcesosChange?: (procesos: Proceso[]) => void;
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

  // Generar procesos cuando cambia la cantidad o configuración
  useEffect(() => {
    const nuevosProcesos: Proceso[] = [];
    for (let i = 1; i <= cantidadProcesos; i++) {
      nuevosProcesos.push({
        id: i,
        nombre: `P${i}`,
        tiempoCPU: 0,
        nivelPrioridad: mostrarPrioridades ? 0 : undefined,
        tiempoLlegada: mostrarTiempoLlegada ? 0 : undefined,
      });
    }
    setProcesos(nuevosProcesos);
  }, [cantidadProcesos, mostrarPrioridades, mostrarTiempoLlegada]);

  // Cambiar valores de las celdas
  const handleCambioValor = (id: number, campo: keyof Proceso, valor: string) => {
    const nuevosProcesos = procesos.map((p) =>
      p.id === id ? { ...p, [campo]: campo === "nombre" ? valor : Number(valor) } : p
    );
    setProcesos(nuevosProcesos);
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
              <button className="calculate-button">Calcular Algoritmo</button>
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



        {/* --- SECCIÓN PARA ABAJO --- */}
        <section className="results-section">
          <div className="card">
            <h2 className="main-header">RESULTADOS</h2>
            <div className="results-placeholder">
              <p>Los resultados aparecerán aquí después del cálculo</p>
              <p className="results-placeholder-small">
                Procesos listos: {procesos.length}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default TablaDeProcesos;
