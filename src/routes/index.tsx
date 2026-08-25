import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { ArrowRight, ClipboardList, Gauge, Scale, TrendingUp } from "lucide-react";
import { PageHeader } from "@/components/mystery/page-header";
import {
  EmptyState,
  GapChip,
  MetricCard,
  SectionHeader,
  StatusBadge,
} from "@/components/mystery/primitives";
import { ResultDonut } from "@/components/mystery/charts";
import {
  benchmarkSentence,
  calculateBenchmark,
  calculateIndicatorPerformance,
  calculateWeightedScore,
  getScopes,
  priorityLevel,
  statusFor,
} from "@/lib/mystery/calculations";
import { fmtInt, fmtPct, fmtPp } from "@/lib/mystery/format";
import { useFilters } from "@/lib/mystery/filter-context";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Resumen Ejecutivo — Mystery Insights | Maquinarias" },
      {
        name: "description",
        content:
          "Visión ejecutiva del desempeño Mystery Shopping: puntaje global, benchmark vs competencia, fortalezas y prioridades de acción.",
      },
      { property: "og:title", content: "Resumen Ejecutivo — Mystery Insights | Maquinarias" },
      {
        property: "og:description",
        content:
          "Visión ejecutiva del desempeño Mystery Shopping: puntaje global, benchmark vs competencia, fortalezas y prioridades de acción.",
      },
    ],
  }),
  component: ResumenEjecutivo,
});

