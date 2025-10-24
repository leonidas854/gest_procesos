import React from 'react';
import './Botones.css';
const EfectosBotones = () => {
  return (
    <section className="buttons">
      <div className="container">
        <a className="btn btn-5" href="./Calculadora" title="borde resplandor">
          FCFS
        </a>

        <a className="btn btn-5" href="./Calculadora" title="borde resplandor">
          PRIORIDADES
        </a>


        <a className="btn btn-5 " href="./Calculadora" title="borde resplandor">
          ROUND ROBIN
        </a>


        <a className="btn btn-5" href="./Calculadora" title="borde resplandor">
          SJF
        </a>


        <a className="btn btn-5" href="./Calculadora" title="borde resplandor">
          SRT
        </a>


      </div>
    </section>
  );
};

export default EfectosBotones;