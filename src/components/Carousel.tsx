import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "../styles/Carousel.css";
import { AnimePopularResponse, Manwha, NuevoCapitulo, UltimoAnimeResponse } from "../services/manwhasService";

interface CarouselProps {
  manwhas: (Manwha | NuevoCapitulo | AnimePopularResponse | UltimoAnimeResponse)[]; // Puede ser un Manwha, NuevoCapitulo, AnimePopularResponse o UltimoAnimeResponse
  title: string;
  type: 1 | 2 | 3 | 4; // 1: Recomendados, 2: Últimos capítulos, 3: Animes populares, 4: Últimos animes
}

const Carousel: React.FC<CarouselProps> = ({ manwhas, title, type }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 8,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 6, slidesToScroll: 1, swipeToSlide: true },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 4, slidesToScroll: 1, swipeToSlide: true },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2, slidesToScroll: 1, swipeToSlide: true },
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
            {type === 4 && "episodio" in manwha ? (
              // Caso Últimos Animes
              <Link
                to={`/anime-episode/${encodeURIComponent(
                  (manwha as UltimoAnimeResponse).id
                )}`}
                className="carousel-link"
              >
                <img
                  src={(manwha as UltimoAnimeResponse).portada}
                  alt={(manwha as UltimoAnimeResponse).titulo}
                  className="carousel-image"
                />
              </Link>
            ) : type === 3 ? (
              // Caso AnimePopularResponse
              <Link
                to={`/anime-profile/${encodeURIComponent(
                  (manwha as AnimePopularResponse).id
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
              // Caso Manwha o NuevoCapitulo
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

            {/* Información dinámica */}
            <div className="carousel-overlay">
              {type === 4 && "episodio" in manwha ? (
                <span>{(manwha as UltimoAnimeResponse).episodio}</span>
              ) : type === 1 ? (
                <>
                  <span className="star">⭐</span>
                  <span>{(manwha as Manwha).calificacion}</span>
                </>
              ) : type === 3 ? (
                <span>Calificación: {(manwha as AnimePopularResponse).calificacion}</span>
              ) : (
                <span>Información desconocida</span>
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
