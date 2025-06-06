
import { useState } from 'react';
import { useMaitreJeu } from '../../../context';
import { Client, ClientCreationData } from '../../../types/clients';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

export function useClientActions() {
  const { 
    clients, 
    addClient, 
    updateClient, 
    deleteClient: removeClient,
    clientTypes = ['patron', 'client', 'ally', 'enemy', 'neutral'],
    updateClientCompetences,
    currentDate,
    senateurs = []
  } = useMaitreJeu();
  
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Helper for working with current date
  const currentYear = typeof currentDate === 'object' && 'year' in currentDate 
    ? currentDate.year 
    : new Date().getFullYear();
  
  // Handle client selection
  const selectClient = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    if (client) {
      setSelectedClient(client);
    }
  };
  
  // Add a new client
  const createClient = (clientData: Omit<ClientCreationData, "id">) => {
    setIsLoading(true);
    
    try {
      const newClient: Client = {
        id: uuidv4(),
        ...clientData,
        competences: clientData.competences || [],
        competencePoints: clientData.competencePoints || 0,
      };
      
      addClient(newClient);
      
      toast.success(`Client ${clientData.name} ajouté avec succès`);
      return newClient.id;
    } catch (error) {
      console.error('Error creating client:', error);
      toast.error('Erreur lors de la création du client');
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update client details
  const editClient = (clientId: string, clientData: Partial<Client>) => {
    setIsLoading(true);
    
    try {
      updateClient({
        ...clients.find(c => c.id === clientId),
        ...clientData,
        id: clientId
      });
      
      if (selectedClient?.id === clientId) {
        setSelectedClient(prev => prev ? { ...prev, ...clientData } : null);
      }
      
      toast.success(`Client mis à jour avec succès`);
      return true;
    } catch (error) {
      console.error('Error updating client:', error);
      toast.error('Erreur lors de la mise à jour du client');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Delete a client
  const deleteClient = (clientId: string) => {
    setIsLoading(true);
    
    try {
      removeClient(clientId);
      
      if (selectedClient?.id === clientId) {
        setSelectedClient(null);
      }
      
      toast.success(`Client supprimé avec succès`);
      return true;
    } catch (error) {
      console.error('Error deleting client:', error);
      toast.error('Erreur lors de la suppression du client');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update client competences
  const updateCompetences = (clientId: string, competences: string[]) => {
    setIsLoading(true);
    
    try {
      if (updateClientCompetences) {
        updateClientCompetences(clientId, competences);
      } else {
        // Fallback if direct method not available
        const client = clients.find(c => c.id === clientId);
        if (client) {
          updateClient({
            ...client,
            competences
          });
        }
      }
      
      if (selectedClient?.id === clientId) {
        setSelectedClient(prev => prev ? { ...prev, competences } : null);
      }
      
      toast.success(`Compétences mises à jour`);
      return true;
    } catch (error) {
      console.error('Error updating competences:', error);
      toast.error('Erreur lors de la mise à jour des compétences');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle client status change
  const handleStatusChange = (clientId: string, status: string) => {
    return editClient(clientId, { status });
  };
  
  // Handle client assignment to senator
  const handleAssignment = (clientId: string, senateurId: string) => {
    return editClient(clientId, { 
      assignedTo: senateurId,
      assignedToSenateurId: senateurId 
    });
  };
  
  return {
    clients,
    selectedClient,
    selectClient,
    createClient,
    editClient,
    deleteClient,
    updateCompetences,
    handleStatusChange,
    handleAssignment,
    isLoading,
    clientTypes,
    currentYear,
    senateurs
  };
}
