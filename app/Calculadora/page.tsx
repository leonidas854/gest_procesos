import Form from '../components/TablaDeProcesos/TablaDeProcesos';

export default function Page() {
  return (
    <main className="flex min-h-screen">
    <h1 className="header-title">Calculadora</h1>
      {/* Sección izquierda */}
      <section className="h-2/3 flex items-center justify-center bg-gray-100">
        <div className=" h-full max-w-md">
          {/* BASE DE COMENTARIO */} 
          <Form/>
        </div>
      </section>

    </main>
  );
}
