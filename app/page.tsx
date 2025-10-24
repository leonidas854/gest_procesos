import Titulo from './components/Titulo/Titulo';
import Botones from './components/Botones/botonesMov';
{/* import './margen.css'; */}

export default function Page() {
  return (
    <main className="flex min-h-screen">
      {/* Sección izquierda */}
      <section className="w-2/3 flex items-center justify-center bg-gray-100">
        <div className=" w-full max-w-md">
          {/* BASE DE COMENTARIO */}
            <Titulo/>
          
        </div>
      </section>

      {/* Sección derecha */}
      <section className="w-2/3 flex items-center justify-center bg-white bg-[#E9A20C]">
        <div className="w-full max-w-md">
          {/* Usas directamente la clase barbero */}
          <div className='barbero'>
            <div className='seccion-botones'> 
              <Botones /> 
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
