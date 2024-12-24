import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "../styles/Carousel.css";
import { Manwha, NuevoCapitulo } from "../services/manwhasService";

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
      {title && <h1 className="carousel-title">{title}</h1>}
      <Slider {...settings}>
        {manwhas.map((manwha) => (
          <div key={manwha.id} className="carousel-item">
            {/* Enlace dinámico según el tipo */}
            {type === 2 && "latest_chapter" in manwha ? (
              // Caso NuevoCapitulo
              <Link
                to={`/read-manwha-chapter/${encodeURIComponent(
                  (manwha as NuevoCapitulo).enlace
                )}/${encodeURIComponent(
                  (manwha as NuevoCapitulo).latest_chapter.name
                )}`}
                className="carousel-link"
              >
                <img
                  src={manwha.portada}
                  alt={manwha.titulo}
                  className="carousel-image"
                />
              </Link>
            ) : (
              // Caso Manwha
              <Link
                to={`/manwha-perfil/${encodeURIComponent(
                  (manwha as Manwha).enlace
                )}`}
                className="carousel-link"
              >
                <img
                  src={manwha.portada}
                  alt={manwha.titulo}
                  className="carousel-image"
                />
              </Link>
            )}

            {/* Título fuera de la imagen */}
            <div className="carousel-overlay">
              {type === 1 ? (
                <>
                  <span className="star">⭐</span>
                  <span>{(manwha as Manwha).calificacion}</span>
                </>
              ) : type === 2 && "latest_chapter" in manwha ? (
                <span>Capítulo {manwha.latest_chapter.name}</span>
              ) : (
                <span>Capítulo desconocido</span>
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