// src/components/Tooltip.tsx
// Tooltip enrichi — interface style BG3
// Supporte lookup par id dans gameElements, ou props directes
//
// Usage MDX (lookup) :
//   <Tooltip id="chatiment-divin" term="Châtiment Divin" client:load />
//
// Usage MDX (props directes) :
//   <Tooltip
//     term="Châtiment Divin"
//     type="spell"
//     name="Châtiment Divin"
//     school="Évocation"
//     damage="2d8 Radiant"
//     action="Bonus Action"
//     description="Imprègne votre arme..."
//     source="Paladin niv.2"
//     client:load
//   />
//
// Usage MDX (ancien style, rétrocompatible) :
//   <Tooltip name="Lame Éternelle" type="Arme" stats="+1d4 Feu" client:idle>
//     Description longue ici.
//   </Tooltip>

import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react';
import { gameElements, type GameElement } from '../data/gameElements';

// ── Couleurs BG3 ────────────────────────────────────────────────
const TYPE_COLORS: Record<string, string> = {
  spell:       '#818cf8',   // indigo
  item:        '#d4a857',   // or
  consumable:  '#22c55e',   // vert
  weapon:      '#d4a857',   // or
  armor:       '#d4a857',   // or
  passive:     '#c084fc',   // violet
};

const TYPE_LABELS: Record<string, string> = {
  spell:       'Sort',
  item:        'Objet',
  consumable:  'Consommable',
  weapon:      'Arme',
  armor:       'Armure',
  passive:     'Passif',
};

// Placeholder SVG par type
function IconPlaceholder({ type }: { type?: string }) {
  const color = TYPE_COLORS[type ?? ''] ?? '#d4a857';
  const symbol =
    type === 'spell'      ? '✦' :
    type === 'weapon'     ? '⚔' :
    type === 'armor'      ? '🛡' :
    type === 'consumable' ? '⬡' :
    type === 'passive'    ? '◈' : '⚔';

  return (
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: 8,
        border: `1px solid ${color}40`,
        background: `${color}18`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 20,
        color,
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      {symbol}
    </div>
  );
}

// ── Props ────────────────────────────────────────────────────────
interface TooltipProps {
  // Nouveau système
  id?: string;              // lookup dans gameElements
  term?: string;            // texte affiché (lien hover)
  type?: 'spell' | 'item' | 'consumable' | 'weapon' | 'armor' | 'passive';
  name?: string;            // nom dans le tooltip
  icon?: string;            // chemin icône
  school?: string;          // ex: 'Évocation'
  damage?: string;          // ex: '2d6+CHA Nécrotique'
  range?: string;           // ex: '18m'
  action?: 'Action' | 'Bonus Action' | 'Réaction' | 'Passif';
  concentration?: boolean;
  description?: string;
  source?: string;
  // Rétrocompatibilité ancien système
  stats?: string;
  rarity?: 'common' | 'uncommon' | 'rare' | 'very-rare' | 'legendary';
  imageUrl?: string;
  className?: string;
  children?: ReactNode;
}

const rarityColors: Record<string, string> = {
  common:      '#a8a0b8',
  uncommon:    '#10b981',
  rare:        '#3b82f6',
  'very-rare': '#8b5cf6',
  legendary:   '#f59e0b',
};

