import type { ReactNode } from "react";

type ShellProps = { id: string; label: string; required?: boolean; error?: string; hint?: string; children: ReactNode };

function Shell({ id, label, required, error, hint, children }: ShellProps) {
  return (
    <div className="flex min-w-0 flex-col gap-1.5">
      <label htmlFor={id} className="text-[15px] font-semibold text-navy">
        {label} {required && <span className="text-brand" aria-hidden="true">*</span>}
      </label>
      {children}
      {hint && !error && <p className="text-sm text-slate-500">{hint}</p>}
      {error && <p id={`${id}-err`} role="alert" className="text-sm font-semibold text-brand-dark">{error}</p>}
    </div>
  );
}

const cls = (error?: string) => `input ${error ? "border-brand" : ""}`;

type Base = { id: string; label: string; value: string; onChange: (v: string) => void; required?: boolean; error?: string; hint?: string; placeholder?: string };

export function TextField(p: Base & { type?: "text" | "tel" | "number" | "date"; inputMode?: "text" | "tel" | "numeric"; min?: number; max?: number; autoComplete?: string }) {
  return (
    <Shell {...p}>
      <input id={p.id} className={cls(p.error)} type={p.type ?? "text"} inputMode={p.inputMode} min={p.min} max={p.max}
        autoComplete={p.autoComplete} value={p.value} placeholder={p.placeholder} required={p.required}
        aria-invalid={!!p.error} aria-describedby={p.error ? `${p.id}-err` : undefined}
        onChange={(e) => p.onChange(e.target.value)} />
    </Shell>
  );
}

export function SelectField(p: Base & { options: string[] }) {
  return (
    <Shell {...p}>
      <select id={p.id} className={cls(p.error)} value={p.value} required={p.required}
        aria-invalid={!!p.error} aria-describedby={p.error ? `${p.id}-err` : undefined}
        onChange={(e) => p.onChange(e.target.value)}>
        <option value="">{p.placeholder ?? "Pilih"}</option>
        {p.options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </Shell>
  );
}

export function TextAreaField(p: Base) {
  return (
    <Shell {...p}>
      <textarea id={p.id} className={cls(p.error)} rows={4} value={p.value} placeholder={p.placeholder}
        onChange={(e) => p.onChange(e.target.value)} />
    </Shell>
  );
}

export function CheckboxGroup({ id, label, options, values, onChange }: { id: string; label: string; options: string[]; values: string[]; onChange: (v: string[]) => void }) {
  const toggle = (o: string) => onChange(values.includes(o) ? values.filter((x) => x !== o) : [...values, o]);
  return (
    <fieldset className="m-0 flex min-w-0 flex-col gap-2 border-0 p-0">
      <legend className="mb-2 text-[15px] font-semibold text-navy">{label} <span className="font-normal text-slate-500">(boleh lebih dari satu)</span></legend>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((o, i) => (
          <label key={o} htmlFor={`${id}-${i}`} className={`flex cursor-pointer items-center gap-3 rounded-btn border px-4 py-3 text-[15px] ${values.includes(o) ? "border-brand bg-brand-soft" : "border-line bg-white"}`}>
            <input id={`${id}-${i}`} type="checkbox" className="h-5 w-5 accent-[#D71920]" checked={values.includes(o)} onChange={() => toggle(o)} />
            {o}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
