// Modelo de datos Mystery Shopping.
// Esta capa está pensada para poder reemplazarse por una fuente externa
// (Excel, CSV, Google Sheets, Supabase, API) sin tocar la lógica ni la UI.

export type TipoEmpresa = "MAQUINARIAS" | "COMPETENCIA";

export interface Evaluation {
  id: string;
  periodo: string;
  fecha: string | null;
  concesionaria: string;
  marca: string;
  ubicacion: string;
  tipoEmpresa: TipoEmpresa;
  puntajeGlobal: number; // 0..1
  comentarioGeneral: string | null;
  recomendaciones: string | null;
  evaluador: string | null;
  estadoCalidad: string | null;
}

export interface Indicator {
  id: string;
  nombre: string;
  peso: number; // 0..1, los pesos de una evaluación suman 1
  orden: number;
}

export interface IndicatorResult {
  idEvaluacion: string;
  idIndicador: string;
  resultado: number; // 0..1 (cumplimiento del indicador en esa evaluación)
  peso: number;
}

export interface Question {
  id: string;
  idIndicador: string;
  pregunta: string;
  tipoRespuesta: string;
}

export interface QuestionResponse {
  idEvaluacion: string;
  idPregunta: string;
  respuesta: string | null;
  puntaje: number | null; // null = sin evaluar (informativa)
  comentario: string | null;
}

export interface Dataset {
  meta: { fuente: string; periodo: string };
  indicators: Indicator[];
  evaluations: Evaluation[];
  indicatorResults: IndicatorResult[];
  questions: Question[];
  questionResponses: QuestionResponse[];
}
