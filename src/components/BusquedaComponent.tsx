import React, { useState } from "react";
import { getManwhaBusqueda, getAnimeBusqueda, MangaBusquedaResponse,AnimeBusquedaResponse } from "../services/manwhasService"; // Importar el servicio
import "../styles/SearchComponent.css"; // Asegúrate de incluir este archivo CSS
import { Link, useLocation } from "react-router-dom";

const SearchComponent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si la barra está abierta
  const [searchQuery, setSearchQuery] = useState(""); // Consulta de búsqueda
  const [results, setResults] = useState<(MangaBusquedaResponse | AnimeBusquedaResponse)[]>([]); // Resultados de la búsqueda
  const [isLoading, setIsLoading] = useState(false); // Estado de "Cargando..."
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null); // Temporizador de debounce

  const location = useLocation(); // Obtener la ubicación actual

  // Llamar al servicio para buscar datos dependiendo de la ruta
  const fetchResults = async (query: string) => {
    setIsLoading(true);
    try {
      let response;
      if (location.pathname === "/anime") {
        response = await getAnimeBusqueda(query); // Servicio de búsqueda de anime
      } else {
        response = await getManwhaBusqueda(query); // Servicio de búsqueda de manwha
      }
      setResults(response); // Guardar los datos en el estado
    } catch (error) {
      console.error("Error al buscar:", error);
      setResults([]); // Manejo básico del error
    } finally {
      setIsLoading(false);
    }
  };

  // Manejar la apertura/cierre de la barra de búsqueda
  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchQuery(""); // Resetear la búsqueda al cerrar
      setResults([]);
    }
  };

  // Manejar los cambios en el campo de búsqueda
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);

    // Limpiar el debounce anterior si se sigue escribiendo
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    // Configurar un nuevo debounce
    const newTimeout = setTimeout(() => {
      if (value.trim() !== "") {
        fetchResults(value.trim());
      } else {
        setResults([]); // Vaciar resultados si no hay búsqueda
      }
    }, 1500);

    setDebounceTimeout(newTimeout);
  };

  // Limpiar el campo de búsqueda y resultados
  const handleClearSearch = () => {
    setSearchQuery(""); // Limpiar la consulta de búsqueda
    setResults([]); // Limpiar los resultados
  };

  return (
    <>
      {/* Botón de la lupa */}
      <button
        onClick={handleSearchToggle}
        className="search-icon fixed top-4 right-4 z-50 bg-custom-blue text-white p-2 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>

      {/* Contenedor de la barra de búsqueda */}
      <div className={`search-overlay ${isOpen ? "show" : ""}`}>
        {/* Fondo oscuro semitransparente */}
        <div className="search-backdrop" onClick={handleSearchToggle}></div>

        {/* Barra de búsqueda */}
        <div className="search-bar">
          <form>
            {/* Campo de búsqueda y botones */}
            <div className="relative w-full max-w-lg mx-auto flex items-center gap-2">
              <input
                type="text"
                name="search"
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
                placeholder="Busca algo..."
              />

              {/* Botón para limpiar búsqueda */}
              {searchQuery && (
                <button
                  type="button"
                  className="clear-button flex items-center justify-center"
                  onClick={handleClearSearch}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6 text-gray-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </form>

          {/* Resultados de la búsqueda */}
          {isLoading ? (
            <div className="loading-spinner">Cargando...</div>
          ) : (
            <ul className="search-results">
              {results.map((result, index) => (
                <li key={index} className="search-result-item flex items-center gap-4 p-4 border-b border-gray-300">
                  {/* Mostrar el póster */}
                  <img
                    src={result.poster}
                    alt={result.titulo}
                    className="w-16 h-24 object-cover rounded-md"
                  />
                  {/* Mostrar la información del título y puntuación */}
                  <div>
                    <h3 className="font-semibold text-lg">{result.titulo}</h3>
                    <p className="text-gray-500">Puntuación: {result.puntuacion}</p>
                    {/* Enlace al detalle */}
                    <Link
                    to={`/${location.pathname === "/anime" ? "anime-perfil" : "manwha-perfil"}/${
                      location.pathname === "/anime"
                        ? encodeURIComponent(result.id)
                        : encodeURIComponent(result.url)
                    }`}
                    className="text-teal-500 hover:underline"
                    onClick={() => setIsOpen(false)} // Cierra la barra de búsqueda
                  >
                      Ver más
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
