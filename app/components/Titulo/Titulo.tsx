import React from 'react';
import './Titulo.css';

const Tit: React.FC = () => {
  return (
    <header className="header">
      <h1 className="header-title">Calculadora de Algoritmos de planificación</h1>
      <p className="header-subtitle">  Bienvenido!! </p>
      <div className="typing">
        <div className="typing-effect">Con que tarea quieres sufrir hoy?</div>
      </div>
      <img 
          src="/patito.gif" 
          alt="Un patito animado" 
          className="patito-gif" 
          width={200}  
          height={200}
        />

    </header>

    
  );
};
export default Tit;