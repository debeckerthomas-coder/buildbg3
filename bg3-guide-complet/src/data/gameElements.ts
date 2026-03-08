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
  // ── ARMES SUPPLÉMENTAIRES ─────────────────────────────────────
  'longsword-adamantine': {
    id: 'longsword-adamantine', type: 'weapon', name: 'Épée longue adamantine',
    icon: 'https://bg3.wiki/w/images/0/04/Adamantine_Longsword_Icon.png',
    damage: '1d8+1 Tranchant',
    description: 'Forgée à la Forge adamantine avec du métal adamantine. Ignore toute résistance aux dégâts tranchants. Utile contre les créatures résistantes.',
    source: 'Acte 1 — Forge adamantine (Grymforge)',
  },
  'sword-justice': {
    id: 'sword-justice', type: 'weapon', name: 'Épée de Justice',
    icon: 'https://bg3.wiki/w/images/f/f3/Sword_of_Justice_Icon.png',
    damage: '1d8+1 Tranchant',
    description: 'Octroie +2 CA via le sort Bouclier de la Foi lorsqu\'elle est tenue à deux mains. Obtenue sur Anders sur la Route de la Résurrection.',
    source: 'Acte 1 — Anders (Route de la Résurrection)',
  },
  'spear-moonrise': {
    id: 'spear-moonrise', type: 'weapon', name: 'Lance de la Nuit de Séluné',
    icon: 'https://bg3.wiki/w/images/0/0f/Selune%27s_Spear_of_Night_Icon.png',
    damage: '1d6+3 Perforant + 1d6 Nécrotique',
    description: 'Lance +3 de la déesse Séluné. Inflige 1d6 dégâts nécrotiques supplémentaires. Alternative solide au Sang de Lathandre si vous sauvez Chantsenuit à Sombrecœur.',
    source: 'Acte 2 — Récompense quête Dame de la Douleur (sauver Chantsenuit)',
  },
  // ── ARMURES SUPPLÉMENTAIRES ───────────────────────────────────
  'adamantine-splint': {
    id: 'adamantine-splint', type: 'armor', name: 'Armure d\'attelle adamantine',
    icon: 'https://bg3.wiki/w/images/6/6e/Adamantine_Splint_Armour_Icon.png',
    description: 'CA 18. Réduit tous les dégâts subis de 2. Immunité aux coups critiques. Inflige l\'état Reeling aux attaquants. BiS Acte 1 et 2 pour Lockadin.',
    source: 'Acte 1 — Forge adamantine (Grymforge) — nécessite Moule d\'Armure d\'attelle',
  },
  'armure-persistance': {
    id: 'armure-persistance', type: 'armor', name: 'Armure de Persistance',
    icon: 'https://bg3.wiki/w/images/9/96/Armour_of_Persistence_Icon.png',
    description: 'CA 20. Réduit les dégâts subis de 2. Immunité à l\'état Poussé (Forcément déplacé). Achetable en Acte 3 avant d\'obtenir l\'Armure Crépuscule Infernal.',
    source: 'Acte 3 — Marchand (Janvier ou Quartier des Feux)',
  },
  'helldusk-armor-alias': {
    id: 'helldusk-armor-alias', type: 'armor', name: 'Armure Crépuscule Infernal',
    icon: 'https://bg3.wiki/w/images/c/cb/Helldusk_Armour_Icon.png',
    description: 'CA 21. Résistance aux dégâts de feu. Réduit les dégâts de 3. Immunité aux coups critiques. Ne requiert aucune compétence en armure. Meilleure armure du jeu.',
    source: 'Acte 3 — Raphaël (Maison de l\'Espoir, combat optionnel)',
  },
  'githyanki-half-plate': {
    id: 'githyanki-half-plate', type: 'armor', name: 'Demi-plate Githyanki',
    icon: 'https://bg3.wiki/w/images/5/53/Half_Plate_Armour_%2BGithyanki%29_Icon.png',
    description: 'CA 17. Armure de départ de Lae\'zel. Option viable en Acte 1 si vous n\'avez pas encore l\'armure adamantine.',
    source: 'Acte 1 — Lae\'zel (compagnon, Prologue)',
  },
  // ── BOUCLIERS ─────────────────────────────────────────────────
  'adamantine-shield': {
    id: 'adamantine-shield', type: 'item', name: 'Bouclier adamantine',
    icon: 'https://bg3.wiki/w/images/3/3f/Adamantine_Shield_Icon.png',
    description: '+2 CA. Immunité aux coups critiques. Inflige l\'état Reeling aux attaquants. BiS bouclier Acte 1-2. Forgé à la Forge adamantine.',
    source: 'Acte 1 — Forge adamantine (Grymforge)',
  },
  'shield-devotion': {
    id: 'shield-devotion', type: 'item', name: 'Bouclier de Dévotion',
    icon: 'https://bg3.wiki/w/images/e/e7/Shield_of_Devotion_Icon.png',
    description: '+2 CA. Permet de lancer Aide (sort niv.2) une fois par repos. Accorde un emplacement de sort supplémentaire de niveau 1. Très utile pour les Smites en Acte 2.',
    source: 'Acte 2 — Récompense quête ou marchand',
  },
  'sentinel-shield': {
    id: 'sentinel-shield', type: 'item', name: 'Bouclier Sentinelle',
    icon: 'https://bg3.wiki/w/images/7/7e/Sentinel_Shield_Icon.png',
    description: '+2 CA. Octroie l\'avantage sur les jets d\'initiative et les jets de Perception passive. Excellent pour agir en premier et repérer les ennemis cachés.',
    source: 'Acte 2 — Marchands / Coffres (Sombrecœur)',
  },
  'viconia-shield': {
    id: 'viconia-shield', type: 'item', name: 'Forteresse Ambulante de Viconia',
    icon: 'https://bg3.wiki/w/images/7/71/Viconia%27s_Walking_Fortress_Icon.png',
    description: '+3 CA. Avantage sur les jets de sauvegarde contre les sorts. Permet de renvoyer les sorts sur leur lanceur. Meilleur bouclier du jeu.',
    source: 'Acte 3 — Viconia DeVir (Temple de Shar)',
  },
  // ── CASQUES ───────────────────────────────────────────────────
  'helm-chatiment': {
    id: 'helm-chatiment', type: 'item', name: 'Casque de châtiment',
    icon: 'https://bg3.wiki/w/images/6/64/The_Punishing_Helm_Icon.png',
    description: 'Lorsque vous utilisez un Châtiment Divin, gagnez des PV temporaires égaux à votre modificateur de Charisme. Exceptionnel pour le sustain en combat.',
    source: 'Acte 1 — Outreterre (Grymforge / marchands souterrains)',
  },
  'helm-balduran': {
    id: 'helm-balduran', type: 'item', name: 'Heaume de Balduran',
    icon: 'https://bg3.wiki/w/images/6/6f/Balduran%27s_Helm_Icon.png',
    description: 'Immunité à l\'état Étourdi et aux coups critiques. Régénère +2 PV par tour. Casque légendaire BiS Acte 3 pour Lockadin.',
    source: 'Acte 3 — Ansur le Dragon (Wyrmway, sous Baldur\'s Gate)',
  },
  'helm-sarevok': {
    id: 'helm-sarevok', type: 'item', name: 'Casque cornu de Sarevok',
    icon: 'https://bg3.wiki/w/images/6/6f/Sarevok%27s_Horned_Helmet_Icon.png',
    description: 'Immunité à l\'état Effrayé. Réduit le seuil de critique de 1 (crits sur 19-20). S\'empile avec l\'Élixir de Viciosité pour des crits sur 18-19-20.',
    source: 'Acte 3 — Sarevok Anchev (Temple de Bhaal)',
  },
  'helm-sacred-lance': {
    id: 'helm-sacred-lance', type: 'item', name: 'Heaume de la Lance Sacrée',
    icon: 'https://bg3.wiki/w/images/a/a3/Haste_Helm_Icon.png',
    description: 'Lorsqu\'un ennemi rate son jet d\'attaque contre vous, il subit 1d4 dégâts radiants. Passif défensif intéressant en Acte 2.',
    source: 'Acte 1-2 — Monastère d\'Auberosée',
  },
  // ── GANTS ─────────────────────────────────────────────────────
  'gauntlets-of-the-warmaster': {
    id: 'gauntlets-of-the-warmaster', type: 'item', name: 'Héritage des Maîtres',
    icon: 'https://bg3.wiki/w/images/f/f0/Gauntlets_of_the_Warmaster_Icon.png',
    description: '+2 aux jets d\'attaque et +2 aux jets de dégâts au corps à corps. Gants BiS absolus pour Lockadin en Acte 3.',
    source: 'Acte 3 — Dammon (forgeron, camp des Tieffelins)',
  },
  'helldusk-gloves': {
    id: 'helldusk-gloves', type: 'item', name: 'Gants Crépuscule Infernal',
    icon: 'https://bg3.wiki/w/images/e/e3/Helldusk_Gloves_Icon.png',
    description: 'Ajoute 1d6 dégâts de feu à toutes vos attaques. Bonus d\'attaque supplémentaire contre les cibles en feu. Obtenus sur Haarlep à la Maison de l\'Espoir.',
    source: 'Acte 3 — Haarlep (Maison de l\'Espoir)',
  },
  'gloves-heroism': {
    id: 'gloves-heroism', type: 'item', name: 'Gants d\'Héroïsme',
    icon: 'https://bg3.wiki/w/images/2/25/Gloves_of_Heroism_Icon.png',
    description: 'Lorsque vous utilisez Canalisation Divinie, le sort Héroïsme est automatiquement lancé sur vous. Utile en Acte 1 pour obtenir des PV temporaires gratuitement.',
    source: 'Acte 1 — Cave du péage (Druides vs Tieffelins, Acte 1)',
  },
  'gloves-war-mage': {
    id: 'gloves-war-mage', type: 'item', name: 'Gants du Mage de guerre',
    icon: 'https://bg3.wiki/w/images/2/2b/Gloves_of_Dexterity_Icon.png',
    description: 'Accorde un bonus aux jets d\'attaque tant que vous maintenez une concentration sur un sort. Synergise bien avec Bénédiction ou Bouclier de la Foi.',
    source: 'Acte 2-3 — Marchands',
  },
  // ── BOTTES ────────────────────────────────────────────────────
  'helldusk-boots': {
    id: 'helldusk-boots', type: 'item', name: 'Bottes Crépuscule Infernal',
    icon: 'https://bg3.wiki/w/images/8/84/Helldusk_Boots_Icon.png',
    description: 'Permet de se téléporter jusqu\'à 12m (Action Bonus). Immunité à l\'état Poussé. Meilleures bottes du jeu pour Lockadin.',
    source: 'Acte 3 — Coffre de Gortash (Bâtiment de la Loi)',
  },
  'boots-shadow': {
    id: 'boots-shadow', type: 'item', name: 'Marchenocturnes',
    icon: 'https://bg3.wiki/w/images/5/5b/Shadowy_Laces_Icon.png',
    description: 'Permet de lancer Pas Brumeux une fois par repos court. Immunité aux sorts de Toile d\'araignée. Excellent pour la mobilité en Acte 1.',
    source: 'Acte 1 — Butin de Nere (Grymforge)',
  },
  'boots-speed': {
    id: 'boots-speed', type: 'item', name: 'Bottes de Vitesse',
    icon: 'https://bg3.wiki/w/images/4/4a/Boots_of_Speed_Icon.png',
    description: 'Action Bonus : double votre vitesse de déplacement jusqu\'à la fin du tour. Très utile pour se repositionner rapidement ou fuir le corps à corps.',
    source: 'Acte 1 — Thulla (Outreterre, sauver de l\'empoisonnement)',
  },
  // ── CAPES ─────────────────────────────────────────────────────
  'cloak-displacement': {
    id: 'cloak-displacement', type: 'item', name: 'Cape de Déplacement',
    icon: 'https://bg3.wiki/w/images/0/02/Cloak_of_Displacement_Icon.png',
    description: 'Les ennemis ont désavantage sur tous leurs jets d\'attaque contre vous jusqu\'à ce qu\'ils vous touchent. Se réinitialise chaque tour. Meilleure cape défensive du jeu.',
    source: 'Acte 3 — Danthelon (Quartier des Feux, Baldur\'s Gate)',
  },
  'mantle-holy-warrior': {
    id: 'mantle-holy-warrior', type: 'item', name: 'Manteau du Saint Guerrier',
    icon: 'https://bg3.wiki/w/images/c/c9/Mantle_of_the_Holy_Warrior_Icon.png',
    description: 'Aura passive : les alliés dans un rayon de 9m infligent 1d4 dégâts radiants supplémentaires sans dépenser de slot de sort. Excellent en groupe.',
    source: 'Acte 3 — Humbletoes (Taverne du Canard Gras, Baldur\'s Gate)',
  },
  'cloak-protection': {
    id: 'cloak-protection', type: 'item', name: 'Cape de Protection',
    icon: 'https://bg3.wiki/w/images/4/4d/Cloak_of_Protection_Icon.png',
    description: '+1 à la CA et +1 à tous les jets de sauvegarde. Cape simple mais efficace disponible dès l\'Acte 2.',
    source: 'Acte 2 — Talli (camp des Tieffelins à Sombrecœur)',
  },
  // ── AMULETTES ─────────────────────────────────────────────────
  'amulet-greater-health': {
    id: 'amulet-greater-health', type: 'item', name: 'Amulette de Santé Supérieure',
    icon: 'https://bg3.wiki/w/images/8/8e/Amulet_of_Greater_Health_Icon.png',
    description: 'Fixe votre Constitution à 23 et octroie l\'avantage sur les jets de sauvegarde de Constitution. Élimine le besoin du don Résilience (CON). BiS amulette Acte 3.',
    source: 'Acte 3 — Maison de l\'Espoir (coffre ou butin)',
  },
  'amulet-surgeon': {
    id: 'amulet-surgeon', type: 'item', name: 'Amulette de Soumission du Chirurgien',
    icon: 'https://bg3.wiki/w/images/7/79/The_Surgeon%27s_Subjugation_Amulet_Icon.png',
    description: 'Lorsque vous infligez un coup critique, paralyse la cible (JS Constitution DD15, 1 fois par jour). Dévastateur contre les boss en Acte 2.',
    source: 'Acte 2 — Malus Thorm (Monastère d\'Auberosée)',
  },
  'amulet-savant': {
    id: 'amulet-savant', type: 'item', name: 'Amulette du Savant',
    icon: 'https://bg3.wiki/w/images/2/2c/Necklace_of_Elemental_Augmentation_Icon.png',
    description: 'Une fois par repos long, restaure un emplacement de sort de n\'importe quel niveau. Permet de récupérer un slot Smite de niveau élevé en combat.',
    source: 'Acte 3 — Marchands (Sorcière, Quartier des Feux)',
  },
  // ── ANNEAUX ───────────────────────────────────────────────────
  'ring-mystic-scoundrel': {
    id: 'ring-mystic-scoundrel', type: 'item', name: 'Anneau du Vaurien Mystique',
    icon: 'https://bg3.wiki/w/images/2/21/The_Mystic_Scoundrel_Icon.png',
    description: 'Après avoir touché un ennemi au corps à corps, le prochain sort d\'Illusion ou d\'Enchantement peut être lancé en Action Bonus. Transforme les Ténèbres en Action Bonus.',
    source: 'Acte 3 — Marchand dans la Jungle de Chult (Acte 3)',
  },
  'ring-killers-sweetheart': {
    id: 'ring-killers-sweetheart', type: 'item', name: 'Bien-aimée du Tueur',
    icon: 'https://bg3.wiki/w/images/0/09/The_Killer%27s_Sweetheart_Icon.png',
    description: 'Après avoir tué un ennemi, votre prochaine attaque est automatiquement un coup critique. Permet de déclencher un Châtiment Divin critique garanti.',
    source: 'Acte 2 — Gauntlet of Shar (anneau sur un cadavre)',
  },
  'ring-protection': {
    id: 'ring-protection', type: 'item', name: 'Anneau de Protection',
    icon: 'https://bg3.wiki/w/images/6/62/Ring_of_Protection_Icon.png',
    description: '+1 à la CA et +1 à tous les jets de sauvegarde. Anneau essentiel dès l\'Acte 1. Volé à Mol au camp des Tieffelins.',
    source: 'Acte 1 — Mol (vol de l\'Idole de Silvanus, camp Tieffelins)',
  },
  'ring-conduit': {
    id: 'ring-conduit', type: 'item', name: 'Anneau du Conduit Étrange',
    icon: 'https://bg3.wiki/w/images/0/0c/Strange_Conduit_Ring_Icon.png',
    description: 'Ajoute 1d4 dégâts psychiques à vos attaques lorsque vous maintenez la concentration sur un sort. Bon synergisme avec Bénédiction.',
    source: 'Acte 1 — Crèche Y\'llek (Githyanki)',
  },
  'ring-crusher': {
    id: 'ring-crusher', type: 'item', name: 'Anneau de Broyeur',
    icon: 'https://bg3.wiki/w/images/4/48/Crusher%27s_Ring_Icon.png',
    description: 'Augmente votre vitesse de déplacement de 3m. Simple mais utile pour Acte 1 pour atteindre les ennemis au corps à corps.',
    source: 'Acte 1 — Crusher (Camp Gobelin)',
  },
  // ── ÉLIXIRS SUPPLÉMENTAIRES ───────────────────────────────────
  'elixir-hill-giant': {
    id: 'elixir-hill-giant', type: 'consumable', name: 'Élixir de Force de Géant des Collines',
    icon: 'https://bg3.wiki/w/images/5/54/Elixir_of_Hill_Giant_Strength_Icon.png',
    action: 'Action',
    description: 'Fixe votre Force à 21 jusqu\'au repos long. Obligatoire niveaux 1-7 pour porter l\'armure lourde sans pénalité. Remplacé par le multiclassage Guerrier ou un meilleur équipement.',
    source: 'Alchimie / Marchands / Coffres',
  },
  'elixir-viciousness': {
    id: 'elixir-viciousness', type: 'consumable', name: 'Élixir de Viciosité',
    icon: 'https://bg3.wiki/w/images/3/3d/Elixir_of_Viciousness_Icon.png',
    action: 'Action',
    description: 'Réduit le seuil de critique de 1 (crits sur 19-20) jusqu\'au repos long. S\'empile avec le Casque cornu de Sarevok pour des crits sur 18-19-20.',
    source: 'Alchimie / Marchands',
  },
  'elixir-heroism': {
    id: 'elixir-heroism', type: 'consumable', name: 'Élixir d\'Héroïsme',
    icon: 'https://bg3.wiki/w/images/6/6c/Elixir_of_Heroism_Icon.png',
    action: 'Action',
    description: 'Octroie +10 PV temporaires et l\'état Béni (Bénédiction) jusqu\'au repos long. Excellent pour les gros combats de boss.',
    source: 'Alchimie / Marchands',
  },
};
