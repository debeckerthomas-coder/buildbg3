// src/components/Checklist.tsx
// Îlot React : checklist interactive avec sauvegarde LocalStorage
// Usage MDX :
//   <Checklist storageKey="bg3-checklist-acte1" title="Checklist Acte 1" items={[...]} client:load />
//
// Ou avec sous-groupes :
//   <Checklist storageKey="bg3-checklist-acte1" groups={[{ title: "Prologue", items: [...] }]} client:load />

import { useState, useEffect, useCallback, useId } from 'react';

// ── Types ────────────────────────────────────────────────────────
export interface ChecklistItem {
  id: string;            // identifiant unique stable (utilisé pour localStorage)
  label: string;         // texte affiché, peut contenir du HTML simple
  sublabel?: string;     // détail optionnel sous le label
  priority?: 'critical' | 'important' | 'optional';  // coloration
  tag?: string;          // badge court ex: "BiS", "Bonus permanent", "Secret"
}

export interface ChecklistGroup {
  title?: string;
  items: ChecklistItem[];
}

interface Props {
  storageKey: string;                   // clé de namespace localStorage (ex: "bg3-checklist-acte1")
  title?: string;                       // titre affiché en header
  items?: ChecklistItem[];              // liste plate (sans groupes)
  groups?: ChecklistGroup[];            // liste avec groupes
  collapsible?: boolean;                // peut être réduit
  defaultCollapsed?: boolean;
  showProgress?: boolean;               // barre de progression intégrée
  className?: string;
}

// ── Couleurs par priorité ────────────────────────────────────────
const priorityConfig = {
  critical:  { dot: 'bg-danger',  text: 'text-danger/90',  ring: 'ring-danger/30' },
  important: { dot: 'bg-gold',    text: 'text-gold/90',    ring: 'ring-gold/30' },
  optional:  { dot: 'bg-text-dim',text: 'text-text-muted', ring: 'ring-white/10' },
};

