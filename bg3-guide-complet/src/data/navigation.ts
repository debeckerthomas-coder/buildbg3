// src/data/navigation.ts
// Source de vérité unique pour toute la navigation du guide

export type SectionKey = 'playthrough' | 'grimoire' | 'dashboard';

export interface NavSection {
  id: string;
  label: string;
}

export interface NavPage {
  href: string;
  label: string;
  shortLabel?: string;       // version courte pour la topbar
  icon: string;              // nom d'icône Lucide
  section: SectionKey;
  part?: number;             // numéro de partie source
  act?: 1 | 2 | 3;          // acte pour le playthrough
  checklistStorageKey?: string; // clé localStorage pour le suivi
  navSections: NavSection[]; // sommaire de la page (pour la sidebar)
}

// ── PLAYTHROUGH ─────────────────────────────────────────────────
const playthroughPages: NavPage[] = [
  {
    href: '/playthrough/acte1',
    label: 'Acte 1 — La Forêt interdite',
    shortLabel: 'Acte 1',
    icon: 'Tent',
    section: 'playthrough',
    part: 4,
    act: 1,
    checklistStorageKey: 'bg3-checklist-acte1',
    navSections: [
      { id: 'overview',          label: '4.0 — Vue d\'ensemble' },
      { id: 'pacifist-route',    label: '4.1 — Pacifist Route' },
      { id: 'bonus-permanents',  label: '4.2 — Bonus permanents' },
      { id: 'prologue',          label: '4.3 — Nautiloïde' },
      { id: 'plage',             label: '4.4 — Plage & Ruines' },
      { id: 'bois-sacres',       label: '4.5 — Bois Sacrés' },
      { id: 'gobelin-camp',      label: '4.6 — Camp Gobelin' },
      { id: 'underdark',         label: '4.7 — Outreterre' },
      { id: 'grymforge',         label: '4.8 — Grymforge' },
      { id: 'creche',            label: '4.9 — Crèche Githyanki' },
      { id: 'transition-acte2',  label: '4.10 — Transition Acte 2' },
      { id: 'checklist-acte1',   label: '✓ Checklist finale' },
    ],
  },
  {
    href: '/playthrough/acte2',
    label: 'Acte 2 — Les Terres maudites',
    shortLabel: 'Acte 2',
    icon: 'Moon',
    section: 'playthrough',
    part: 5,
    act: 2,
    checklistStorageKey: 'bg3-checklist-acte2',
    navSections: [
      { id: 'overview',              label: '5.0 — Vue d\'ensemble' },
      { id: 'shadow-entry',          label: '5.1 — Entrée Terres maudites' },
      { id: 'last-light',            label: '5.2 — Last Light Inn' },
      { id: 'reithwin',              label: '5.3 — Reithwin & Boss Thorm' },
      { id: 'moonrise-infiltration', label: '5.4 — Hautelune (infiltration)' },
      { id: 'shar-gauntlet',         label: '5.5 — Gauntlet de Shar' },
      { id: 'shadowfell',            label: '5.6 — Shadowfell & Nightsong' },
      { id: 'moonrise-assault',      label: '5.7 — Assaut Hautelune' },
      { id: 'colony',                label: '5.8 — Colonie Illithid & Myrkul' },
      { id: 'checklist-acte2',       label: '✓ Checklist finale' },
    ],
  },
  {
    href: '/playthrough/acte3',
    label: 'Acte 3 — Baldur\'s Gate',
    shortLabel: 'Acte 3',
    icon: 'Castle',
    section: 'playthrough',
    part: 6,
    act: 3,
    checklistStorageKey: 'bg3-checklist-acte3',
    navSections: [
      { id: 'overview',      label: '6.0 — Vue d\'ensemble' },
      { id: 'rivington',     label: '6.1 — Rivington' },
      { id: 'lower-city',    label: '6.2 — Ville Basse' },
      { id: 'steel-watch',   label: '6.3 — Fonderie d\'Acier' },
      { id: 'gortash',       label: '6.4 — Gortash' },
      { id: 'citadel',       label: '6.5 — La Citadelle' },
      { id: 'cazador',       label: '6.6 — Cazador' },
      { id: 'wyrmway',       label: '6.7 — Wyrmway & Épreuves' },
      { id: 'orin',          label: '6.8 — Orin & Temple de Bhaal' },
      { id: 'final-assault', label: '6.9 — Assaut final' },
      { id: 'epilogue',      label: '6.10 — Épilogue' },
      { id: 'checklist-acte3', label: '✓ Checklist finale' },
    ],
  },
];

