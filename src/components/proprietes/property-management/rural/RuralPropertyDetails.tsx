
import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Coins, Wrench, Award, Users, Box } from 'lucide-react';
import { BuildingDescription } from '../../data/types/buildingTypes';
import { Card, CardContent } from '@/components/ui/card';

interface RuralPropertyDetailsProps {
  propertyDetails: BuildingDescription | null;
}

export const RuralPropertyDetails: React.FC<RuralPropertyDetailsProps> = ({ propertyDetails }) => {
  if (!propertyDetails) return null;

  return (
    <>
      <div className="mb-4">
        <h3 className="font-cinzel text-lg text-rome-navy mb-2">{propertyDetails.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{propertyDetails.description}</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <Label>Prix d'achat</Label>
            <div className="text-lg font-bold text-rome-navy flex items-center">
              <Coins className="h-4 w-4 mr-2 text-rome-gold" />
              {propertyDetails.initialCost.toLocaleString()} As
            </div>
          </div>
          <div className="space-y-2">
            <Label>Coûts d'exploitation</Label>
            <div className="text-lg font-bold text-rome-navy flex items-center">
              <Wrench className="h-4 w-4 mr-2 text-rome-gold" />
              {propertyDetails.maintenanceCost.toLocaleString()} As/an
            </div>
          </div>
          {propertyDetails.income > 0 && (
            <div className="space-y-2">
              <Label>Revenu annuel</Label>
              <div className="text-lg font-bold text-rome-navy flex items-center text-green-600">
                <Coins className="h-4 w-4 mr-2 text-green-600" />
                {propertyDetails.income.toLocaleString()} As/an
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Production section */}
      {propertyDetails.production && (
        <div className="mb-4">
          <h4 className="font-cinzel text-base text-rome-navy mb-2">Production</h4>
          <div className="rounded-md border border-rome-gold/30 p-3 bg-rome-parchment/50">
            <div className="flex items-center">
              <Box className="h-5 w-5 mr-2 text-rome-gold" />
              <div>
                <div className="text-sm">{propertyDetails.production.type}</div>
                <div className="font-bold text-rome-navy">{propertyDetails.production.amount} {propertyDetails.production.unit}/an</div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Slave management section */}
      {propertyDetails.slaves && (
        <div className="mb-4">
          <h4 className="font-cinzel text-base text-rome-navy mb-2">Besoins en esclaves</h4>
          <div className="rounded-md border border-rome-gold/30 p-3 bg-rome-parchment/50">
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <div className="text-xs text-muted-foreground">Minimum requis</div>
                <div className="font-bold">{propertyDetails.slaves.required} esclaves</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Optimal</div>
                <div className="font-bold">{propertyDetails.slaves.optimal} esclaves</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Profit maximum</div>
                <div className="font-bold">{propertyDetails.slaves.maxProfit.toLocaleString()} As</div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="mb-4">
        <h4 className="font-cinzel text-base text-rome-navy mb-2">Avantages</h4>
        <ul className="list-disc pl-5 space-y-1">
          {propertyDetails.advantages.map((advantage, index) => (
            <li key={index}>{advantage}</li>
          ))}
        </ul>
      </div>
      
      <div className="mt-6">
        <Button className="roman-btn w-full sm:w-auto">
          Acquérir le domaine
        </Button>
      </div>
    </>
  );
};
