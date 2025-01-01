import axios from 'axios';

// Define la interfaz Manwha
export interface Manwha {
  calificacion: number;
  enlace: string;
  id: string;
  portada: string;
  titulo: string;
  latest_chapter: {
    id: number;
    name: string;
    published_at: string;
  };
}

// Definir una interfaz para los nuevos capítulos
export interface NuevoCapitulo {
  enlace: string;
  estado: string;
  id: number;
  portada: string;
  calificacion: string;
  titulo: string;
  latest_chapter: {
    id: number;
    name: string;
    published_at: string;
  };
}

export interface Slider {
  titulo: string;
  descripcion?: string; // Aquí cambiamos de `string | null` a `string | undefined`
  banner: string;
  url: string;
}

export interface Capitulo {
  chapter_id: number;
  fecha_publicacion: string;
  titulo: string;
}

export interface ManwhaPerfilResponse {
  id: string;
  titulo: string;
  portada: string;
  descripcion: string;
  capitulos: Capitulo[]; // Debe ser un array de objetos `Capitulo`
  url: string;
  genero: string;
}

export interface AnimePerfilResponse {
  id: string;
  titulo: string;
  poster: string;
  generos: string[];
  descripcion: string;
  calificacion: string; 
  votos_totales: string;
 
}

export interface AnimePerfilEpisodiosResponse {
  enlace:string;
  episodio:string;
  videos: Videos[];
}

export interface Videos {
  code:string;
  server:string;
  titulo:string;
  url:string;
}


export interface ChapterData {
  pages: string[];
  prevChapter: PrevChapter | null;
  nextChapter: NextChapter | null;
}

export interface NextChapter {
  id: number | null;
  name: string | null;
}

export interface PrevChapter {
  id: number | null;
  name: string | null;
}

export interface MangaBusquedaResponse {
  id: number;
  poster: string;
  puntuacion: number;
  titulo: string;
  tipo: string;
  url: string;
  descripcion?: string;  // Esta propiedad es opcional si no siempre está presente
}


export interface AnimeBusquedaResponse {
  titulo: string;
  url: string;
  poster: string;
  tipo: string;
  puntuacion: number;
  descripcion?: string;
  id: number;
}



export interface ManwhaBusquedaResponse {
  titulo: string;
  poster: string;
  calificacion: number;
  enlace: string;
  status:string;
  capitulos:number;
  id: string;
}

export interface ManwhasResponse {
  manwhas: ManwhaBusquedaResponse[]; // Contenedor de los manwhas
}

const API_BASE_URL = 'http://127.0.0.1:8000'; 
//const API_BASE_URL = 'https://web-production-b3a6.up.railway.app'; 

// Servicio para obtener los datos de Manwhas populares
export const getManwhasPopulares = async (): Promise<Manwha[]> => {
  try {
    const response = await axios.get<Manwha[]>(`${API_BASE_URL}/api/ManwhasPopulares`);
    return response.data; // Tipado correcto
  } catch (error) {
    console.error('Error al obtener manwhas populares:', error);
    throw error;
  }
};

// Modificar el servicio para obtener nuevos capítulos
export const getNuevosCapitulosManwha = async (): Promise<NuevoCapitulo[]> => {
  try {
    const response = await axios.get<{ capitulos: NuevoCapitulo[] }>(`${API_BASE_URL}/api/cargarNuevosCapitulosManwha`);
    return response.data.capitulos;
  } catch (error) {
    console.error('Error al obtener los nuevos capítulos de manwha:', error);
    throw error;
  }
};

export const getSliderData = async (): Promise<Slider[]> => {
  try {
    const response = await axios.get<Slider[]>(`${API_BASE_URL}/api/Sliders`);
    return response.data; // Axios ya asegura que el tipo coincide con Slider[]
  } catch (error) {
    console.error('Error al obtener datos del slider:', error);
    return [];
  }
};

export const getManwhaPerfil = async (manwha: string): Promise<ManwhaPerfilResponse> => {
  try {
    // Realizamos la solicitud GET al servidor
    const response = await axios.get<ManwhaPerfilResponse>(`${API_BASE_URL}/api/getManwhaPerfil?manwha=${manwha}`);
    
    // Retornamos los datos de la respuesta
    return response.data;
  } catch (error) {
    console.error('Error al obtener el perfil del Manwha:', error);
    throw error; // Lanzamos el error para que sea manejado en el componente que lo llame
  }
};

