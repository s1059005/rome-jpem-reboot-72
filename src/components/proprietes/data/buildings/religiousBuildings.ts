
import { BuildingDescription } from '../types/buildingTypes';

// Bâtiments religieux
export const religiousBuildings: Record<string, BuildingDescription> = {
  autel: {
    id: "autel",
    name: "Autel",
    description: "Structure sacrée dédiée aux dieux domestiques, manifestant votre piété envers les divinités romaines.",
    advantages: [
      "Démontre votre dévotion religieuse",
      "Favorise les présages positifs",
      "Peu coûteux mais efficace"
    ],
    initialCost: 5000,
    maintenanceCost: 500,
    prestige: 5,
    piete: 10,
    slaves: {
      required: 1,
      optimal: 2,
      maxProfit: 0 // Pas de profit direct
    }
  },
  statuaire: {
    id: "statuaire",
    name: "Statuaire",
    description: "Ensemble de statues dédiées aux divinités, installées dans un espace public, affirmant votre dévotion religieuse.",
    advantages: [
      "Visibilité de votre piété",
      "Attire la faveur des prêtres",
      "Embellit l'espace public"
    ],
    initialCost: 15000,
    maintenanceCost: 800,
    prestige: 10,
    piete: 20,
    slaves: {
      required: 2,
      optimal: 3,
      maxProfit: 0 // Pas de profit direct
    }
  },
  temple: {
    id: "temple",
    name: "Temple",
    description: "Édifice religieux consacré à une divinité majeure, contribution significative à la vie religieuse de Rome.",
    advantages: [
      "Influence religieuse majeure",
      "Possibilité de sacerdoce",
      "Centre de vie spirituelle"
    ],
    initialCost: 80000,
    maintenanceCost: 4000,
    prestige: 25,
    piete: 40,
    slaves: {
      required: 5,
      optimal: 8,
      maxProfit: 0 // Pas de profit direct
    }
  }
};