export default function Tooltip(props: TooltipProps) {
  const {
    id,
    term,
    type: propType,
    name: propName,
    icon,
    school,
    damage,
    range,
    action,
    concentration,
    description,
    source,
    // rétrocompat
    stats,
    rarity,
    imageUrl,
    className = '',
    children,
  } = props;

  // Résolution de l'élément depuis la base de données
  const element: GameElement | undefined = id ? gameElements[id] : undefined;

  // Fusion : props > element > défauts
  const resolvedType    = propType    ?? element?.type;
  const resolvedName    = propName    ?? element?.name    ?? term ?? '';
  const resolvedSchool  = school      ?? element?.school;
  const resolvedDamage  = damage      ?? element?.damage;
  const resolvedRange   = range       ?? element?.range;
  const resolvedAction  = action      ?? element?.action;
  const resolvedConc    = concentration !== undefined ? concentration : element?.concentration;
  const resolvedDesc    = description  ?? element?.description;
  const resolvedSource  = source      ?? element?.source;
  const resolvedIcon    = icon        ?? element?.icon ?? imageUrl;

  // Pour l'affichage du trigger
  const triggerText = term ?? resolvedName;

  // Couleur selon type ou rarity (rétrocompat)
  const accentColor = resolvedType
    ? (TYPE_COLORS[resolvedType] ?? '#d4a857')
    : rarity
      ? (rarityColors[rarity] ?? '#d4a857')
      : '#d4a857';

  // ── State ─────────────────────────────────────────────────────
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number; placement: 'above' | 'below' }>({
    top: 0, left: 0, placement: 'above',
  });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Position ──────────────────────────────────────────────────
  const computePos = useCallback(() => {
    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;
    if (!trigger || !tooltip) return;

    const tRect     = trigger.getBoundingClientRect();
    const ttHeight  = tooltip.offsetHeight;
    const ttWidth   = tooltip.offsetWidth;
    const vw        = window.innerWidth;
    const spaceAbove = tRect.top;
    const spaceBelow = window.innerHeight - tRect.bottom;
    const placement  = spaceAbove > ttHeight + 8 || spaceAbove > spaceBelow
      ? 'above' : 'below';

    let left = tRect.left + tRect.width / 2 - ttWidth / 2;
    left = Math.max(8, Math.min(left, vw - ttWidth - 8));

    const top = placement === 'above'
      ? tRect.top - ttHeight - 8
      : tRect.bottom + 8;

    setPos({ top, left, placement });
  }, []);

  // ── Show / hide ───────────────────────────────────────────────
  const show = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    timerRef.current = setTimeout(() => setVisible(false), 150);
  }, []);

  const keepOpen = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  // Mobile : toggle au clic
  const toggle = useCallback(() => {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [visible]);

  useEffect(() => {
    if (visible) {
      requestAnimationFrame(computePos);
    }
  }, [visible, computePos]);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  // Fermer au clic extérieur (mobile)
  useEffect(() => {
    if (!visible) return;
    const handler = (e: MouseEvent) => {
      if (
        triggerRef.current && !triggerRef.current.contains(e.target as Node) &&
        tooltipRef.current && !tooltipRef.current.contains(e.target as Node)
      ) {
        setVisible(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [visible]);

  const tooltipId = `tt-${(resolvedName || 'unknown').replace(/[^\w-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')}`;

  // Détermine si on affiche le nouveau style enrichi ou l'ancien style
  const isEnriched = !!(resolvedDesc || resolvedType);

  return (
    <>
      {/* ── Trigger ── */}
      <span
        ref={triggerRef}
        className={`tooltip-trigger inline cursor-help ${className}`}
        style={{
          color: accentColor === '#d4a857' ? '#f0c97a' : accentColor,
          borderBottom: `1px dashed ${accentColor}60`,
          transition: 'color 0.15s, border-color 0.15s',
        }}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        onClick={toggle}
        tabIndex={0}
        role="button"
        aria-describedby={visible ? tooltipId : undefined}
        aria-label={`Détail : ${resolvedName}`}
      >
        {triggerText}
      </span>

      {/* ── Tooltip flottant ── */}
      {visible && (
        <div
          ref={tooltipRef}
          id={tooltipId}
          role="tooltip"
          onMouseEnter={keepOpen}
          onMouseLeave={hide}
          style={{
            position: 'fixed',
            zIndex: 300,
            top: pos.top,
            left: pos.left,
            width: 288,
            background: 'rgba(8, 10, 20, 0.97)',
            border: `1px solid ${accentColor}55`,
            borderRadius: 10,
            boxShadow: `0 8px 40px rgba(0,0,0,0.8), 0 0 20px ${accentColor}18`,
            overflow: 'hidden',
            pointerEvents: 'auto',
          }}
        >
          {isEnriched ? (
            /* ── Style enrichi BG3 ── */
            <>
              {/* En-tête */}
              <div style={{
                padding: '10px 12px 8px',
                background: `${accentColor}12`,
                borderBottom: `1px solid ${accentColor}30`,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}>
                {/* Icône */}
                {resolvedIcon ? (
                  <div style={{
                    width: 44, height: 44, borderRadius: 8, overflow: 'hidden',
                    border: `1px solid ${accentColor}35`,
                    background: `${accentColor}12`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <img
                      src={resolvedIcon}
                      alt={resolvedName}
                      style={{ width: 36, height: 36, objectFit: 'contain' }}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const parent = e.currentTarget.parentElement as HTMLElement | null;
                        if (parent) parent.style.display = 'none';
                      }}
                    />
                  </div>
                ) : (
                  <IconPlaceholder type={resolvedType} />
                )}

                {/* Titre */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    color: '#f0c97a',
                    fontSize: 14,
                    fontWeight: 700,
                    lineHeight: 1.3,
                    fontFamily: 'var(--font-heading, serif)',
                  }}>
                    {resolvedName}
                  </div>
                  {resolvedType && (
                    <div style={{
                      color: accentColor,
                      fontSize: 11,
                      marginTop: 2,
                      opacity: 0.85,
                    }}>
                      {resolvedSchool ? `${TYPE_LABELS[resolvedType]} — ${resolvedSchool}` : TYPE_LABELS[resolvedType]}
                    </div>
                  )}
                </div>
              </div>

              {/* Séparateur + métadonnées */}
              {(resolvedAction || resolvedDamage || resolvedRange || resolvedConc !== undefined) && (
                <div style={{
                  padding: '8px 12px 6px',
                  borderBottom: `1px solid ${accentColor}20`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                }}>
                  {resolvedAction && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 12 }}>🎯</span>
                      <span style={{ color: '#c8b89a', fontSize: 12 }}>
                        <strong style={{ color: '#e8d5a8' }}>{resolvedAction}</strong>
                      </span>
                    </div>
                  )}
                  {resolvedDamage && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 12 }}>⚡</span>
                      <span style={{ color: '#c8b89a', fontSize: 12 }}>
                        Dégâts : <strong style={{ color: '#e8d5a8' }}>{resolvedDamage}</strong>
                      </span>
                    </div>
                  )}
                  {resolvedRange && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 12 }}>📏</span>
                      <span style={{ color: '#c8b89a', fontSize: 12 }}>
                        Portée : <strong style={{ color: '#e8d5a8' }}>{resolvedRange}</strong>
                      </span>
                    </div>
                  )}
                  {resolvedConc !== undefined && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 12 }}>⏱</span>
                      <span style={{ color: '#c8b89a', fontSize: 12 }}>
                        Concentration : <strong style={{ color: resolvedConc ? '#f59e0b' : '#e8d5a8' }}>
                          {resolvedConc ? 'Oui' : 'Non'}
                        </strong>
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              {(resolvedDesc || children || stats) && (
                <div style={{
                  padding: '8px 12px',
                  borderBottom: resolvedSource ? `1px solid ${accentColor}20` : 'none',
                }}>
                  {stats && (
                    <div style={{
                      fontFamily: 'monospace',
                      fontSize: 11,
                      color: '#f0d090',
                      background: 'rgba(212,168,87,0.08)',
                      padding: '4px 8px',
                      borderRadius: 4,
                      border: '1px solid rgba(212,168,87,0.15)',
                      marginBottom: resolvedDesc || children ? 6 : 0,
                    }}>
                      {stats}
                    </div>
                  )}
                  {resolvedDesc && (
                    <p style={{
                      color: '#c8b89a',
                      fontSize: 12,
                      lineHeight: 1.55,
                      margin: 0,
                    }}>
                      {resolvedDesc}
                    </p>
                  )}
                  {children && !resolvedDesc && (
                    <div style={{ color: '#c8b89a', fontSize: 12, lineHeight: 1.55 }}>
                      {children}
                    </div>
                  )}
                </div>
              )}

              {/* Source */}
              {resolvedSource && (
                <div style={{
                  padding: '6px 12px 8px',
                  color: '#8a7d6a',
                  fontSize: 11,
                  fontStyle: 'italic',
                }}>
                  Source : {resolvedSource}
                </div>
              )}
            </>
          ) : (
            /* ── Style rétrocompat (ancien Tooltip) ── */
            <>
              <div style={{
                padding: '10px 12px',
                borderBottom: `1px solid ${accentColor}25`,
                background: `${accentColor}10`,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
              }}>
                {resolvedIcon && (
                  <div style={{
                    width: 44, height: 44, borderRadius: 8, overflow: 'hidden',
                    border: `1px solid ${accentColor}30`,
                    flexShrink: 0,
                  }}>
                    <img
                      src={resolvedIcon}
                      alt={resolvedName}
                      style={{ width: 36, height: 36, objectFit: 'contain' }}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const parent = e.currentTarget.parentElement as HTMLElement | null;
                        if (parent) parent.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#f0d090', fontSize: 14, fontWeight: 700 }}>
                    {resolvedName}
                  </div>
                  {propType && (
                    <div style={{ color: accentColor, fontSize: 11, marginTop: 2, opacity: 0.8 }}>
                      {propType}
                    </div>
                  )}
                </div>
              </div>
              <div style={{ padding: '10px 14px' }}>
                {stats && (
                  <div style={{
                    fontFamily: 'monospace',
                    fontSize: 11,
                    color: '#f0d090',
                    background: 'rgba(212,168,87,0.08)',
                    padding: '4px 8px',
                    borderRadius: 4,
                    border: '1px solid rgba(212,168,87,0.15)',
                    marginBottom: 8,
                  }}>
                    {stats}
                  </div>
                )}
                {children && (
                  <div style={{ color: '#c8b89a', fontSize: 12, lineHeight: 1.55 }}>
                    {children}
                  </div>
                )}
              </div>
            </>
          )}

          {/* Flèche */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              width: 8,
              height: 8,
              background: 'rgba(8,10,20,0.97)',
              border: `1px solid ${accentColor}55`,
              ...(pos.placement === 'above'
                ? { bottom: -5, borderTop: 'none', borderLeft: 'none' }
                : { top: -5, borderBottom: 'none', borderRight: 'none' }),
            }}
            aria-hidden="true"
          />
        </div>
      )}
    </>
  );
}
