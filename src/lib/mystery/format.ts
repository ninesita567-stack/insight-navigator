// Formateadores únicos para toda la app. Nunca mostrar NaN/undefined/Infinity.

export function fmtPct(v: number | null | undefined, digits = 1): string {
  if (v === null || v === undefined || !Number.isFinite(v)) return "—";
  return `${(v * 100).toFixed(digits)}%`;
}

/** Brecha en puntos porcentuales, nunca como % relativo. */
export function fmtPp(gap: number | null | undefined, digits = 1): string {
  if (gap === null || gap === undefined || !Number.isFinite(gap)) return "—";
  const pp = gap * 100;
  const sign = pp > 0 ? "+" : pp < 0 ? "−" : "";
  return `${sign}${Math.abs(pp).toFixed(digits)} pp`;
}

export function fmtInt(n: number | null | undefined): string {
  if (n === null || n === undefined || !Number.isFinite(n)) return "—";
  return String(Math.round(n));
}
