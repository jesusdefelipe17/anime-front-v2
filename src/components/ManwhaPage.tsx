import React, { useEffect, useState } from 'react';
import { 
  getManwhasPopulares, 
  Manwha, 
  getNuevosCapitulosManwha, 
  NuevoCapitulo, 
  getSliderData, 
  Slider
} from '../services/manwhasService'; // Importar las interfaces y servicios
import Carousel from '../components/Carousel';
import SliderComponent from '../components/SliderComponent';
import Spinner from '../components/Spinner'; // Importar el Spinner
import '../styles/Manwha.css';

const ManwhasPage: React.FC = () => {
  const [manwhas, setManwhas] = useState<Manwha[]>([]);
  const [nuevosCapitulos, setNuevosCapitulos] = useState<NuevoCapitulo[]>([]);
  const [sliderData, setSliderData] = useState<Slider[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Estado para controlar si está cargando

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [manwhasData, nuevosCapitulosData, sliderData] = await Promise.all([
          getManwhasPopulares(),
          getNuevosCapitulosManwha(),
          getSliderData(),
        ]);

        setManwhas(manwhasData);
        setNuevosCapitulos(nuevosCapitulosData);
        setSliderData(sliderData);

        setLoading(false); // Una vez que se cargan los datos, establecemos loading a false
      } catch (error) {
        console.error('Error al cargar datos:', error);
        setLoading(false); // En caso de error, también dejamos de mostrar el spinner
      }
    };

    fetchData();
  }, []); // Solo se ejecuta una vez al cargar el componente

  if (loading) {
    return <Spinner />; // Mostrar el Spinner mientras estamos cargando los datos
  }

  return (
    <div className="manwhas-page">
      <SliderComponent items={sliderData} />
      <Carousel manwhas={manwhas} title="Recomendado para ti" type={1} />
      <Carousel manwhas={nuevosCapitulos} title="Últimos capítulos" type={2} />
    </div>
  );
};

export default ManwhasPage;
