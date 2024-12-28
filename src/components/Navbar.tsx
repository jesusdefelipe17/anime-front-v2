import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import BusquedaComponent from './BusquedaComponent'; // Importa el componente
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false); // Estado para saber si estamos haciendo scroll
  const location = useLocation();

  // Función para determinar si un enlace está activo
  const isActive = (path: string) => location.pathname === path ? 'border-b-2 border-white' : '';

  // Detectar el scroll
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true); // Si estamos haciendo scroll, cambia el fondo
    } else {
      setIsScrolled(false); // Si estamos en la parte superior, vuelve al fondo transparente
    }
  };

  useEffect(() => {
    // Agregar el listener de scroll
    window.addEventListener('scroll', handleScroll);

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`navbar text-white fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-black' : 'bg-black'}`}>
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to="/home" className={`block px-4 py-2 text-sm ${isActive('/home')}`}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/anime" className={`block px-4 py-2 text-sm ${isActive('/anime')}`}>
                Anime
              </Link>
            </li>
            <li>
              <Link to="/manga" className={`block px-4 py-2 text-sm ${isActive('/manga')}`}>
                Manga
              </Link>
            </li>
            <li>
              <Link to="/manwha" className={`block px-4 py-2 text-sm ${isActive('/manwha')}`}>
                Manwha
              </Link>
            </li>
            <li>
              <Link to="/perfil" className={`block px-4 py-2 text-sm ${isActive('/perfil')}`}>
                Perfil
              </Link>
            </li>
          </ul>
        </div>
        
       
      </div>

      {/* Navbar Center (visible en pantallas grandes) */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/home" className={`px-4 py-2 ${isActive('/home')}`}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/anime" className={`px-4 py-2 ${isActive('/anime')}`}>
              Anime
            </Link>
          </li>
          <li>
            <Link to="/manga" className={`px-4 py-2 ${isActive('/manga')}`}>
              Manga
            </Link>
          </li>
          <li>
            <Link to="/manwha" className={`px-4 py-2 ${isActive('/manwha')}`}>
              Manwha
            </Link>
          </li>
          <li>
            <Link to="/perfil" className={`px-4 py-2 ${isActive('/perfil')}`}>
              Perfil
            </Link>
          </li>
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center space-x-4">
        {/* Lupa de búsqueda */}
        <BusquedaComponent /> {/* Usamos el nuevo componente */}
      </div>
    </div>
  );
};

export default Navbar;
