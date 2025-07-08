
import { ReactNode } from 'react';

export interface NavItem {
  title: string;
  path: string;
  visible: boolean;
  icon?: ReactNode;
}

export type NavItemSection = 'primary' | 'secondary';
