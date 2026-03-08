// src/data/navigation.ts
// Source de vérité unique pour toute la navigation du guide

export type SectionKey = 'playthrough' | 'grimoire' | 'dashboard' | 'outils';

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
      { id: 'grove',             label: '4.5 — Bosquet d\'émeraude' },
      { id: 'blighted',          label: '4.6 — Village maudit' },
      { id: 'risen',             label: '4.7 — Route de la Résurrection' },
      { id: 'bog',               label: '4.8 — Putrid Bog' },
      { id: 'owlbear',           label: '4.9 — Grotte de l\'Ours-hibou' },
      { id: 'goblin',            label: '4.10 — Camp Gobelin' },
      { id: 'underdark',         label: '4.11 — Outreterre' },
      { id: 'grymforge',         label: '4.12 — Grymforge' },
      { id: 'creche',            label: '4.13 — Crèche Githyanki' },
      { id: 'mountain',          label: '4.14 — Transition Acte 2' },
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
      { id: 'gauntlet',              label: '5.5 — Épreuve de Shar' },
      { id: 'moonrise-assault',      label: '5.6 — Assaut Hautelune' },
      { id: 'colony',                label: '5.7 — Colonie Illithid & Myrkul' },
      { id: 'checklist-act2',        label: '✓ Checklist finale' },
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
      { id: 'overview',        label: '6.0 — Vue d\'ensemble' },
      { id: 'rivington',       label: '6.1 — Rivington & Roc du Ver' },
      { id: 'lower-city',      label: '6.2 — Ville Basse' },
      { id: 'steel-watch',     label: '6.3 — Fonderie de la Garde d\'Acier' },
      { id: 'gortash',         label: '6.4 — Gortash' },
      { id: 'orin',            label: '6.5 — Orin la Rouge' },
      { id: 'optional-bosses', label: '6.6 — Boss optionnels' },
      { id: 'netherbrain',     label: '6.7 — Cerveau Vénérable' },
      { id: 'endgame',         label: '6.8 — Loadout final & Épilogue' },
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
      { id: 'creation',         label: '1.1 — Création du personnage' },
      { id: 'races',            label: '1.2 — Choix de la race' },
      { id: 'caracteristiques', label: '1.3 — Caractéristiques' },
      { id: 'competences',      label: '1.4 — Compétences' },
      { id: 'progression',      label: '1.5 — Progression' },
      { id: 'serments',         label: '1.6 — Serment Parjure' },
      { id: 'patron',           label: '1.7 — Patron Occultiste' },
      { id: 'invocations',      label: '1.8 — Invocations & Pacte' },
      { id: 'sorts',            label: '1.9 — Sorts recommandés' },
      { id: 'dons',             label: '1.10 — Dons' },
      { id: 'phase1',           label: '1.11 — Phase 1 : Acte 1' },
      { id: 'math-degats',      label: '1.12 — Mathématiques des Dégâts' },
      { id: 'phase2',           label: '1.13 — Phase 2 : Éveil Magique' },
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
      { id: 'gants',            label: '2.5 — Gants' },
      { id: 'bottes',           label: '2.6 — Bottes' },
      { id: 'capes',            label: '2.7 — Capes' },
      { id: 'amulettes',        label: '2.8 — Amulettes' },
      { id: 'anneaux',          label: '2.9 — Anneaux' },
      { id: 'elixirs',          label: '2.10 — Élixirs & Consommables' },
      { id: 'loadouts',         label: '2.11 — Progression par acte' },
      { id: 'checklist-equip',  label: '✓ Checklist Équipement' },
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
      { id: 'minthara',     label: '3.8 — Minthara' },
      { id: 'halsin',       label: '3.9 — Halsin' },
      { id: 'jaheira',      label: '3.10 — Jaheira & Minsc' },
      { id: 'camp-casting', label: '3.11 — Camp Casting' },
      { id: 'compo-reco',   label: '3.12 — Compositions recommandées' },
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
      { id: 'philosophy',        label: '7.0 — Philosophie Honneur' },
      { id: 'action-economy',    label: '7.1 — Économie d\'Actions' },
      { id: 'smite-economy',     label: '7.2 — Économie des Smites' },
      { id: 'initiative-sync',   label: '7.3 — Initiative Syncing' },
      { id: 'positioning',       label: '7.4 — Positionnement' },
      { id: 'burst',             label: '7.5 — Alpha Strike' },
      { id: 'concentration',     label: '7.6 — Concentration' },
      { id: 'legendary-actions', label: '7.7 — Actions Légendaires' },
      { id: 'consumables',       label: '7.8 — Consommables & Pré-buffs' },
      { id: 'vendor-refresh',    label: '7.9 — Ingénierie Économique' },
      { id: 'emergency',         label: '7.10 — Protocoles d\'Urgence' },
      { id: 'party-synergy',     label: '7.11 — Synergies d\'équipe' },
      { id: 'honour-tactics',    label: '7.12 — Tactiques Mode Honneur' },
      { id: 'illithid-powers',   label: '7.13 — Pouvoirs Illithid' },
      { id: 'checklist-combat',  label: '✓ Checklist Combat' },
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
      { id: 'faq-build',       label: '9.1 — FAQ Build' },
      { id: 'faq-oath',        label: '9.2 — Serments & Parjure' },
      { id: 'faq-combat',      label: '9.3 — FAQ Combat' },
      { id: 'faq-honour',      label: '9.4 — FAQ Mode Honneur' },
      { id: 'mistakes',        label: '9.5 — Erreurs fatales' },
      { id: 'recovery',        label: '9.6 — Recovery guide' },
      { id: 'faq-companions',  label: '9.7 — FAQ Compagnons' },
      { id: 'faq-loot',        label: '9.8 — FAQ Loot' },
      { id: 'checklist-boss',  label: '9.8b — Checklist boss' },
      { id: 'cheatsheet',      label: '9.9 — Cheat Sheet' },
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
  outils:      'Outils',
};
