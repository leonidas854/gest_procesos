import React from 'react';
import TablaDeProcesos from "../components/TablaDeProcesos/TablaDeProcesos";

export default function Page() {
  return (
    <div>
      <header className="header">
        <h1 className="header-title">Algoritmos de planificación </h1>
      </header>
      <TablaDeProcesos />
    </div>
  );
}