export const getAnimePerfil = async (manwha: string): Promise<AnimePerfilResponse> => {
  try {
    // Realizamos la solicitud GET al servidor
    const response = await axios.get<AnimePerfilResponse>(`${API_BASE_URL}/api/getAnimePerfil?anime=${manwha}`);
    
    // Retornamos los datos de la respuesta
    return response.data;
  } catch (error) {
    console.error('Error al obtener el perfil del Manwha:', error);
    throw error; // Lanzamos el error para que sea manejado en el componente que lo llame
  }
};

export const getAnimePerfilEpisodios = async (anime: string, page: number): Promise<AnimePerfilEpisodiosResponse[]> => {
  try {
    const limite = 12; // Número de episodios que quieres cargar por página
    const response = await axios.get<AnimePerfilEpisodiosResponse[]>(`${API_BASE_URL}/api/episodios?url_serie=${anime}&pagina=${page}&limite=${limite}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener episodios del Anime:', error);
    throw error;
  }
};



export const cargarCapituloManwha = async (url: string): Promise<ChapterData> => {
  try {
    const response = await axios.get<any>(`${API_BASE_URL}/api/cargarCapitulosManwha?url=${url}`);
    const { pages } = response.data;

    // Aseguramos que pages sea un arreglo, aunque sea vacío si no existe
    const chapterData: ChapterData = {
      pages: pages.pages, // Si pages no es un arreglo, asignamos un arreglo vacío
      prevChapter: pages.prev_chapter,
      nextChapter: pages.next_chapter,
    };

    return chapterData;
  } catch (error) {
    console.error("Error al cargar el capítulo:", error);
    throw new Error("No se pudo cargar el capítulo.");
  }
};

export const getManwhaBusqueda = async (manwha: string): Promise<MangaBusquedaResponse[]> => {
  try {
    // Realizamos la solicitud GET al servidor
    const response = await axios.get<MangaBusquedaResponse[]>(`${API_BASE_URL}/api/getManwhaBusqueda?nombre=${manwha}`);
    
    // Retornamos los datos de la respuesta
    return response.data;
  } catch (error) {
    console.error('Error al buscar el Manwha:', error);
    throw error; // Lanzamos el error para que sea manejado en el componente que lo llame
  }
};

export const getAnimeBusqueda = async (manwha: string): Promise<AnimeBusquedaResponse[]> => {
  try {
    // Realizamos la solicitud GET al servidor
    const response = await axios.get<AnimeBusquedaResponse[]>(`${API_BASE_URL}/api/getAnime?anime=${manwha}`);
    
    // Retornamos los datos de la respuesta
    return response.data;
  } catch (error) {
    console.error('Error al buscar el Manwha:', error);
    throw error; // Lanzamos el error para que sea manejado en el componente que lo llame
  }
};

export const getCargarManwhas = async (manwha: string): Promise<MangaBusquedaResponse[]> => {
  try {
    // Realizamos la solicitud GET al servidor
    const response = await axios.get<MangaBusquedaResponse[]>(`${API_BASE_URL}/api/getManwhaBusqueda?nombre=${manwha}`);
    
    // Retornamos los datos de la respuesta
    return response.data;
  } catch (error) {
    console.error('Error al buscar el Manwha:', error);
    throw error; // Lanzamos el error para que sea manejado en el componente que lo llame
  }
};


export const getCargarSeriesManwhas = async (
  page: number,
  direction: string
): Promise<ManwhaBusquedaResponse[]> => {
  try {
    // Realizamos la solicitud GET al servidor
    const response = await axios.get<ManwhasResponse>(
      `${API_BASE_URL}/api/cargarManwhas?page=${page}&direction=${direction}`
    );
    // Retorna los manwhas dentro de la respuesta
    return response.data.manwhas;
  } catch (error) {
    console.error("Error al cargar los manwhas:", error);
    throw error; // Lanzamos el error para que sea manejado en el componente que lo llame
  }
};
