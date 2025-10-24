// app/page.tsx
export default function Page() {
  return (
    <main className="flex min-h-screen">
      {/* Sección izquierda */}
      <section className="w-1/2 flex items-center justify-center bg-gray-100">
        <div className="p-8 w-full max-w-md">
          {/* Aquí puedes agregar tu contenido izquierdo */
            <h1 className="text-4xl font-bold mb-4">Bienvenido a Nuestra Aplicación</h1>
          }
        </div>
      </section>

      {/* Sección derecha */}
      <section className="w-1/2 flex items-center justify-center bg-white">
        <div className="p-8 w-full max-w-md">
          {/* Aquí puedes agregar tu contenido derecho */}
        </div>
      </section>
    </main>
  );
}
