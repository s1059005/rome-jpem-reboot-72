import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollText, Calendar, GavelIcon, CheckCircle, XCircle } from 'lucide-react';
import { Loi } from '../../types/lois';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoiTimeline } from './LoiTimeline';
import { formatAnyGameDate } from './utils/dateHelpers';

export interface LoiDetailProps {
  loi: Loi;
  onEdit: () => void;
  onClose: () => void;
  relatedLois?: Loi[];
}

export const LoiDetail: React.FC<LoiDetailProps> = ({ 
  loi, 
  onClose, 
  onEdit,
  relatedLois = []
}) => {
  const formatVoteResults = () => {
    const votesFor = loi.votesPositifs || loi.votesFor || loi.votes?.pour || 0;
    const votesAgainst = loi.votesNégatifs || loi.votesAgainst || loi.votes?.contre || 0;
    const votesAbstain = loi.votesAbstention || loi.votes?.abstention || 0;
    
    const total = votesFor + votesAgainst + votesAbstain;
    
    if (total === 0) return "Aucun vote n'a été enregistré";
    
    const pourcentagePour = Math.round((votesFor / total) * 100);
    const pourcentageContre = Math.round((votesAgainst / total) * 100);
    
    return `${pourcentagePour}% pour, ${pourcentageContre}% contre`;
  };
  
  const getStatusIcon = () => {
    const status = loi.état || loi.status || loi.statut || '';
    
    if (status === 'Promulguée' || status === 'active' || status === 'adoptée' || status === 'promulguée') {
      return <CheckCircle className="h-4 w-4 mr-1" />;
    } else if (status === 'Rejetée' || status === 'rejected' || status === 'rejetée') {
      return <XCircle className="h-4 w-4 mr-1" />;
    } else {
      return <ScrollText className="h-4 w-4 mr-1" />;
    }
  };
  
  const getStatusVariant = () => {
    const status = loi.état || loi.status || loi.statut || '';
    
    if (status === 'Promulguée' || status === 'active' || status === 'adoptée' || status === 'promulguée') {
      return "outline";
    } else if (status === 'Rejetée' || status === 'rejected' || status === 'rejetée') {
      return "destructive";
    } else {
      return "secondary";
    }
  };
  
  const getLoiDate = (): string => {
    if (loi.dateProposition) {
      return formatAnyGameDate(loi.dateProposition);
    }
    if (loi.date) {
      return formatAnyGameDate(loi.date);
    }
    return '';
  };
  
  const getLoiTitle = (): string => {
    return loi.titre || loi.title || '';
  };
  
  const getLoiProposer = (): string => {
    return loi.proposeur || loi.proposedBy || loi.auteur || '';
  };
  
  const getLoiStatus = (): string => {
    return loi.état || loi.status || loi.statut || '';
  };
  
  const getLoiType = (): string => {
    return loi.type?.toString() || 'Politique';
  };
  
  const getLoiCategory = (): string => {
    return loi.catégorie || loi.category || loi.categorieId || '';
  };

  const renderClausesOrCommentaires = (items: string | string[] | undefined) => {
    if (!items) return null;
    
    const itemsArray = Array.isArray(items) ? items : [items];
    
    return (
      <ul className="list-disc list-inside space-y-1">
        {itemsArray.map((item, index) => (
          <li key={index} className="text-sm">{item}</li>
        ))}
      </ul>
    );
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Card className="mt-6">
        <CardHeader>
          <div className="flex justify-between items-start mb-2">
            <div>
              <CardTitle className="text-xl font-bold">{getLoiTitle()}</CardTitle>
              <CardDescription className="flex items-center gap-3 mt-1">
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {getLoiDate()}
                </span>
                <span className="flex items-center">
                  <GavelIcon className="h-4 w-4 mr-1" />
                  {getLoiProposer()}
                </span>
              </CardDescription>
            </div>
            <Badge variant={getStatusVariant() as any} className="flex items-center">
              {getStatusIcon()}
              {getLoiStatus()}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2 mt-1">
            <Badge variant="outline">{getLoiType()}</Badge>
            <Badge variant="outline">{getLoiCategory()}</Badge>
            <Badge variant="outline">Importance: {loi.importance || 'normale'}</Badge>
          </div>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="details">
            <TabsList className="mb-4">
              <TabsTrigger value="details">Détails</TabsTrigger>
              <TabsTrigger value="votes">Votes</TabsTrigger>
              <TabsTrigger value="history">Historique</TabsTrigger>
              <TabsTrigger value="related">Lois liées</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details">
              <div className="space-y-4">
                <div>
                  <h3 className="text-md font-medium mb-2">Description</h3>
                  <p className="text-sm text-muted-foreground">{loi.description}</p>
                </div>
                
                {loi.clauses && loi.clauses.length > 0 && (
                  <div>
                    <h3 className="text-md font-medium mb-2">Clauses principales</h3>
                    {renderClausesOrCommentaires(loi.clauses)}
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="votes">
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Pour</p>
                    <p className="text-2xl font-bold text-green-600">
                      {loi.votesPositifs || loi.votesFor || loi.votes?.pour || 0}
                    </p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Contre</p>
                    <p className="text-2xl font-bold text-red-600">
                      {loi.votesNégatifs || loi.votesAgainst || loi.votes?.contre || 0}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <p className="text-sm text-muted-foreground">Abstention</p>
                    <p className="text-2xl font-bold text-gray-500">
                      {loi.votesAbstention || loi.votes?.abstention || 0}
                    </p>
                  </div>
                </div>
                
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="text-md font-medium mb-2">Résultat</h3>
                  <p className="text-sm">{formatVoteResults()}</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Historique de la loi</CardTitle>
                </CardHeader>
                <CardContent>
                  <LoiTimeline lois={[loi]} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="related">
              <div>
                <h3 className="text-md font-medium mb-2">Lois liées</h3>
                {relatedLois.map((relatedLoi, index) => (
                  <div key={index} className="bg-muted p-3 rounded-lg">
                    <span className="text-sm">{relatedLoi.titre || relatedLoi.title || 'Loi inconnue'}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={onClose}>
              Fermer
            </Button>
            <Button onClick={onEdit}>
              Modifier
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
