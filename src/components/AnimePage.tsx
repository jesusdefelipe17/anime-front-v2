import React, { useState, useEffect } from 'react';
import { 
  getAnimesPopulares, 
  AnimePopularResponse, 
  getUltimosAnimes, 
  UltimoAnimeResponse 
} from '../services/manwhasService'; // Asegúrate de que la ruta sea correcta
import Spinner from '../components/Spinner';
import Carousel from '../components/Carousel';
import SliderComponent from '../components/SliderComponent'; // Agregar el SliderComponent si se requiere
import '../styles/Anime.css'; // Asegúrate de tener los estilos correspondientes

const AnimePage: React.FC = () => {
  const [animes, setAnimes] = useState<AnimePopularResponse[]>([]); // Estado para los animes populares
  const [ultimosAnimes, setUltimosAnimes] = useState<UltimoAnimeResponse[]>([]); // Estado para los últimos animes
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Llamadas paralelas a la API
        const [popularAnimes, fetchedUltimosAnimes] = await Promise.all([
          getAnimesPopulares(),
          getUltimosAnimes(),
        ]);

        // Barajar los animes populares de forma aleatoria
        const shuffledAnimes = popularAnimes.sort(() => Math.random() - 0.5);

        // Guardar los datos en el estado
        setAnimes(shuffledAnimes);
        setUltimosAnimes(fetchedUltimosAnimes);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false); // Desactivar el estado de carga
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spinner />; // Mostrar el Spinner mientras se cargan los datos
  }

  return (
    <div className="anime-page">
      <Carousel manwhas={animes} title="Recomendado para ti" type={1} />
      <Carousel manwhas={ultimosAnimes} title="Últimos episodios" type={4} />
    </div>
  );
};

export default AnimePage;
