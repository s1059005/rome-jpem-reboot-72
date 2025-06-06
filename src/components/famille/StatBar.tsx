
import React from 'react';
import { CharacterStat } from '@/types/character';
import { 
  Users, 
  MessageCircle, 
  Heart,
  Sword,
  GraduationCap,
  Award,
  Shield,
  ShieldOff,
  type LucideIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Map of stat icons to their respective Lucide components
const STAT_ICONS: Record<string, LucideIcon> = {
  popularity: Users,
  oratory: MessageCircle,
  piety: Heart,
  martialEducation: Sword,
  intelligence: GraduationCap,
  influence: Award,
  leadership: Shield
};

// Map of color names to their respective Tailwind classes
const COLOR_CLASSES: Record<string, string> = {
  red: 'bg-red-500',
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  yellow: 'bg-yellow-500',
  purple: 'bg-purple-500',
  terracotta: 'bg-rome-terracotta',
  navy: 'bg-rome-navy',
  gold: 'bg-rome-gold'
};

// Map of standardized descriptions for each stat type
const STAT_DESCRIPTIONS: Record<string, string> = {
  popularity: "Influence auprès du peuple et des citoyens romains",
  oratory: "Art de la persuasion et capacité à s'exprimer en public",
  piety: "Respect et dévotion envers les dieux de Rome",
  martialEducation: "Maîtrise des arts militaires et de la stratégie",
  intelligence: "Capacité d'analyse et de résolution de problèmes",
  influence: "Pouvoir et connexions au sein de la société romaine",
  leadership: "Capacité à diriger et inspirer les autres"
};

interface StatBarProps {
  stat: CharacterStat;
  disabled?: boolean;
  pietyBonus?: number;
}

const StatBar: React.FC<StatBarProps> = ({ stat, disabled = false, pietyBonus }) => {
  // Get the appropriate icon component
  const IconComponent = disabled ? ShieldOff : (STAT_ICONS[stat.icon] || STAT_ICONS.popularity);
  
  // Get the appropriate color class
  const colorClass = disabled ? 'bg-gray-400' : (COLOR_CLASSES[stat.color] || COLOR_CLASSES.blue);
  
  // Get standardized description (overriding the one provided in the stat object)
  const standardDescription = STAT_DESCRIPTIONS[stat.icon] || STAT_DESCRIPTIONS.popularity;
  
  // Calculate the total value including piety bonus if applicable
  const baseValue = stat.value;
  const totalValue = pietyBonus && !disabled ? Math.min(baseValue + pietyBonus, stat.maxValue) : baseValue;
  const percentage = disabled ? 0 : (totalValue / stat.maxValue) * 100;

  return (
    <div className="mb-1">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center gap-2">
          <div className={cn("p-1 rounded-full", disabled ? "bg-gray-200" : `bg-${stat.color}-100`)}>
            <IconComponent className="h-4 w-4 text-gray-700" />
          </div>
          <span className={cn("text-sm font-medium", disabled && "text-gray-500")}>{stat.name}</span>
        </div>
        <span className="text-sm font-medium">
          {disabled ? "N/A" : (
            <>
              {baseValue}
              {pietyBonus && !disabled && <span className="text-green-600">+{pietyBonus}</span>}
              /{stat.maxValue}
            </>
          )}
        </span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={cn("h-full rounded-full", colorClass)} 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground mt-1">
        {disabled ? "Non disponible pour les femmes romaines" : standardDescription}
        {pietyBonus && !disabled && <span className="text-green-600 ml-1">(Bonus de piété: +{pietyBonus})</span>}
      </p>
    </div>
  );
};

export default StatBar;
