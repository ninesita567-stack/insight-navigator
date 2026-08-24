import { RotateCcw } from "lucide-react";
import { useFilters } from "@/lib/mystery/filter-context";
import type { GlobalFilters } from "@/lib/mystery/calculations";

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string | null;
  options: string[];
  onChange: (v: string | null) => void;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-1">
      <span className="text-[10px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
        {label}
      </span>
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value || null)}
        className="transition-ui h-8 min-w-0 rounded-md border border-input bg-card px-2 text-[13px] font-medium text-foreground shadow-xs outline-none focus:border-ring md:min-w-[130px]"
      >
        <option value="">Todos</option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

export function GlobalFilters() {
  const { filters, setFilter, clearFilters, hasFilters, options } = useFilters();
  const keys: { key: keyof GlobalFilters; label: string; list: string[] }[] = [
    { key: "periodo", label: "Periodo", list: options.periodos },
    { key: "concesionaria", label: "Concesionaria", list: options.concesionarias },
    { key: "marca", label: "Marca", list: options.marcas },
    { key: "ubicacion", label: "Ubicación", list: options.ubicaciones },
  ];
  return (
    <div className="flex flex-wrap items-end gap-2.5">
      {keys.map(({ key, label, list }) => (
        <FilterSelect
          key={key}
          label={label}
          value={filters[key]}
          options={list}
          onChange={(v) => setFilter(key, v)}
        />
      ))}
      <button
        onClick={clearFilters}
        disabled={!hasFilters}
        className="transition-ui inline-flex h-8 items-center gap-1.5 rounded-md border border-input bg-card px-3 text-[13px] font-medium text-muted-foreground shadow-xs hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-40"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        Limpiar filtros
      </button>
    </div>
  );
}

export function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const { activeLabel } = useFilters();
  return (
    <header className="border-b border-border bg-card/60 px-5 py-4 backdrop-blur-sm md:px-8">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 max-xl:flex max-xl:flex-col max-xl:items-start">
        <div className="min-w-0">
          <h1 className="truncate text-2xl font-bold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="mt-1 text-[13px] text-muted-foreground">{description}</p>
        </div>
        <GlobalFilters />
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs">
        <span className="font-semibold text-muted-foreground uppercase tracking-[0.06em] text-[10px]">
          Filtros activos
        </span>
        <span className="rounded-full bg-accent px-2.5 py-0.5 font-medium text-accent-foreground">
          {activeLabel}
        </span>
      </div>
    </header>
  );
}