// ── Composant principal ──────────────────────────────────────────
export default function Checklist({
  storageKey,
  title,
  items,
  groups,
  collapsible = false,
  defaultCollapsed = false,
  showProgress = true,
  className = '',
}: Props) {
  const uid = useId();

  // Normalise en groupes même si on reçoit une liste plate
  const allGroups: ChecklistGroup[] = groups ?? (items ? [{ items }] : []);
  const allItems = allGroups.flatMap(g => g.items);
  const totalCount = allItems.length;

  // ── State ──────────────────────────────────────────────────────
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [mounted, setMounted] = useState(false);

  // ── Chargement depuis localStorage ────────────────────────────
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        setChecked(JSON.parse(raw) as Record<string, boolean>);
      }
    } catch {
      // localStorage bloqué (incognito / SSR)
    }
    setMounted(true);
  }, [storageKey]);

  // ── Sauvegarde dans localStorage + event global ───────────────
  const save = useCallback((newState: Record<string, boolean>) => {
    setChecked(newState);
    try {
      localStorage.setItem(storageKey, JSON.stringify(newState));
      // Notifie GlobalProgress.tsx
      window.dispatchEvent(new Event('bg3:progress-updated'));
    } catch {
      // silencieux
    }
  }, [storageKey]);

  // ── Toggle d'un item ──────────────────────────────────────────
  const toggle = useCallback((id: string) => {
    setChecked(prev => {
      const next = { ...prev, [id]: !prev[id] };
      save(next);
      return next;
    });
  }, [save]);

  // ── Tout cocher / décocher ────────────────────────────────────
  const toggleAll = useCallback((value: boolean) => {
    const next: Record<string, boolean> = {};
    allItems.forEach(item => { next[item.id] = value; });
    save(next);
  }, [allItems, save]);

  // ── Calcul progression ────────────────────────────────────────
  const completedCount = allItems.filter(i => checked[i.id]).length;
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const allDone = completedCount === totalCount && totalCount > 0;

  // ── Rendu SSR-safe (skeleton avant hydratation) ───────────────
  if (!mounted) {
    return (
      <div className={`checklist-skeleton rounded-lg border border-gold/10 bg-bg-raised/30 p-4 ${className}`}
           aria-busy="true">
        <div className="h-4 bg-white/5 rounded w-1/3 mb-3 animate-pulse" />
        {Array.from({ length: Math.min(totalCount, 4) }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 py-2">
            <div className="w-4 h-4 rounded bg-white/5 animate-pulse shrink-0" />
            <div className="h-3 bg-white/5 rounded animate-pulse"
                 style={{ width: `${60 + Math.random() * 30}%` }} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={`checklist rounded-xl border overflow-hidden transition-all duration-200
        ${allDone
          ? 'border-emerald/30 shadow-[0_0_16px_rgba(16,185,129,0.08)]'
          : 'border-gold/15'
        } ${className}`}
      style={{ background: 'rgba(12,14,24,0.7)' }}
      id={`checklist-${uid}`}
    >
      {/* ── Header ──────────────────────────────────────────── */}
      {(title || showProgress) && (
        <div
          className={`flex items-center justify-between gap-3 px-4 py-3
                      border-b ${allDone ? 'border-emerald/20' : 'border-gold/10'}`}
          style={{ background: 'rgba(8,10,18,0.5)' }}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Icône check/checklist */}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                 className={`w-4 h-4 shrink-0 transition-colors ${allDone ? 'text-emerald' : 'text-gold/60'}`}
                 aria-hidden="true">
              {allDone
                ? <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>
                : <><rect width="8" height="8" x="3" y="3" rx="1"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="1"/></>
              }
            </svg>
            {title && (
              <h3 className={`font-ui text-sm font-semibold truncate
                             ${allDone ? 'text-emerald' : 'text-text-primary'}`}>
                {allDone ? '✓ ' : ''}{title}
              </h3>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Compteur */}
            <span className="font-ui text-xs text-text-muted whitespace-nowrap">
              {completedCount}/{totalCount}
            </span>
            {/* Toggle tout */}
            <button
              onClick={() => toggleAll(completedCount < totalCount)}
              className="font-ui text-xs text-text-muted hover:text-text-secondary
                         transition-colors duration-150 cursor-pointer whitespace-nowrap"
              aria-label={completedCount < totalCount ? 'Tout cocher' : 'Tout décocher'}
            >
              {completedCount < totalCount ? 'Tout cocher' : 'Réinitialiser'}
            </button>
            {/* Collapse toggle */}
            {collapsible && (
              <button
                onClick={() => setCollapsed(c => !c)}
                className="text-text-muted hover:text-text-secondary transition-colors cursor-pointer"
                aria-expanded={!collapsed}
                aria-controls={`checklist-body-${uid}`}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className={`w-4 h-4 transition-transform duration-200 ${collapsed ? '' : 'rotate-180'}`}
                     aria-hidden="true">
                  <polyline points="18 15 12 9 6 15"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Barre de progression ─────────────────────────────── */}
      {showProgress && (
        <div className="h-1 bg-white/5" role="progressbar"
             aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}
             aria-label={`${pct}% complété`}>
          <div
            className="h-full transition-all duration-500 ease-out"
            style={{
              width: `${pct}%`,
              background: allDone
                ? '#10b981'
                : `linear-gradient(90deg, rgba(212,168,87,0.6), rgba(212,168,87,0.9))`,
            }}
          />
        </div>
      )}

      {/* ── Corps : groupes + items ───────────────────────────── */}
      <div
        id={`checklist-body-${uid}`}
        className={`transition-all duration-300 overflow-hidden
                    ${collapsed ? 'max-h-0' : 'max-h-[9999px]'}`}
      >
        {allGroups.map((group, gi) => (
          <div key={gi}>
            {/* Titre de groupe */}
            {group.title && (
              <div className="px-4 pt-3 pb-1">
                <span className="font-ui text-[10px] uppercase tracking-widest text-text-muted">
                  {group.title}
                </span>
              </div>
            )}
            {/* Items */}
            <ul className="px-3 py-1.5 space-y-0.5" role="list">
              {group.items.map(item => {
                const isChecked = !!checked[item.id];
                const prio = item.priority ? priorityConfig[item.priority] : null;

                return (
                  <li key={item.id}>
                    <label
                      className={`
                        group flex items-start gap-3 px-2.5 py-2 rounded-lg
                        cursor-pointer select-none
                        transition-all duration-150
                        ${isChecked
                          ? 'bg-emerald/5 hover:bg-emerald/8'
                          : 'hover:bg-gold/5'
                        }
                      `}
                      htmlFor={`item-${uid}-${item.id}`}
                    >
                      {/* Checkbox custom */}
                      <div className="relative shrink-0 mt-0.5">
                        <input
                          type="checkbox"
                          id={`item-${uid}-${item.id}`}
                          checked={isChecked}
                          onChange={() => toggle(item.id)}
                          className="sr-only"
                          aria-label={item.label.replace(/<[^>]+>/g, '')}
                        />
                        <div
                          className={`
                            w-4 h-4 rounded border transition-all duration-200
                            flex items-center justify-center
                            ${isChecked
                              ? 'bg-emerald border-emerald shadow-[0_0_6px_rgba(16,185,129,0.4)]'
                              : `border-white/20 group-hover:border-gold/40
                                 ${prio ? `ring-1 ${prio.ring}` : ''}`
                            }
                          `}
                          aria-hidden="true"
                        >
                          {isChecked && (
                            <svg viewBox="0 0 24 24" fill="none" stroke="white"
                                 strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                                 className="w-2.5 h-2.5">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          )}
                        </div>
                        {/* Point de priorité */}
                        {prio && !isChecked && (
                          <div className={`absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full ${prio.dot}`}
                               aria-hidden="true" />
                        )}
                      </div>

                      {/* Contenu du label */}
                      <div className="flex-1 min-w-0">
                        <span
                          className={`
                            font-body text-sm leading-snug transition-all duration-200
                            ${isChecked
                              ? 'text-text-muted line-through decoration-text-muted/40'
                              : prio
                                ? prio.text
                                : 'text-text-primary'
                            }
                          `}
                          dangerouslySetInnerHTML={{ __html: item.label }}
                        />
                        {item.sublabel && !isChecked && (
                          <span className="block font-ui text-xs text-text-muted mt-0.5 leading-snug">
                            {item.sublabel}
                          </span>
                        )}
                        {item.tag && (
                          <span className={`
                            inline-flex items-center mt-1 px-1.5 py-0.5 rounded text-[10px]
                            font-ui font-medium border
                            ${item.priority === 'critical'
                              ? 'bg-danger/10 text-danger border-danger/30'
                              : item.priority === 'important'
                                ? 'bg-gold/10 text-gold border-gold/30'
                                : 'bg-white/5 text-text-muted border-white/10'
                            }
                          `}>
                            {item.tag}
                          </span>
                        )}
                      </div>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {/* Message de complétion */}
        {allDone && (
          <div className="mx-3 mb-3 px-4 py-3 rounded-lg
                          bg-emerald/8 border border-emerald/20
                          flex items-center gap-2.5">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                 className="w-4 h-4 text-emerald shrink-0" aria-hidden="true">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
            <span className="font-ui text-xs text-emerald font-medium">
              Section complète — Prêt pour la suite !
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
