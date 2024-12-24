import React, { useState, useEffect, useCallback } from 'react';
import { getCargarSeriesManwhas, ManwhaBusquedaResponse } from '../services/manwhasService'; // Asegúrate de que la ruta de la API sea correcta
import Spinner from './Spinner';

const HomePage: React.FC = () => {
  const [manwhas, setManwhas] = useState<ManwhaBusquedaResponse[]>([]); // Estado para los manwhas
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado de carga
  const [page, setPage] = useState<number>(1); // Página actual
  const [direction] = useState<string>('asc'); // Dirección de orden

  // Función para cargar los manwhas al cargar el componente
  const loadManwhas = async () => {
    setIsLoading(true); // Activa el estado de carga
    try {
      // Llamamos a la API y obtenemos la respuesta
      const response = await getCargarSeriesManwhas(page, direction); // Se espera que la API devuelva todos los manwhas
      setManwhas((prevManwhas) => [...prevManwhas, ...response]); // Agregamos los nuevos manwhas al estado
    } catch (error) {
      console.error('Error al cargar los manwhas:', error);
    } finally {
      setIsLoading(false); // Desactiva el estado de carga
    }
  };

  // Detectar cuando se llega al final de la página
  const handleScroll = useCallback(() => {
    const bottom = window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;
    if (bottom && !isLoading) {
      setPage((prevPage) => prevPage + 1); // Aumentar la página para cargar más manwhas
    }
  }, [isLoading]);

  // Cargar los manwhas cuando cambia la página
  useEffect(() => {
    loadManwhas(); // Cargar los manwhas cuando la página cambia
  }, [page]);

  // Agregar el listener del evento scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      {/* Estado de carga */}
      {isLoading && <Spinner />}

      {/* Mostrar los manwhas */}
      <div className="manwhas-list grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 px-2 my-10">
        {manwhas.map((manwha) => (
          <figure key={manwha.id} className="relative overflow-hidden rounded-md">
            <a href={`/series/${manwha.id}`} className="block rounded-md sf-ripple-container">
              <div className="relative w-full rounded-md aspect-[2.75/4.75]">
                <img
                  src={manwha.poster}
                  alt={manwha.titulo}
                  className="object-cover rounded-inherit w-full h-full"
                  style={{ minHeight: 'initial' }}
                />
              </div>
            </a>
           
            <div className="pointer-events-none absolute -bottom-2 left-0 w-full h-2/4 bg-gradient-to-b from-transparent via-gray-800/70 to-gray-800/90 rounded-md"></div>
              <div className="absolute-b-left w-full py-2 px-1 md:px-2 rounded-inherit text-center flex flex-col gap-2 relative z-10">
                <div className="font-header text-lg md:text-xl leading-5 line-clamp-3 text-white">
                  {manwha.titulo}
                </div>


             
              {/* Aquí se ponen los capítulos y el estado uno al lado del otro */}
              <div className="flex justify-center gap-2 mt-2">
                <div className="text-sm font-header h-8 bg-emerald/25 backdrop-blur flex-center px-3 rounded-lg capitalize">
                  {manwha.capitulos} Capítulo
                </div>
                <div className="text-sm font-header h-8 bg-emerald/25 backdrop-blur flex-center px-3 rounded-lg capitalize">
                  {manwha.status}
                </div>
              </div>
            </div>
          </figure>
        ))}
      </div>

      {/* Eliminar los botones de siguiente y anterior */}
    </div>
  );
};

export default HomePage;
