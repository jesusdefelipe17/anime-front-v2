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
  calificacion:string;
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


// Servicio para obtener los datos de Manwhas populares
export const getManwhasPopulares = async (): Promise<Manwha[]> => {
  try {
    const response = await axios.get<Manwha[]>('http://127.0.0.1:8000/api/ManwhasPopulares');
    return response.data; // Tipado correcto
  } catch (error) {
    console.error('Error al obtener manwhas populares:', error);
    throw error;
  }
};

// Modificar el servicio para obtener nuevos capítulos
export const getNuevosCapitulosManwha = async (): Promise<NuevoCapitulo[]> => {
  try {
    const response = await axios.get<{ capitulos: NuevoCapitulo[] }>('http://127.0.0.1:8000/api/cargarNuevosCapitulosManwha');
    return response.data.capitulos;
  } catch (error) {
    console.error('Error al obtener los nuevos capítulos de manwha:', error);
    throw error;
  }
};

export const getSliderData = async (): Promise<Slider[]> => {
  try {
    const response = await axios.get<Slider[]>('http://127.0.0.1:8000/api/Sliders'); // Cambia a tu URL
    return response.data; // Axios ya asegura que el tipo coincide con Slider[]
  } catch (error) {
    console.error('Error al obtener datos del slider:', error);
    return [];
  }
};