// src/data/gameElements.ts
// Base de données des éléments de gameplay pour les tooltips enrichis

export interface GameElement {
  id: string;
  type: 'spell' | 'item' | 'consumable' | 'weapon' | 'armor' | 'passive';
  name: string;
  icon?: string;
  school?: string;
  damage?: string;
  range?: string;
  action?: 'Action' | 'Bonus Action' | 'Réaction' | 'Passif';
  concentration?: boolean;
  description: string;
  source?: string;
}

export const gameElements: Record<string, GameElement> = {
  // ── SORTS ─────────────────────────────────────────────────────
  'chatiment-divin': {
    id: 'chatiment-divin', type: 'spell', name: 'Châtiment Divin',
    icon: 'https://bg3.wiki/w/images/b/b6/Divine_Smite_Icon.png',
    school: 'Évocation', damage: '2d8 Radiant', range: 'Contact',
    action: 'Bonus Action', concentration: false,
    description: 'Imprègne votre arme d\'énergie divine. Lors de votre prochain coup, infligez 2d8 dégâts radiants supplémentaires et repoussez la cible.',
    source: 'Paladin niv.2',
  },
  'tenebres': {
    id: 'tenebres', type: 'spell', name: 'Ténèbres',
    icon: 'https://bg3.wiki/w/images/4/46/Darkness_Icon.png',
    school: 'Évocation', range: '18m', action: 'Action', concentration: true,
    description: 'Crée une zone de ténèbres magiques de 4,5m. Les créatures sans Vision du Diable ont désavantage aux attaques dans la zone.',
    source: 'Zariel Tiefling / Occultiste',
  },
  'benediction': {
    id: 'benediction', type: 'spell', name: 'Bénédiction',
    icon: 'https://bg3.wiki/w/images/5/51/Bless_Icon.png',
    school: 'Enchantement', action: 'Action', concentration: true, range: '9m',
    description: 'Bénit jusqu\'à 3 créatures : elles ajoutent 1d4 à leurs jets d\'attaque et jets de sauvegarde.',
    source: 'Paladin / Clerc niv.1',
  },
  'bouclier-foi': {
    id: 'bouclier-foi', type: 'spell', name: 'Bouclier de la Foi',
    icon: 'https://bg3.wiki/w/images/c/c3/Shield_of_Faith_Icon.png',
    school: 'Abjuration', action: 'Bonus Action', concentration: true, range: 'Contact',
    description: '+2 à la CA de la cible (jusqu\'à 10 minutes). Indispensable pour survivre en Acte 1.',
    source: 'Paladin niv.1',
  },
  'mot-de-vie': {
    id: 'mot-de-vie', type: 'spell', name: 'Mot de Vie',
    icon: 'https://bg3.wiki/w/images/f/f6/Healing_Word_Icon.png',
    school: 'Évocation', action: 'Bonus Action', range: '18m',
    damage: '2d4 + MOD sorts (PV rendus)',
    description: 'Relève et soigne un allié à terre sans contact. La Bonus Action le rend exceptionnel en combat.',
    source: 'Clerc niv.3',
  },
  'lumiere': {
    id: 'lumiere', type: 'spell', name: 'Lumière',
    icon: 'https://bg3.wiki/w/images/9/95/Light_Icon.png',
    school: 'Évocation', action: 'Action', concentration: true, range: 'Contact',
    description: 'Illumine l\'équipement d\'une créature. Contre-mesure basique à la stratégie Ténèbres ennemie.',
    source: 'Sort cantrip universel',
  },
  // ── PASSIFS & AURAS ───────────────────────────────────────────
  'aura-protection': {
    id: 'aura-protection', type: 'passive', name: 'Aura de Protection',
    icon: 'https://bg3.wiki/w/images/a/a8/Aura_of_Protection_Icon.png',
    action: 'Passif', range: '3m (9 pieds)',
    description: 'Les alliés dans un rayon de 3m ajoutent votre modificateur de Charisme à tous leurs jets de sauvegarde. La capacité la plus puissante du Paladin.',
    source: 'Paladin niv.7',
  },
  'aura-devotion': {
    id: 'aura-devotion', type: 'passive', name: 'Aura de Dévotion',
    icon: 'https://bg3.wiki/w/images/a/ad/Aura_of_Devotion_Icon.png',
    action: 'Passif', range: '3m',
    description: 'Vous et vos alliés proches êtes immunisés contre l\'état Charmé. Reste actif même en Mode Honneur.',
    source: 'Paladin niv.6 (Serment du Dévouement)',
  },
  'devil-sight': {
    id: 'devil-sight', type: 'passive', name: 'Vision du Diable',
    icon: 'https://bg3.wiki/w/images/8/8e/Devil%27s_Sight_Icon.png',
    action: 'Passif',
    description: 'Peut voir normalement dans les ténèbres magiques. Combiné avec le sort Ténèbres, vous attaquez avec avantage tandis que les ennemis ont désavantage.',
    source: 'Invocation Occultiste',
  },
  'pacte-lame': {
    id: 'pacte-lame', type: 'passive', name: 'Pacte de la Lame',
    icon: 'https://bg3.wiki/w/images/8/80/Bind_Pact_Weapon_Icon.png',
    action: 'Bonus Action',
    description: 'Invoque une arme de pacte. Vos attaques utilisent votre modificateur de Charisme au lieu de Force. Clé du build : CHA → dégâts d\'attaque.',
    source: 'Occultiste niv.3',
  },
  // ── ÉQUIPEMENT ────────────────────────────────────────────────
  'devotee-mace': {
    id: 'devotee-mace', type: 'weapon', name: 'Masse de la Dévote',
    icon: 'https://bg3.wiki/w/images/d/d5/The_Devotee%27s_Mace_Icon.png',
    damage: '1d6+4 Contondant + 1d6 Radiants',
    description: 'Meilleure arme Acte 1 pour Lockadin. Ajoute 1d6 radiants aux attaques. S\'obtient dans le camp de Sombrecœur.',
    source: 'Sombrecœur (quête compagnon Acte 1)',
  },
  'everburn-blade': {
    id: 'everburn-blade', type: 'weapon', name: 'Lame Perpétuellement Embrasée',
    icon: 'https://bg3.wiki/w/images/1/1f/Everburn_Blade_Icon.png',
    damage: '1d6+1 Tranchant + 2d4 Feu',
    description: 'Grande épée en feu obtenue sur le Commandeur Zhalk (Nautiloïde). Vaut le risque du prologue.',
    source: 'Commandeur Zhalk — Nautiloïde',
  },
  'helldusk-armor': {
    id: 'helldusk-armor', type: 'armor', name: 'Armure de l\'Enfer Crépusculaire',
    icon: 'https://bg3.wiki/w/images/c/cb/Helldusk_Armour_Icon.png',
    description: 'CA 21, Résistance aux dégâts de feu, Réduction des dégâts critiques. Meilleure armure du jeu pour Lockadin.',
    source: 'Acte 3 — Raphaël (Maison de l\'Espoir)',
  },
  'gloves-power': {
    id: 'gloves-power', type: 'item', name: 'Gants de Pouvoir',
    icon: 'https://bg3.wiki/w/images/5/51/Gloves_of_Power_Icon.png',
    description: '+1d4 aux jets d\'attaque au corps à corps. L\'un des meilleurs gants pour Acte 1, combinable avec n\'importe quelle arme.',
    source: 'Acte 1 — Marchand gobelin',
  },
  'amulet-misty-step': {
    id: 'amulet-misty-step', type: 'item', name: 'Amulette du Pas Brumeux',
    icon: 'https://bg3.wiki/w/images/9/99/Amulet_of_Misty_Step_Icon.png',
    description: 'Permet de lancer Pas Brumeux une fois par repos. Mobilité cruciale pour repositionnement en combat.',
    source: 'Acte 1 — Archiprêtresse Gut',
  },
  // ── CONSOMMABLES ──────────────────────────────────────────────
  'potion-speed': {
    id: 'potion-speed', type: 'consumable', name: 'Potion de Rapidité',
    icon: 'https://bg3.wiki/w/images/e/ef/Potion_of_Speed_Icon.png',
    action: 'Bonus Action',
    description: 'Octroie Hâte pendant 3 tours : +1 Action, +2 Vitesse, +2 CA. Indispensable pour les boss d\'Acte 1.',
    source: 'Marchands / Coffres',
  },
  'elixir-bloodlust': {
    id: 'elixir-bloodlust', type: 'consumable', name: 'Élixir de Soif de Sang',
    icon: 'https://bg3.wiki/w/images/9/97/Elixir_of_Bloodlust_Icon.png',
    action: 'Action',
    description: 'Accorde une action bonus lorsque vous tuez un ennemi. Transforme les combats en cascade de kills.',
    source: 'Recette Alchimie / Marchands',
  },
  'oil-combustion': {
    id: 'oil-combustion', type: 'consumable', name: 'Huile de Combustion',
    icon: 'https://bg3.wiki/w/images/7/70/Oil_of_Combustion_Icon.png',
    action: 'Bonus Action', damage: '+1d4 Feu pendant 3 tours',
    description: 'Applique des dégâts de feu aux armes. Parfaite pour Acte 1 avant d\'avoir du vrai équipement magique.',
    source: 'Marchands communs',
  },
};
