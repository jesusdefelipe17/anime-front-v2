import React, { useState, useEffect } from 'react';
import { useParams,useNavigate  } from 'react-router-dom';
import { AnimePerfilEpisodiosResponse, AnimePerfilResponse, getAnimePerfil, getAnimePerfilEpisodios, Videos } from '../services/manwhasService';
import Spinner from './Spinner';
import '../styles/AnimePerfilPage.css'; // Asegúrate de importar el archivo CSS
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
  const { id } = useParams<{ id: string }>();
  const [animePerfil, setAnimePerfil] = useState<AnimePerfilResponse | null>(null);
  const [animePerfilEpisodios, setAnimePerfilEpisodios] = useState<AnimePerfilEpisodiosResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [selectedCapitulo, setSelectedCapitulo] = useState<Videos[] | null>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    // Función para obtener el perfil y episodios
    const fetchData = (page: number) => {
      if (id) {
        setLoading(true);
  
        // Llamamos a la API para obtener el perfil del manwha
        getAnimePerfil(id)
          .then((data) => {
            setAnimePerfil(data); // Actualizamos el estado con los datos
            setLoading(false); // Terminamos de cargar
          })
          .catch((error) => {
            setError('No se pudo obtener el perfil del manwha');
            setLoading(false);
          });
  
        // Llamamos a la API para obtener los episodios
        getAnimePerfilEpisodios(`https://www3.animeflv.net/anime/${id}`, page)
          .then((data) => {
            if (page === 0) {
              setAnimePerfilEpisodios(data); // Si es la primera página, actualizamos todos los episodios
            } else {
              setAnimePerfilEpisodios((prevEpisodios) => [...prevEpisodios, ...data]); // Si es una página posterior, agregamos los nuevos episodios
            }
            setLoading(false);
            setLoadingMore(false);
          })
          .catch((error) => {
            setError('No se pudo obtener los episodios');
            setLoading(false);
            setLoadingMore(false);
          });
      }
    };
  
    // Cargar los episodios cuando cambie el id o la página
    useEffect(() => {
      fetchData(page);
    }, [id, page]);

    useEffect(() => {
      if (showModal && selectedCapitulo) {
        console.log('El modal se ha abierto');
      }
    }, [showModal,selectedCapitulo]);
    
  
  const irALeerCapitulo = (url: string, titulo: string, episodioId: string) => {
    navigate(`/read-manwha-chapter/${encodeURIComponent(url)}/${encodeURIComponent(titulo)}`);
  };
  
  const cargarMasEpisodios = () => {
    setPage((prevPage) => prevPage + 1); // Incrementar la página para cargar más episodios
    setLoadingMore(true); // Mostrar el indicador de carga
  };

  const abrirModal = (capitulo: Videos[]) => {
    console.log(capitulo); // Verificar el contenido
    if (capitulo && capitulo.length > 0) {
      setSelectedCapitulo(capitulo);
      setShowModal(true);
    } else {
      console.error("El capítulo no tiene videos disponibles");
    }
  };
  

  const cerrarModal = () => {
    setShowModal(false);
    setSelectedCapitulo(null);
  };

  const seleccionarServidor = (url: string) => {
    if (url) {
      window.open(url, '_blank');
      cerrarModal();
    } else {
      alert('Este servidor no tiene una URL válida.');
    }
  };

  if (loading) {
    return <Spinner />; 
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (animePerfil) {
    return (
      <div className="manwhas-page">
        <div className="perfil-container flex flex-col lg:flex-row gap-8 mt-8 p-4 lg:p-8">
          {/* Columna izquierda */}
          <div className="left-column w-full lg:w-1/3 relative rounded-md overflow-hidden p-4">
            <div className="z-10 relative flex flex-col items-center gap-4 text-center">
              <div className="relative aspect-[2.75/4.75] rounded-md max-w-80 w-full">
                <img
                  src={animePerfil.poster}
                  alt={animePerfil.titulo}
                  className="object-cover rounded-md w-full h-full"
                />
              </div>
              <h1 className="font-bold text-2xl">{animePerfil.titulo}</h1>
              
              {/* Descripción */}
              <p className="text-gray-100 text-sm leading-6">{animePerfil.descripcion}</p>
  
              {/* Botones y detalles */}
              <div className="flex-center flex-col lg:flex-row gap-4 items-center mt-4">
                {/* Botón de Seguir */}
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
  
               {/* Información adicional */}
              <div className="text-center lg:text-left mt-3 flex gap-4">
                <p className="text-sm text-gray-100">
                  <strong>Calificación:</strong> {animePerfil.calificacion || "N/A"}
                </p>
                <p className="text-sm text-gray-100">
                  <strong>Género:</strong> {Array.isArray(animePerfil.generos) ? animePerfil.generos.join(', ') : animePerfil.generos || "Desconocido"}
                </p>
                <p className="text-sm text-gray-100">
                  <strong>Votos:</strong> {animePerfil.votos_totales || "0"}
                </p>
              </div>

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
                      {animePerfilEpisodios?.length || 0} capítulos en total
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
            {animePerfilEpisodios?.length ? (
              animePerfilEpisodios.map((capitulo) => (
                <div
                  key={capitulo.episodio}
                  className="group flex items-center justify-between gap-4 hover:bg-gray-700/25 px-4 py-1 rounded-full transition-background-color border border-gray-700 h-12 sf-ripple-container cursor-pointer"
                  onClick={() => abrirModal(capitulo.videos)}
                >

                  {/* Indicador de color */}
                  <div className="w-2 aspect-square rounded-full bg-amber-300"></div>

                  {/* Información del capítulo */}
                  <div className="flex items-center justify-between w-full" >
                    <div>
                      <div className="text-sm text-gray-200 group-hover:text-white">
                        
                        {capitulo.episodio} {/* Aquí se añade el índice + 1 */}
                      </div>
                      <div className="text-xs text-gray-400 leading-3">Por AnimeFLV</div>
                    </div>

                    {/* Fecha al extremo derecho */}
                    <div className="text-xs text-gray-400 flex-center gap-1 whitespace-nowrap ml-auto">
                      <i className="i-heroicons-calendar-20-solid"></i>
                      <time className="first-letter:capitalize"></time>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-400">No hay episodios disponibles</div>
            )}
          </div>

                </div>
                  {/* Botón de cargar más episodios */}
            <div className="mt-4 text-center">
                  <button
                    onClick={cargarMasEpisodios}
                    className="text-white px-4 py-2 rounded-full"
                    disabled={loadingMore}
                  >
                    {loadingMore ? 'Cargando...' : 'Cargar más episodios'}
                  </button>
                </div>

              </section>
            </div>
          </div>
 
          {showModal && selectedCapitulo && !selectedVideo && (
  <div className="mod fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white rounded-lg p-8 overflow-auto">
      <h2 className="text-xl font-bold">Selecciona un servidor</h2>
      <ul className="mt-4">
        {selectedCapitulo.map((video) => (
          <li
            key={video.server}
            className="cursor-pointer p-2 border-b"
            onClick={() => setSelectedVideo(video.url || video.code)}
          >
            {video.titulo}
          </li>
        ))}
      </ul>

      <button
        onClick={cerrarModal}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Cerrar
      </button>
    </div>
  </div>
)}

{selectedVideo && (
  <div className="mod fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white rounded-lg p-8 w-3/4 h-4/4 overflow-">
      <h2 className="text-xl font-bold mb-4">Reproduciendo Video</h2>
      <iframe
        src={selectedVideo}
        className="w-full h-full rounded-md"
        allowFullScreen
        title="Video Player"
      ></iframe>

      <div className="mt-4 flex justify-end gap-4">
        <button
          onClick={() => setSelectedVideo(null)} // Cierra el reproductor y vuelve al modal de selección
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Volver a seleccionar
        </button>
        <button
          onClick={() => {
            setSelectedVideo(null);
            cerrarModal();
          }} // Cierra ambos modales
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Cerrar todo
        </button>
      </div>
    </div>
  </div>
)}




  

        </div>
      </div>
      
    );
  }
  

  return null; // En caso de que no haya perfil
};

export default ManwhaPerfilPage;
