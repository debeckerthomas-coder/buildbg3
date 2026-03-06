// src/components/Tooltip.tsx
// Îlot React : tooltip flottant pour les noms d'objets, sorts, capacités
// Usage MDX :
//
//   <Tooltip name="Lame Éternelle" type="Arme Inhabituelle" client:idle>
//     La lame est perpétuellement en feu, infligeant 1d4 dégâts de Feu supplémentaires.
//   </Tooltip>
//
//   Avec image (icône wiki BG3) :
//   <Tooltip name="Sang de Lathandre" type="Masse Légendaire +3" rarity="legendary"
//     imageUrl="https://bg3.wiki/w/images/0/05/Blood_of_Lathander_Icon.png" client:idle>
//     Inflige 2d6+3 contondant + 2d6 radiant.
//   </Tooltip>

import { useState, useRef, useEffect, useCallback, type ReactNode } from 'react';

interface Props {
  name: string;
  type?: string;          // "Arme Légendaire", "Capacité Paladin", etc.
  stats?: string;         // stats courtes : "+2 CA", "2d8 Radiant", etc.
  rarity?: 'common' | 'uncommon' | 'rare' | 'very-rare' | 'legendary';
  imageUrl?: string;      // Icône de l'objet/sort (wiki BG3)
  children?: ReactNode;   // description longue
  className?: string;
}

const rarityColors: Record<string, string> = {
  common:      '#a8a0b8',
  uncommon:    '#10b981',
  rare:        '#3b82f6',
  'very-rare': '#8b5cf6',
  legendary:   '#f59e0b',
};

export default function Tooltip({
  name,
  type,
  stats,
  rarity,
  imageUrl,
  children,
  className = '',
}: Props) {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState<{ top: number; left: number; placement: 'above' | 'below' }>({
    top: 0, left: 0, placement: 'above',
  });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);

  const rarityColor = rarity ? rarityColors[rarity] : '#d4a857';

  // ── Calcul de position ────────────────────────────────────────
  const computePos = useCallback(() => {
    const trigger = triggerRef.current;
    const tooltip = tooltipRef.current;
    if (!trigger || !tooltip) return;

    const tRect = trigger.getBoundingClientRect();
    const ttHeight = tooltip.offsetHeight;
    const ttWidth  = tooltip.offsetWidth;
    const vw = window.innerWidth;
    const spaceAbove = tRect.top;
    const spaceBelow = window.innerHeight - tRect.bottom;
    const placement = spaceAbove > ttHeight + 8 || spaceAbove > spaceBelow
      ? 'above' : 'below';

    // Centre horizontalement sur le trigger, clamp dans le viewport
    let left = tRect.left + tRect.width / 2 - ttWidth / 2;
    left = Math.max(8, Math.min(left, vw - ttWidth - 8));

    const top = placement === 'above'
      ? tRect.top - ttHeight - 8
      : tRect.bottom + 8;

    setPos({ top, left, placement });
  }, []);

  // ── Show / hide avec délais ───────────────────────────────────
  const show = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    timerRef.current = setTimeout(() => setVisible(false), 120);
  }, []);

  const keepOpen = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  // Recalcule la position dès que le tooltip devient visible
  useEffect(() => {
    if (visible) {
      requestAnimationFrame(computePos);
    }
  }, [visible, computePos]);

  // Cleanup timer à la démonture
  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return (
    <>
      {/* ── Trigger ── */}
      <span
        ref={triggerRef}
        className={`
          tooltip-trigger inline cursor-help
          border-b border-dashed border-gold/40
          text-gold-light hover:text-gold
          transition-colors duration-150
          ${className}
        `}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        tabIndex={0}
        role="button"
        aria-describedby={visible ? `tt-${name.replace(/\s+/g, '-')}` : undefined}
        aria-label={`Détail : ${name}`}
      >
        {name}
      </span>

      {/* ── Tooltip flottant (portal via fixed) ── */}
      {visible && (
        <div
          ref={tooltipRef}
          id={`tt-${name.replace(/\s+/g, '-')}`}
          role="tooltip"
          onMouseEnter={keepOpen}
          onMouseLeave={hide}
          className="fixed z-[200] w-64 rounded-xl overflow-hidden
                     animate-fade-in pointer-events-auto"
          style={{
            top:   pos.top,
            left:  pos.left,
            background: 'rgba(8,10,18,0.97)',
            border: `1px solid ${rarityColor}40`,
            boxShadow: `0 8px 32px rgba(0,0,0,0.7), 0 0 16px ${rarityColor}15`,
          }}
        >
          {/* Header */}
          <div
            className="px-3 py-2.5 border-b flex items-center gap-2.5"
            style={{
              background: `${rarityColor}10`,
              borderColor: `${rarityColor}25`,
            }}
          >
            {/* Icône de l'objet */}
            {imageUrl && (
              <div
                className="shrink-0 w-11 h-11 rounded-lg overflow-hidden flex items-center justify-center border"
                style={{
                  background: `${rarityColor}12`,
                  borderColor: `${rarityColor}30`,
                  boxShadow: `0 0 8px ${rarityColor}20`,
                }}
              >
                <img
                  src={imageUrl}
                  alt={name}
                  className="w-9 h-9 object-contain"
                  onError={(e) => {
                    (e.currentTarget.parentElement as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            )}

            {/* Nom + type */}
            <div className="flex-1 min-w-0">
              <div className="font-heading text-sm font-semibold leading-snug"
                   style={{ color: rarityColor === '#d4a857' ? '#f0d090' : rarityColor }}>
                {name}
              </div>
              {type && (
                <div className="font-ui text-[10px] mt-0.5 opacity-70"
                     style={{ color: rarityColor }}>
                  {type}
                </div>
              )}
            </div>
          </div>

          {/* Contenu */}
          <div className="px-4 py-3 space-y-2">
            {stats && (
              <code className="block font-mono text-xs text-gold-pale
                               bg-gold/8 px-2 py-1 rounded border border-gold/15">
                {stats}
              </code>
            )}
            {children && (
              <div className="font-body text-xs text-text-secondary leading-relaxed">
                {children}
              </div>
            )}
          </div>

          {/* Petite flèche indicatrice */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
            style={{
              background: 'rgba(8,10,18,0.97)',
              border: `1px solid ${rarityColor}40`,
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
