import React, { useState } from "react";
import "../styles/FilterModal.css"; // Asegúrate de incluir este archivo CSS

const FilterModal: React.FC = () => {
  // Estado para abrir o cerrar el panel
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  // Estado para el género seleccionado
  const [selectedGenero, setSelectedGenero] = useState<number>(0);

  // Géneros disponibles
  const generos = [
    { value: 0, label: "Todos" },
    { value: 1, label: "Acción" },
    { value: 20, label: "Misterio" },
    { value: 56, label: "Supernatural" },
    { value: 38, label: "Vida escolar" },
    { value: 25, label: "Reencarnación" },
    { value: 44, label: "Demonios" },
    { value: 28, label: "Shonen" },
    { value: 4, label: "Artes marciales" },
    { value: 19, label: "Magia" },
  ];

  // Función para cerrar el panel de filtros
  const closeFilterPanel = () => {
    setFilterPanelOpen(false);
  };

  // Función para aplicar los filtros
  const applyFilters = () => {
    // Aquí podrías hacer algo con el filtro, como llamar a un servicio para aplicar el género seleccionado.
    console.log("Genero seleccionado:", selectedGenero);
    closeFilterPanel(); // Cerrar el panel después de aplicar el filtro.
  };

  return (
    <div>
      {/* Botón para abrir el panel */}
      <button
        onClick={() => setFilterPanelOpen(true)}
        className="open-filter-btn"
      >
        Filtros
      </button>

      {/* Panel emergente de filtros */}
      {filterPanelOpen && (
        <div className="filter-panel" style={{ backgroundColor: "#0e1c42", color: "white" }}>
          <div className="filter-header">
            <span className="close-icon" onClick={closeFilterPanel}>
              X
            </span>
          </div>
          <div className="filter-options">
            {/* Mostrar los géneros como radio buttons */}
            {generos.map((genero) => (
              <label key={genero.value} className="filter-option">
                <input
                  type="radio"
                  name="genero"
                  value={genero.value}
                  checked={selectedGenero === genero.value}
                  onChange={() => setSelectedGenero(genero.value)}
                />
                {genero.label}
              </label>
            ))}
          </div>
          <button
            className="apply-filters-btn"
            onClick={applyFilters}
            style={{ backgroundColor: "#0e1c42", color: "white" }}
          >
            Aplicar filtros
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterModal;
