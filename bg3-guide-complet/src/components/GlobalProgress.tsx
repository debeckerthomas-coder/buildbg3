// src/components/GlobalProgress.tsx
// Îlot React : indicateur de progression globale dans la topbar
// Lit tous les localStorage bg3-checklist-* pour calculer le total

import { useState, useEffect } from 'react';

const CHECKLIST_KEYS = [
  'bg3-checklist-acte1',
  'bg3-checklist-acte2',
  'bg3-checklist-acte3',
];

// Compte total connu par acte (pour calculer le %)
// Mis à jour lors de l'Étape 4 quand on connaît le vrai count
const TOTAL_ITEMS: Record<string, number> = {
  'bg3-checklist-acte1': 38,
  'bg3-checklist-acte2': 29,
  'bg3-checklist-acte3': 23,
};

interface ProgressData {
  completed: number;
  total: number;
  pct: number;
  byAct: { key: string; label: string; completed: number; total: number }[];
}

function computeProgress(): ProgressData {
  let completed = 0;
  let total = 0;
  const byAct = CHECKLIST_KEYS.map(key => {
    const actTotal = TOTAL_ITEMS[key] ?? 0;
    let actCompleted = 0;
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const data = JSON.parse(stored) as Record<string, boolean>;
        actCompleted = Object.values(data).filter(Boolean).length;
      }
    } catch {
      // localStorage non dispo (SSR, incognito)
    }
    completed += actCompleted;
    total += actTotal;
    return {
      key,
      label: key.replace('bg3-checklist-acte', 'Acte '),
      completed: actCompleted,
      total: actTotal,
    };
  });
  return {
    completed,
    total,
    pct: total > 0 ? Math.round((completed / total) * 100) : 0,
    byAct,
  };
}

export default function GlobalProgress() {
  const [progress, setProgress] = useState<ProgressData>({
    completed: 0, total: 0, pct: 0, byAct: [],
  });
  const [open, setOpen] = useState(false);

  // Lecture initiale + écoute des changements
  useEffect(() => {
    setProgress(computeProgress());

    const handler = () => setProgress(computeProgress());
    window.addEventListener('bg3:progress-updated', handler);
    return () => window.removeEventListener('bg3:progress-updated', handler);
  }, []);

  const { pct, completed, total, byAct } = progress;

  // Couleur selon avancement
  const color =
    pct >= 100 ? '#10b981' :
    pct >= 66  ? '#d4a857' :
    pct >= 33  ? '#f59e0b' :
                 '#a8a0b8';

  return (
    <div className="relative">
      {/* ── Bouton principal ── */}
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={`Progression globale : ${pct}%`}
        aria-expanded={open}
        className="flex items-center gap-2 px-3 py-1.5 rounded
                   border border-white/10 hover:border-gold/30
                   bg-bg-surface/50 hover:bg-bg-surface
                   transition-all duration-150 cursor-pointer"
      >
        {/* Anneau de progression circulaire */}
        <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
          <circle cx="10" cy="10" r="8"
            fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" />
          <circle
            cx="10" cy="10" r="8"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeDasharray={`${(pct / 100) * 50.3} 50.3`}
            strokeLinecap="round"
            transform="rotate(-90 10 10)"
            style={{ transition: 'stroke-dasharray 0.6s ease' }}
          />
        </svg>
        <span className="font-ui text-xs font-semibold hidden sm:inline"
              style={{ color }}>
          {pct}%
        </span>
      </button>

      {/* ── Dropdown détail ── */}
      {open && (
        <>
          {/* Overlay pour fermer */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            className="absolute right-0 top-full mt-2 z-50 w-56
                       rounded-lg border border-gold/20
                       shadow-[0_8px_32px_rgba(0,0,0,0.6)]
                       animate-fade-in"
            style={{ background: 'rgba(12,14,24,0.97)' }}
            role="status"
            aria-live="polite"
          >
            <div className="px-4 py-3 border-b border-gold/10">
              <div className="font-ui text-xs text-text-muted uppercase tracking-widest mb-1">
                Progression Run
              </div>
              <div className="font-display text-gold text-base">
                {completed} / {total} objectifs
              </div>
            </div>

            <div className="px-4 py-3 space-y-3">
              {byAct.map(act => (
                <div key={act.key}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-ui text-xs text-text-secondary capitalize">
                      {act.label}
                    </span>
                    <span className="font-ui text-xs text-text-muted">
                      {act.completed}/{act.total}
                    </span>
                  </div>
                  <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${act.total > 0 ? (act.completed / act.total) * 100 : 0}%`,
                        background: act.completed === act.total && act.total > 0
                          ? '#10b981'
                          : 'rgba(212,168,87,0.7)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 py-2 border-t border-gold/10">
              <button
                onClick={() => {
                  if (confirm('Réinitialiser toute la progression ?')) {
                    try {
                      CHECKLIST_KEYS.forEach(k => localStorage.removeItem(k));
                    } catch {
                      // localStorage non disponible
                    }
                    setProgress(computeProgress());
                    window.dispatchEvent(new Event('bg3:progress-updated'));
                    setOpen(false);
                  }
                }}
                className="font-ui text-xs text-text-muted hover:text-danger
                           transition-colors duration-150 w-full text-left py-1"
              >
                Réinitialiser la progression
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
