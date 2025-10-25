'use client';
import { useSearchParams } from 'next/navigation';
import TablaDeProcesos from '../components/TablaDeProcesos/TablaDeProcesos';
import './calculadora.css';

export default function CalculadoraPage() {
  const searchParams = useSearchParams();
  const algoritmo = searchParams.get('algoritmo') || 'No seleccionado';

  return (
    <div>
      <h1 className="titulo-calculadora">
        Algoritmo {algoritmo}
      </h1>

      <TablaDeProcesos algoritmo={algoritmo} />
    </div>
  );
}
