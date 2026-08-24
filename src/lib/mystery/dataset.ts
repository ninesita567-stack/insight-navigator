// Fuente de datos centralizada.
// Hoy lee un JSON generado desde el Excel consolidado. Para conectar otra
// fuente (Supabase, API, Google Sheets) basta reemplazar este módulo
// manteniendo la interfaz `Dataset`.
import raw from "@/data/mystery-shopping.json";
import type { Dataset, Evaluation, Indicator, Question } from "./types";

export const dataset = raw as unknown as Dataset;

export const MAQUINARIAS = "Maquinarias";

const indicatorById = new Map<string, Indicator>(
  dataset.indicators.map((i) => [i.id, i]),
);
const questionById = new Map<string, Question>(
  dataset.questions.map((q) => [q.id, q]),
);
const evaluationById = new Map<string, Evaluation>(
  dataset.evaluations.map((e) => [e.id, e]),
);

export function getIndicator(id: string) {
  return indicatorById.get(id);
}
export function getQuestion(id: string) {
  return questionById.get(id);
}
export function getEvaluation(id: string) {
  return evaluationById.get(id);
}

export function isMaquinarias(concesionaria: string) {
  return concesionaria.toUpperCase() === "MAQUINARIAS";
}

/** Valores únicos para los selectores de filtros. */
export function distinct<K extends keyof Evaluation>(key: K): string[] {
  const set = new Set<string>();
  for (const e of dataset.evaluations) {
    const v = e[key];
    if (typeof v === "string" && v) set.add(v);
  }
  return [...set].sort((a, b) => a.localeCompare(b, "es"));
}
