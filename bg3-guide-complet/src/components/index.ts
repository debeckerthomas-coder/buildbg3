// src/components/index.ts
// Barrel export — importe tout depuis ici dans les fichiers MDX
//
// Usage MDX :
//   import { Checklist, Tooltip, Encart, LootItem, StatBlock, StatRow, CalloutBlock } from '@/components';

// ── Composants React (îlots interactifs) ───────────────────────
export { default as Checklist }   from './Checklist';
export { default as Tooltip }     from './Tooltip';
export { default as GlobalProgress } from './GlobalProgress';

// Note : les composants Astro ne peuvent pas être exportés depuis un barrel TS
// Ils sont importés directement dans chaque .astro ou .mdx :
//   import Encart from '@/components/Encart.astro';
//   import LootItem from '@/components/LootItem.astro';
//   etc.

// ── Types réexportés ────────────────────────────────────────────
export type { ChecklistItem, ChecklistGroup } from './Checklist';
