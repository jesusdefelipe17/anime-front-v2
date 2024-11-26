import React, { useState, useEffect } from 'react';
import '../styles/SliderComponent.css'; // Asegúrate de importar el archivo CSS

// Define el tipo de los datos para cada item del grid
export interface SliderItem {
    titulo: string;
    descripcion?: string; // Aquí cambiamos de `string | null` a `string | undefined`
    banner: string;
    url: string;
}


interface SliderComponentProps {
  items: SliderItem[];
}

const SliderComponent: React.FC<SliderComponentProps> = ({ items }) => {
  // Estado para almacenar los tres elementos aleatorios seleccionados
  const [randomItems, setRandomItems] = useState<SliderItem[]>([]);

  useEffect(() => {
    // Función para seleccionar dos elementos aleatorios
    const getRandomItems = () => {
      const shuffledItems = [...items].sort(() => Math.random() - 0.5);
      return shuffledItems.slice(0, 2); // Selecciona dos elementos
    };

    setRandomItems(getRandomItems()); // Establece los elementos aleatorios en el estado
  }, [items]); // Vuelve a ejecutar cuando cambian los items

  return (
    <section className="slider-container">
      {randomItems.length === 2 && (
        <>
          {/* Imagen de la izquierda */}
          <div className="slider-item">
            <a href={randomItems[0].url} className="relative block">
              <img
                src={randomItems[0].banner}
                alt={randomItems[0].titulo}
              />
              <div className="image-overlay">
                <h3>{randomItems[0].titulo}</h3>
                {randomItems[0].descripcion && (
                  <p>{randomItems[0].descripcion}</p>
                )}
              </div>
            </a>
          </div>

          {/* Imagen de la derecha */}
          <div className="slider-item">
            <a href={randomItems[1].url} className="relative block">
              <img
                src={randomItems[1].banner}
                alt={randomItems[1].titulo}
              />
              <div className="image-overlay">
                <h3>{randomItems[1].titulo}</h3>
                {randomItems[1].descripcion && (
                  <p>{randomItems[1].descripcion}</p>
                )}
              </div>
            </a>
          </div>
        </>
      )}
    </section>
  );
};

export default SliderComponent;
