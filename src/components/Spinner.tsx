// Spinner.tsx
import React from 'react';
import '../styles/Spinner.css'; // Estilos del Spinner

const Spinner: React.FC = () => {
  return (
    <div className="spinner-overlay">
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;
