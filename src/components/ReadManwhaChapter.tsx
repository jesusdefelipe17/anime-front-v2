import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importamos useNavigate
import { cargarCapituloManwha, ChapterData } from '../services/manwhasService';
import '../styles/ReadManwhaChapter.css';
import Spinner from "./Spinner";

const ReadManwhaChapter: React.FC = () => {
  const { url='' } = useParams<{ url: string }>(); // Obtenemos la URL del capítulo actual
  const [chapterData, setChapterData] = useState<ChapterData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook para navegar a otras rutas

  useEffect(() => {
    const fetchChapter = async () => {
      if (!url) return;
      try {
        setLoading(true);
        const data = await cargarCapituloManwha(url); // Cargamos los datos del capítulo
        setChapterData(data);
      } catch (error) {
        console.error("Error al cargar el capítulo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChapter();
  }, [url]);

  const goToPreviousChapter = () => {
    if (chapterData?.prevChapter) {
      // Reemplazamos la parte numérica de la URL por el ID del capítulo anterior
      const prevChapterUrl = url.replace(/\/\d+$/, `/${chapterData.prevChapter.id}`);
      navigate(`/read-manwha-chapter/${encodeURIComponent(prevChapterUrl)}/${chapterData.prevChapter.name}`, { replace: true });
    }
  };

  const goToNextChapter = () => {
    if (chapterData?.nextChapter) {
      // Reemplazamos la parte numérica de la URL por el ID del siguiente capítulo
      const nextChapterUrl = url.replace(/\/\d+$/, `/${chapterData.nextChapter.id}`);
      navigate(`/read-manwha-chapter/${encodeURIComponent(nextChapterUrl)}/${chapterData.nextChapter.name}`, { replace: true });
    }
  };

  if (loading) {
    return <Spinner />; 
  }

  if (!chapterData || !Array.isArray(chapterData.pages)) {
    return <div>No se pudo cargar el capítulo o no hay páginas disponibles.</div>;
  }

  return (
    <div className="manwhas-page">
      <div className="chapter-container">
        <div className="chapter-title">
          
        </div>

        <div className="pages">
          {chapterData.pages.map((image, index) => (
            <img key={index} className="chapter-image" src={image} alt={`Página ${index + 1}`} />
          ))}
        </div>

        <div className="navigation-buttons flex justify-center gap-4 mt-6">
          {chapterData.prevChapter && (
            <button
              onClick={goToPreviousChapter}
              className="navigation-button bg-sky-900  text-white font-bold py-2 px-6 rounded-lg transition duration-300"
            >
              Capítulo Anterior
            </button>
          )}
          {chapterData.nextChapter && (
            <button
              onClick={goToNextChapter}
              className="navigation-button bg-sky-900 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
            >
              Siguiente Capítulo
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadManwhaChapter;
