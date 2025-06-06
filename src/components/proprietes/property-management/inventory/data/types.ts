export interface MarketPrice {
  resourceName: string;
  basePrice: number;
  currentPrice: number;
  buyPrice: number;
  sellPrice: number;
  trend: 'up' | 'down' | 'stable';
  volatility: number;
  trendPercentage?: number;
  resourceId?: string;
}

export interface PropertyResource {
  id: string;
  propertyId: number | string;
  name: string;
  type: string;
  quantity: number;
  quality?: 'low' | 'medium' | 'high';
  harvestDate?: string;
  expirationDate?: string;
  marketValue: number;
  unit?: string;
  value?: number;
  trend?: 'up' | 'down' | 'stable';
  trendPercentage?: number;
  category?: string;
  location?: string;
  lastUpdated?: string;
}

export interface ResourceTransaction {
  id: string;
  propertyId: string;
  resourceName: string;
  type: 'purchase' | 'sale' | 'harvest';
  quantity: number;
  price: number;
  total: number;
  date: string;
  unitPrice?: number;
  recipient?: string;
}

export interface ResourceInventoryProps {
  resources: PropertyResource[];
  propertyId?: number;
}

export interface ResourcesListProps {
  resources: PropertyResource[];
  propertyId?: number;
}

export interface MarketPricesProps {
  prices: MarketPrice[];
}

export interface ResourceTransactionsProps {
  transactions: ResourceTransaction[];
}

export interface Recipient {
  id: string;
  name: string;
  category: string;
  type?: string;
}

export type Resource = PropertyResource;
export type ResourceType = {
  id: string;
  name: string;
  unit: string;
  categories: string[];
};
export type Transaction = ResourceTransaction;
