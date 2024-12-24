import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import AnimePage from './components/AnimePage';
import MangaPage from './components/MangaPage';
import ManwhaPage from './components/ManwhaPage';
import PerfilPage from './components/PerfilPage';
import Navbar from './components/Navbar'; // Asegúrate de que la ruta sea correcta
import ManwhaPerfilPage from './components/ManwhaPerfilPage';
import ReadManwhaChapter from './components/ReadManwhaChapter';

const App: React.FC = () => {
  return (
    <div>
      <Navbar/>
      <div className="page-content"> {/* Asegúrate de que esta clase esté aplicada */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<ManwhaPage />} />
          <Route path="/anime" element={<AnimePage />} />
          <Route path="/manga" element={<MangaPage />} />
          <Route path="/manwha" element={<HomePage />} />
          <Route path="/perfil" element={<PerfilPage />} />
          <Route path="/manwha-perfil/:id" element={<ManwhaPerfilPage/>} />
          <Route path="/read-manwha-chapter/:url/:titulo" element={<ReadManwhaChapter/>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