function ResumenEjecutivo() {
  const { filters, openIndicador } = useFilters();

  const scopes = useMemo(() => getScopes(filters), [filters]);
  const benchmark = useMemo(() => calculateBenchmark(scopes), [scopes]);
  const indicators = useMemo(() => calculateIndicatorPerformance(scopes), [scopes]);

  const selIds = scopes.selection.map((e) => e.id);
  const puntajeGlobal = useMemo(() => calculateWeightedScore(selIds), [selIds]);

  const distribution = useMemo(() => {
    const counts = { Alto: 0, Medio: 0, Crítico: 0 };
    for (const e of scopes.selection) {
      const s = statusFor(e.puntajeGlobal);
      if (s === "alto") counts.Alto++;
      else if (s === "medio") counts.Medio++;
      else if (s === "critico") counts.Crítico++;
    }
    return [
      { name: "Alto" as const, value: counts.Alto },
      { name: "Medio" as const, value: counts.Medio },
      { name: "Crítico" as const, value: counts.Crítico },
    ];
  }, [scopes]);

  const fortalezas = useMemo(
    () =>
      indicators
        .filter((i) => i.resultado !== null)
        .sort((a, b) => (b.resultado ?? 0) - (a.resultado ?? 0))
        .slice(0, 3),
    [indicators],
  );

  const prioridades = useMemo(
    () =>
      indicators
        .filter((i) => i.impacto !== null)
        .sort((a, b) => {
          const pa = (a.impacto ?? 0) + (a.brecha !== null && a.brecha < 0 ? Math.abs(a.brecha) * 0.5 : 0);
          const pb = (b.impacto ?? 0) + (b.brecha !== null && b.brecha < 0 ? Math.abs(b.brecha) * 0.5 : 0);
          return pb - pa;
        })
        .slice(0, 5),
    [indicators],
  );

  const criticos = indicators.filter((i) => i.estado === "critico").length;

  if (scopes.selection.length === 0) {
    return (
      <>
        <PageHeader
          title="Resumen Ejecutivo"
          description="Visión general del desempeño Mystery Shopping de las evaluaciones seleccionadas."
        />
        <div className="p-5 md:p-8">
          <EmptyState />
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Resumen Ejecutivo"
        description="Visión general del desempeño Mystery Shopping de las evaluaciones seleccionadas."
      />
      <div className="flex flex-col gap-8 p-5 md:p-8">
        {/* KPIs */}
        <section className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
          <MetricCard
            label="Puntaje Global"
            value={fmtPct(puntajeGlobal)}
            subtext="Promedio ponderado de evaluaciones seleccionadas"
            tone="primary"
            icon={<Gauge className="h-4 w-4 text-primary/50" />}
          />
          <MetricCard
            label="Evaluaciones"
            value={fmtInt(scopes.selection.length)}
            subtext="Total en el universo seleccionado"
            icon={<ClipboardList className="h-4 w-4 text-muted-foreground/50" />}
          />
          <MetricCard
            label="Maquinarias"
            value={fmtPct(benchmark.maquinarias)}
            subtext={`${scopes.maquinariasLabel} · ${benchmark.nMaquinarias} eval.`}
          />
          <MetricCard
            label="Competencia"
            value={fmtPct(benchmark.competencia)}
            subtext={`${scopes.competenciaLabel} · ${benchmark.nCompetencia} eval.`}
          />
          <MetricCard
            label="Brecha"
            value={fmtPp(benchmark.brecha)}
            subtext="Maquinarias − Competencia (puntos porcentuales)"
            tone={benchmark.brecha === null ? "default" : benchmark.brecha >= 0 ? "success" : "danger"}
            icon={<Scale className="h-4 w-4 text-muted-foreground/50" />}
          />
          <MetricCard
            label="Indicadores críticos"
            value={fmtInt(criticos)}
            subtext="Debajo del umbral crítico (50%)"
            tone={criticos > 0 ? "danger" : "success"}
            icon={<TrendingUp className="h-4 w-4 text-muted-foreground/50" />}
          />
        </section>

        {/* Distribución + Benchmark ejecutivo + Fortalezas */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5">
            <SectionHeader title="Distribución de resultados" description="Evaluaciones por nivel de desempeño" />
            <ResultDonut data={distribution} />
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <SectionHeader title="Benchmark ejecutivo" description="Resultado comparado contra la referencia" />
            <div className="flex items-center justify-around gap-4 py-2">
              <div className="text-center">
                <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                  Maquinarias
                </p>
                <p className="mt-1 text-4xl font-bold text-primary tabular-nums">
                  {fmtPct(benchmark.maquinarias)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {benchmark.nMaquinarias} evaluaciones
                </p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="rounded-full bg-muted px-3 py-1 text-xs font-bold text-muted-foreground">
                  VS
                </span>
                <GapChip gap={benchmark.brecha} />
              </div>
              <div className="text-center">
                <p className="text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                  Competencia
                </p>
                <p className="mt-1 text-4xl font-bold text-foreground/70 tabular-nums">
                  {fmtPct(benchmark.competencia)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {benchmark.nCompetencia} evaluaciones
                </p>
              </div>
            </div>
            <p className="mt-3 rounded-lg bg-accent px-3 py-2.5 text-center text-[13px] font-medium text-accent-foreground">
              {benchmarkSentence(benchmark)}
            </p>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              Referencia: {scopes.competenciaLabel}
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <SectionHeader title="Principales fortalezas" description="Indicadores con mejores resultados" />
            <ul className="flex flex-col divide-y divide-border">
              {fortalezas.map((f) => (
                <li key={f.id}>
                  <button
                    onClick={() => openIndicador(f.id)}
                    className="transition-ui group flex w-full items-center justify-between gap-3 py-2.5 text-left"
                  >
                    <span className="min-w-0 truncate text-[13px] font-medium text-foreground group-hover:text-primary">
                      {f.nombre}
                    </span>
                    <span className="flex shrink-0 items-center gap-2">
                      <StatusBadge status={f.estado} />
                      <span className="w-14 text-right text-sm font-bold text-success tabular-nums">
                        {fmtPct(f.resultado)}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
              {fortalezas.length === 0 && (
                <li className="py-3 text-sm text-muted-foreground">Sin indicadores evaluados.</li>
              )}
            </ul>
          </div>
        </section>

        {/* ¿Dónde debemos actuar? */}
        <section className="rounded-xl border-2 border-primary/20 bg-card p-5 md:p-6">
          <SectionHeader
            title="¿Dónde debemos actuar?"
            description="Prioridades según Impacto de Prioridad = (1 − resultado) × peso, ajustado por brecha vs competencia."
          />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-border text-left text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                  <th className="py-2 pr-4">Indicador</th>
                  <th className="py-2 pr-4 text-right">Resultado</th>
                  <th className="py-2 pr-4 text-right">Peso</th>
                  <th className="py-2 pr-4 text-right">Brecha</th>
                  <th className="py-2 pr-4 text-right">Prioridad</th>
                  <th className="py-2 text-right">Análisis</th>
                </tr>
              </thead>
              <tbody>
                {prioridades.map((p) => (
                  <tr key={p.id} className="border-b border-border/60 last:border-0">
                    <td className="py-2.5 pr-4 text-[13px] font-medium text-foreground">
                      {p.nombre}
                    </td>
                    <td className="py-2.5 pr-4 text-right text-[13px] font-bold tabular-nums">
                      {fmtPct(p.resultado)}
                    </td>
                    <td className="py-2.5 pr-4 text-right text-[13px] text-muted-foreground tabular-nums">
                      {fmtPct(p.peso, 0)}
                    </td>
                    <td className="py-2.5 pr-4 text-right">
                      <GapChip gap={p.brecha} className="text-[13px]" />
                    </td>
                    <td className="py-2.5 pr-4 text-right">
                      <PriorityPill level={priorityLevel(p.impacto, p.brecha)} />
                    </td>
                    <td className="py-2.5 text-right">
                      <button
                        onClick={() => openIndicador(p.id)}
                        className="transition-ui inline-flex items-center gap-1 rounded-md px-2 py-1 text-[12px] font-semibold text-primary hover:bg-primary/10"
                      >
                        Ver análisis <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
}

export function PriorityPill({ level }: { level: "ALTA" | "MEDIA" | "BAJA" }) {
  const styles = {
    ALTA: "bg-danger/10 text-danger border-danger/25",
    MEDIA: "bg-warning/10 text-warning border-warning/25",
    BAJA: "bg-muted text-muted-foreground border-border",
  }[level];
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${styles}`}>
      {level}
    </span>
  );
}
