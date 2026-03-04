/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Types globaux pour le projet
declare module '*.mdx' {
  import type { MarkdownLayoutProps } from 'astro';
  export const frontmatter: MarkdownLayoutProps<Record<string, unknown>>['frontmatter'];
  export default function Layout(props: MarkdownLayoutProps<Record<string, unknown>>): JSX.Element;
}

// Type pour le frontmatter de nos pages MDX
export interface PageFrontmatter {
  title: string;
  description: string;
  section: 'playthrough' | 'grimoire' | 'dashboard';
  act?: 1 | 2 | 3;
  part?: number;       // ex: 4 pour partie4
  order?: number;      // ordre dans la nav
  icon?: string;       // nom icône Lucide
  checklistCount?: number;  // pour le progress tracker
  draft?: boolean;
}