// ── GRIMOIRE ─────────────────────────────────────────────────────
const grimoirePages: NavPage[] = [
  {
    href: '/grimoire/build',
    label: 'Build & Progression',
    shortLabel: 'Build',
    icon: 'Swords',
    section: 'grimoire',
    part: 1,
    navSections: [
      { id: 'creation',       label: '1.1 — Création du personnage' },
      { id: 'races',          label: '1.2 — Progression par niveau' },
      { id: 'serments',       label: '1.3 — Serment Parjure' },
      { id: 'patron',         label: '1.4 — Patron Occultiste' },
      { id: 'invocations',    label: '1.5 — Invocations & Pacte' },
      { id: 'sorts',          label: '1.6 — Sorts recommandés' },
      { id: 'roadmap',        label: '8.0 — Roadmap Pal7/Occ5' },
      { id: 'phase1',         label: '8.1 — Phase 1 : Survie Acte 1' },
      { id: 'phase2',         label: '8.2 — Phase 2 : Éveil Magique' },
      { id: 'milestones',     label: '8.3 — Checkpoints de puissance' },
    ],
  },
  {
    href: '/grimoire/equipement',
    label: 'Équipement',
    shortLabel: 'Équipement',
    icon: 'Shield',
    section: 'grimoire',
    part: 2,
    navSections: [
      { id: 'equipement-intro', label: 'Introduction BiS' },
      { id: 'armes',            label: '2.1 — Armes' },
      { id: 'armures',          label: '2.2 — Armures' },
      { id: 'boucliers',        label: '2.3 — Boucliers' },
      { id: 'casques',          label: '2.4 — Casques' },
      { id: 'gants',            label: '2.5 — Gants & Bottes' },
      { id: 'amulettes',        label: '2.6 — Amulettes' },
      { id: 'anneaux',          label: '2.7 — Anneaux' },
      { id: 'consommables',     label: '2.8 — Consommables' },
      { id: 'progression-gear', label: '2.9 — Progression par acte' },
    ],
  },
  {
    href: '/grimoire/compagnons',
    label: 'Compagnons',
    shortLabel: 'Compagnons',
    icon: 'Users',
    section: 'grimoire',
    part: 3,
    navSections: [
      { id: 'composition',  label: '3.1 — Composition d\'équipe' },
      { id: 'shadowheart',  label: '3.2 — Sombrecœur' },
      { id: 'laezel',       label: '3.3 — Lae\'zel' },
      { id: 'astarion',     label: '3.4 — Astarion' },
      { id: 'gale',         label: '3.5 — Gale' },
      { id: 'karlach',      label: '3.6 — Karlach' },
      { id: 'wyll',         label: '3.7 — Wyll' },
      { id: 'jaheira',      label: '3.8 — Jaheira & Minsc' },
      { id: 'camp-casting', label: '3.9 — Camp Casting' },
    ],
  },
  {
    href: '/grimoire/combat',
    label: 'Stratégies de Combat',
    shortLabel: 'Combat',
    icon: 'Flame',
    section: 'grimoire',
    part: 7,
    navSections: [
      { id: 'philosophy',       label: '7.0 — Philosophie Honneur' },
      { id: 'action-economy',   label: '7.1 — Économie d\'Actions' },
      { id: 'smite-economy',    label: '7.2 — Économie des Smites' },
      { id: 'initiative-sync',  label: '7.3 — Initiative Syncing' },
      { id: 'positioning',      label: '7.4 — Positionnement' },
      { id: 'darkness-build',   label: '7.5 — Stratégie Ténèbres' },
      { id: 'boss-strategies',  label: '7.6 — Stratégies Boss' },
      { id: 'consumables-strat',label: '7.7 — Usage consommables' },
    ],
  },
  {
    href: '/grimoire/faq',
    label: 'FAQ & Troubleshooting',
    shortLabel: 'FAQ',
    icon: 'HelpCircle',
    section: 'grimoire',
    part: 9,
    navSections: [
      { id: 'faq-build',    label: '9.1 — FAQ Build' },
      { id: 'faq-oath',     label: '9.2 — Serments & Parjure' },
      { id: 'faq-combat',   label: '9.3 — FAQ Combat' },
      { id: 'faq-honour',   label: '9.4 — FAQ Mode Honneur' },
      { id: 'mistakes',     label: '9.5 — Erreurs fatales' },
      { id: 'recovery',     label: '9.6 — Recovery guide' },
      { id: 'cheat-sheet',  label: '9.7 — Cheat Sheet' },
      { id: 'glossaire',    label: '9.8 — Glossaire' },
    ],
  },
];

// ── Export consolidé ──────────────────────────────────────────────
export const allPages: NavPage[] = [...playthroughPages, ...grimoirePages];

export const navigationBySection = {
  playthrough: playthroughPages,
  grimoire: grimoirePages,
};

// Helper : retrouver la page courante
export function getCurrentPage(pathname: string): NavPage | undefined {
  return allPages.find(p => pathname.startsWith(p.href));
}

// Helper : label de section
export const sectionLabels: Record<SectionKey, string> = {
  playthrough: 'Aventure',
  grimoire:    'Grimoire',
  dashboard:   'Accueil',
};
