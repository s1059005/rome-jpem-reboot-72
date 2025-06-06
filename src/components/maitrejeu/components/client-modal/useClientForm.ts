
import { useState, useEffect } from 'react';
import { ClientCreationData, Client, ClientInfluences, ClientType } from '../../types/clients';

export const useClientForm = (client: Client | null) => {
  const isEditMode = !!client;
  
  const [formData, setFormData] = useState<ClientCreationData>({
    name: '',
    type: 'standard',
    subType: '',
    location: 'Forum',
    loyalty: 'moyenne',
    age: 30,
    status: 'active',
    influence: 1,
    income: 0,
    cost: 0,
    assignedTo: null,
    influences: {
      political: 1,
      popular: 1,
      religious: 1
    },
    specialAbilities: [],
    competencePoints: 3,
    competences: [], // Default empty array for competences
    backstory: '',
    activeStatus: 'active',
    relationshipLevel: 1,
    lastInteraction: new Date().toISOString()
  });
  
  useEffect(() => {
    // Initialize form with client data in edit mode
    if (client) {
      setFormData({
        name: client.name,
        type: client.type,
        subType: client.subType || '',
        location: client.location || 'Forum',
        loyalty: client.loyalty || 'moyenne',
        status: client.status || 'active',
        age: client.age || 30,
        influence: client.influence || 1,
        income: client.income || 0,
        cost: client.cost || 0,
        assignedTo: client.assignedTo || null,
        influences: client.influences || {
          political: 1,
          popular: 1,
          religious: 1
        },
        specialAbilities: client.specialAbility ? [client.specialAbility] : [],
        competencePoints: client.competencePoints || 3,
        competences: client.competences || [],
        backstory: client.backstory || '',
        activeStatus: client.activeStatus || 'active',
        relationshipLevel: client.relationshipLevel || 1,
        lastInteraction: client.lastInteraction || new Date().toISOString(),
        assignedToSenateurId: client.assignedToSenateurId
      });
    }
  }, [client]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleInfluenceChange = (type: 'political' | 'popular' | 'religious', value: string) => {
    const influences = formData.influences || { political: 1, popular: 1, religious: 1 };
    
    setFormData(prev => ({
      ...prev,
      influences: {
        ...influences,
        [type]: parseInt(value) || 1
      }
    }));
  };
  
  const handleAddCompetence = (competence: string) => {
    if (!competence) return;
    
    setFormData(prev => ({
      ...prev,
      competences: [...(prev.competences || []), competence]
    }));
  };
  
  const handleRemoveCompetence = (index: number) => {
    setFormData(prev => {
      const newCompetences = [...(prev.competences || [])];
      newCompetences.splice(index, 1);
      return {
        ...prev,
        competences: newCompetences
      };
    });
  };
  
  return {
    isEditMode,
    formData,
    handleChange,
    handleSelectChange,
    handleInfluenceChange,
    handleAddCompetence,
    handleRemoveCompetence
  };
};
