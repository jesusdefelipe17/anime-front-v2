import React, { useState, useEffect } from 'react';
import { useParams,useNavigate  } from 'react-router-dom';
import { getManwhaPerfil } from '../services/manwhasService';
import Spinner from './Spinner';

export interface Capitulo {
  chapter_id: number;
  fecha_publicacion: string;
  titulo: string;
}

export interface ManwhaPerfilResponse {
  id: string;
  titulo: string;
  portada: string;
  descripcion: string;
  capitulos: Capitulo[];
  url: string;
  genero: string;
}

const ManwhaPerfilPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtenemos el id de la URL
  const [manwhaPerfil, setManwhaPerfil] = useState<ManwhaPerfilResponse | null>(null); // Estado para almacenar los datos
  const [loading, setLoading] = useState<boolean>(true); // Estado para controlar la carga
  const [error, setError] = useState<string | null>(null); // Estado para manejar errores
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      // Llamamos a la API para obtener el perfil del manwha
      getManwhaPerfil(id)
        .then((data) => {
          setManwhaPerfil(data); // Actualizamos el estado con los datos
          setLoading(false); // Terminamos de cargar
        })
        .catch((error) => {
          setError('No se pudo obtener el perfil del manwha'); // Manejo de errores
          setLoading(false); // Terminamos de cargar incluso si hubo error
        });
    }
  }, [id]); // Repetir la llamada cuando el parámetro "id" cambie

  
  const irALeerCapitulo = (url: string, titulo: string, episodioId: string) => {
    navigate(`/read-manwha-chapter/${encodeURIComponent(url)}/${encodeURIComponent(titulo)}`);
  };
  
  

  if (loading) {
    return <Spinner />; 
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (manwhaPerfil) {
    return (
        <div className="manwhas-page">
  <div className="perfil-container flex flex-col lg:flex-row gap-8 mt-8 p-4 lg:p-8">
    {/* Columna izquierda */}
    <div className="left-column w-full lg:w-1/3 relative rounded-md overflow-hidden p-4">
      <div className="z-10 relative flex flex-col items-center gap-4 text-center">
        <div className="relative aspect-[2.75/4.75] rounded-md max-w-80 w-full">
          <img
            src={manwhaPerfil.portada}
            alt={manwhaPerfil.titulo}
            className="object-cover rounded-md w-full h-full"
          />
        </div>
        <h1 className="font-bold text-2xl">{manwhaPerfil.titulo}</h1>
        <div className="flex-center gap-2">
          <button
            className="rounded-full p-1 text-3xl sf-ripple-container"
            title="like"
            aria-label="like"
          >
            <i className="i-heroicons-heart text-gray-300"></i>
          </button>
          <button
            title="bookmark"
            aria-label="bookmark"
            className="flex-center gap-2 px-4 py-1 rounded-full border border-gray-700 sf-ripple-container"
          >
            <div className="flex-center gap-2 text-2xl">
              <i className="i-heroicons-plus-20-solid"></i>
              <div className="text-sm">Seguir</div>
            </div>
          </button>
        </div>
      </div>
    </div>

    {/* Columna derecha */}
    <div className="right-column w-full lg:w-2/3 p-4">
      <div className="rounded-md flex flex-col gap-4 w-full">
        {/* Sección de capítulos */}
        <section className="mt-4">
          <div className="flex flex-col gap-4">
            <div className="flex-between">
              <h2 className="font-medium text-xl">
                {manwhaPerfil.capitulos.length} capítulos en total
              </h2>
              <div className="flex items-center gap-2">
                <button
                  title="búsqueda de capítulos"
                  className="text-2xl aspect-square rounded-full p-1 flex-center sf-ripple-container"
                >
                  <i className="i-heroicons-document-magnifying-glass-20-solid"></i>
                </button>
                <button
                  title="dirección de la lista"
                  className="text-2xl aspect-square rounded-full p-1 flex-center sf-ripple-container"
                >
                  <i className="i-heroicons-bars-arrow-up-20-solid"></i>
                </button>
              </div>
            </div>

            {/* Listado de capítulos */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {manwhaPerfil.capitulos.map((capitulo) => (
               <div
               key={capitulo.chapter_id}
               className="group flex items-center justify-between gap-4 hover:bg-gray-700/25 px-4 py-1 rounded-full transition-background-color border border-gray-700 h-12 sf-ripple-container cursor-pointer"
               onClick={() =>
                 irALeerCapitulo(
                   `https://olympuscomic.com/api/capitulo/${manwhaPerfil.url}/${capitulo.chapter_id}`,
                   capitulo.titulo,
                   capitulo.chapter_id.toString()
                 )
               }
             >
                  {/* Indicador de color */}
                  <div className="w-2 aspect-square rounded-full bg-amber-300"></div>

                  {/* Información del capítulo */}
                  <div className="flex items-center justify-between w-full">
                    <div>
                      <div className="text-sm text-gray-200 group-hover:text-white">
                        Capítulo {capitulo.titulo}
                      </div>
                      <div className="text-xs text-gray-400 leading-3">Por Olympus</div>
                    </div>

                    {/* Fecha al extremo derecho */}
                    <div className="text-xs text-gray-400 flex-center gap-1 whitespace-nowrap ml-auto">
                      <i className="i-heroicons-calendar-20-solid"></i>
                      <time className="first-letter:capitalize">
                        {new Date(capitulo.fecha_publicacion).toLocaleDateString()}
                      </time>
                    </div>
                  </div>
                 </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</div>

    );
  }

  return null; // En caso de que no haya perfil
};

export default ManwhaPerfilPage;
