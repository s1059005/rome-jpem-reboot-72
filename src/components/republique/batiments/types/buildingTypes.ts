
export interface PublicBuilding {
  id: string;
  buildingTypeId: string;
  name: string;
  location: string;
  constructionYear: number;
  condition: number; // 0-100
  maintenanceCost: number;
  maintenanceLevel: 'minimal' | 'normal' | 'excellent';
  lastMaintenance?: number; // année de dernière maintenance
  benefits: string[]; // Ensure this property exists
  capacity?: number;
  investmentAmount: number;
  constructionStatus: 'planned' | 'in_progress' | 'completed' | 'damaged' | 'abandoned';
  constructionProgress?: number; // 0-100
  image?: string;
  population?: number; // Ensure this property exists
  revenueGeneration?: number;
  employmentCapacity?: number;
  publicApproval?: number;
  type?: string;
  level?: string;
  effects?: Record<string, number>;
}

export interface ConstructionProject {
  id: string;
  buildingTypeId: string;
  name: string;
  location: string;
  estimatedCost: number;
  duration: number; // en années
  progress: number; // 0-100
  startedYear?: number;
  expectedCompletionYear?: number;
  benefits: string[];
  sponsors: string[];
  approved: boolean;
  proposedBy?: string; // Magistrat qui a proposé le projet
  requiredResources?: {
    stone?: number;
    timber?: number;
    marble?: number;
    labor?: number;
  };
}

export interface BuildingType {
  id: string;
  name: string;
  category: 'administrative' | 'religious' | 'entertainment' | 'infrastructure' | 'military' | 'commercial';
  description: string;
  baseCost: number;
  maintenanceMultiplier: number;
  benefits: string[];
  prerequisites?: string[];
  image?: string;
}

export interface BuildingStatistics {
  totalBuildings: number;
  totalInvestment: number;
  averageCondition: number;
  byCategory: Record<string, number>;
  buildingsByStatus: Record<string, number>;
  totalMaintenanceCost: number;
  publicApprovalAverage: number;
}

export interface RepublicResource {
  id: string;
  name: string;
  amount: number;
  unit: string;
  value: number; // Valeur par unité en As
  source: string;
  lastUpdated: number; // Année
}
