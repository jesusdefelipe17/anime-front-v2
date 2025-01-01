import React, { useState, useEffect } from 'react';
import { 
  getAnimesPopulares, 
  AnimePopularResponse 
} from '../services/manwhasService'; // Asegúrate de que la ruta sea correcta
import Spinner from '../components/Spinner';
import Carousel from '../components/Carousel';
import SliderComponent from '../components/SliderComponent'; // Agregar el SliderComponent si se requiere
import '../styles/Anime.css'; // Asegúrate de tener los estilos correspondientes

const AnimePage: React.FC = () => {
  const [animes, setAnimes] = useState<AnimePopularResponse[]>([]); // Estado para los animes populares
  const [sliderData, setSliderData] = useState<AnimePopularResponse[]>([]); // Estado para los datos del slider
  const [loading, setLoading] = useState<boolean>(true); // Estado de carga

  // Cargar los animes populares al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Llamada a la API
        const [popularAnimes] = await Promise.all([
          getAnimesPopulares(), // Obtener los animes populares
        ]);
  
        // Barajar los animes de forma aleatoria
        const shuffledAnimes = popularAnimes.sort(() => Math.random() - 0.5);
  
        setAnimes(shuffledAnimes); // Guardar los animes barajados
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
    </div>
  );
};

export default AnimePage;
