
import { GameDate } from '@/utils/types/gameDate';

export interface Evenement {
  id: string;
  title: string;
  description: string;
  date: Date | GameDate;
  type: string;
  importance: string;
  resolved?: boolean;
  impact?: Record<string, number>;
  endDate?: Date | GameDate;
  nom?: string;
  tags?: string[];
  actions?: any[];
  
  // Additional fields needed for compatibility
  options?: any[];
  titre?: string;
}

export type EvenementType = 'POLITIQUE' | 'ECONOMIE' | 'SOCIAL' | 'MILITAIRE' | 'RELIGION';
export type ImportanceType = 'faible' | 'normale' | 'haute' | 'critique';

export interface EvenementAction {
  id: string;
  texte: string;
  label: string;
  effets: Record<string, any>;
  consequence: string;
  description?: string;
}
