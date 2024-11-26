import React from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom'; // Importamos Link de React Router
import '../styles/Carousel.css';
import { Manwha, NuevoCapitulo } from '../services/manwhasService';

interface CarouselProps {
  manwhas: (Manwha | NuevoCapitulo)[]; // Puede ser un Manwha o un NuevoCapitulo
  title: string;
  type: 1 | 2; // 1: Recomendados, 2: Últimos capítulos
}

const Carousel: React.FC<CarouselProps> = ({ manwhas, title, type }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 8,
    slidesToScroll: 8,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 6, slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 4, slidesToScroll: 1 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div className="carousel-container">
      {title && <h1 className="carousel-title">{title}</h1>} {/* Renderiza el título */}
      <Slider {...settings}>
        {manwhas.map((manwha) => (
          <div key={manwha.id} className="carousel-item">
            {/* Usamos Link en lugar de <a> */}
            <Link to={`/manwha-perfil/${encodeURIComponent(manwha.enlace)}`} className="carousel-link">
              <img
                src={manwha.portada}
                alt={manwha.titulo}
                className="carousel-image"
              />
            </Link>

            {/* Título fuera de la imagen */}
            <div className="carousel-overlay">
              {type === 1 ? ( // Si es de tipo 1 (Recomendado)
                <>
                  <span className="star">⭐</span>
                  <span>{manwha.calificacion}</span>
                </>
              ) : ( // Si es de tipo 2 (Últimos capítulos)
                type === 2 ? ( // Verificamos si es un NuevoCapitulo
                  <span>Capítulo {manwha.latest_chapter.name}</span> // Mostrar el número de capítulo
                ) : (
                  <span>Capítulo desconocido</span> // En caso de que no sea un NuevoCapitulo
                )
              )}
            </div>

            <div className="carousel-title-manwha">{manwha.titulo}</div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
