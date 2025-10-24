'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import './Botones.css';

interface EfectosBotonesProps {
  onAlgoritmoSeleccionado?: (nombreAlgoritmo: string) => void;
}

const EfectosBotones: React.FC<EfectosBotonesProps> = ({ onAlgoritmoSeleccionado }) => {
  const router = useRouter();

  const handleClick = (nombreAlgoritmo: string) => {
    // Notifica al padre (opcional)
    if (onAlgoritmoSeleccionado) {
      onAlgoritmoSeleccionado(nombreAlgoritmo);
    }
    // Redirige a /Calculadora con el nombre del algoritmo como query
    router.push(`/Calculadora?algoritmo=${encodeURIComponent(nombreAlgoritmo)}`);
  };

  return (
    <section className="buttons">
      <div className="container">
        <button className="btn btn-5" onClick={() => handleClick("FCFS")}>FCFS</button>
        <button className="btn btn-5" onClick={() => handleClick("PRIORIDADES")}>PRIORIDADES</button>
        <button className="btn btn-5" onClick={() => handleClick("ROUND ROBIN")}>ROUND ROBIN</button>
        <button className="btn btn-5" onClick={() => handleClick("SJF")}>SJF</button>
        <button className="btn btn-5" onClick={() => handleClick("SRT")}>SRT</button>
      </div>
    </section>
  );
};

export default EfectosBotones;
