import { useState, useEffect, useMemo } from 'react';
import { useMaitreJeu } from '@/components/maitrejeu/context';
import { 
  EconomieRecord, 
  EconomieFilter, 
  EconomieSort,
  EconomieCreationData,
  ECONOMIE_CATEGORIES,
  TreasuryStatus,
  ECONOMIE_TYPES
} from '@/components/maitrejeu/types/economie';
import { GameDate, parseStringToGameDate } from '@/components/maitrejeu/types/common';
import { toast } from 'sonner';

const DEFAULT_FILTER: EconomieFilter = {
  searchTerm: '',
  category: [] as ECONOMIE_CATEGORIES[],
  types: ECONOMIE_TYPES.INCOME
};

const DEFAULT_SORT: EconomieSort = {
  field: 'date',
  direction: 'desc'
};

const parseGameDate = (date: GameDate | Date | string): GameDate | Date => {
  if (typeof date === 'string') {
    try {
      return parseStringToGameDate(date);
    } catch (e) {
      return new Date(date);
    }
  }
  return date;
};

export const useEconomieManagement = () => {
  const { 
    economieRecords, 
    treasury,
    setTreasury,
    economicFactors, 
    setEconomicFactors,
    addEconomieRecord,
    updateEconomieRecord,
    deleteEconomieRecord,
    currentDate
  } = useMaitreJeu();
  
  const [filter, setFilter] = useState<EconomieFilter>(DEFAULT_FILTER);
  const [sort, setSort] = useState<EconomieSort>(DEFAULT_SORT);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<EconomieRecord | undefined>(undefined);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isProjectionOpen, setIsProjectionOpen] = useState(false);
  
  const filterRecords = (records: EconomieRecord[], filter: EconomieFilter): EconomieRecord[] => {
    return records.filter(record => {
      if (filter.searchTerm && !Object.values(record).some(value => 
        typeof value === 'string' && value.toLowerCase().includes(filter.searchTerm.toLowerCase())
      )) {
        return false;
      }
      
      // Filtrer par catégorie si spécifié
      if (filter.category && 
         ((Array.isArray(filter.category) && filter.category.length > 0) || 
          (!Array.isArray(filter.category) && filter.category !== 'all'))) {
        if (Array.isArray(filter.category)) {
          if (!filter.category.includes(record.category) && !filter.category.includes('all')) {
            return false;
          }
        } else if (filter.category !== 'all' && record.category !== filter.category) {
          return false;
        }
      }
      
      // Filtrer par type si spécifié
      if (filter.types && filter.types !== 'all' && record.type !== filter.types) {
        return false;
      }
      
      // Filtrer par entité affectée
      if (filter.affectedEntity && filter.affectedEntity !== 'all') {
        if (filter.affectedEntity === 'senateur' && !record.affectedSenateurId) {
          return false;
        }
        if (filter.affectedEntity === 'province' && !record.affectedProvinceId) {
          return false;
        }
      }
      
      // Filtrer par montant
      if (filter.minAmount !== undefined && record.amount < filter.minAmount) {
        return false;
      }
      
      if (filter.maxAmount !== undefined && record.amount > filter.maxAmount) {
        return false;
      }
      
      // Filtrer par plage de date
      if (filter.dateRange) {
        if (filter.dateRange.start) {
          const recordDate = parseGameDate(record.date);
          const startDate = filter.dateRange.start;
          
          if (recordDate instanceof Date && startDate instanceof Date) {
            if (recordDate < startDate) return false;
          } else if ('year' in recordDate && 'year' in startDate) {
            if (recordDate.year < startDate.year) return false;
            if (recordDate.year === startDate.year) {
              const seasonOrder: Record<string, number> = {
                'SPRING': 0, 'SUMMER': 1, 'AUTUMN': 2, 'WINTER': 3,
                'Ver': 0, 'Aestas': 1, 'Autumnus': 2, 'Hiems': 3
              };
              
              const recordSeason = seasonOrder[String(recordDate.season)] || 0;
              const startSeason = seasonOrder[String(startDate.season)] || 0;
              
              if (recordSeason < startSeason) return false;
            }
          }
        }
        
        if (filter.dateRange.end) {
          const recordDate = parseGameDate(record.date);
          const endDate = filter.dateRange.end;
          
          if (recordDate instanceof Date && endDate instanceof Date) {
            if (recordDate > endDate) return false;
          } else if ('year' in recordDate && 'year' in endDate) {
            if (recordDate.year > endDate.year) return false;
            if (recordDate.year === endDate.year) {
              const seasonOrder: Record<string, number> = {
                'SPRING': 0, 'SUMMER': 1, 'AUTUMN': 2, 'WINTER': 3,
                'Ver': 0, 'Aestas': 1, 'Autumnus': 2, 'Hiems': 3
              };
              
              const recordSeason = seasonOrder[String(recordDate.season)] || 0;
              const endSeason = seasonOrder[String(endDate.season)] || 0;
              
              if (recordSeason > endSeason) return false;
            }
          }
        }
      }
      
      return true;
    });
  };
  
  const sortRecords = (records: EconomieRecord[], sort: EconomieSort): EconomieRecord[] => {
    return [...records].sort((a, b) => {
      const field = sort.field;
      
      if (field === 'date') {
        const dateA = parseGameDate(a.date);
        const dateB = parseGameDate(b.date);
        
        if (dateA instanceof Date && dateB instanceof Date) {
          return sort.direction === 'asc' ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
        }
        
        if ('year' in dateA && 'year' in dateB) {
          const yearA = dateA.year;
          const yearB = dateB.year;
          
          if (yearA !== yearB) {
            return sort.direction === 'asc' ? yearA - yearB : yearB - yearA;
          }
          
          const seasonOrder: Record<string, number> = {
            'SPRING': 0, 'SUMMER': 1, 'AUTUMN': 2, 'WINTER': 3,
            'Ver': 0, 'Aestas': 1, 'Autumnus': 2, 'Hiems': 3
          };
          
          const seasonA = seasonOrder[String(dateA.season)] || 0;
          const seasonB = seasonOrder[String(dateB.season)] || 0;
          
          return sort.direction === 'asc' ? seasonA - seasonB : seasonB - seasonA;
        }
        
        // Fallback
        return 0;
      }
      
      const valueA = a[field as keyof EconomieRecord];
      const valueB = b[field as keyof EconomieRecord];
      
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sort.direction === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return sort.direction === 'asc' ? valueA - valueB : valueB - valueA;
      }
      
      return 0;
    });
  };
  
  const filteredAndSortedRecords = useMemo(() => {
    const filtered = filterRecords(economieRecords, filter);
    return sortRecords(filtered, sort);
  }, [economieRecords, filter, sort]);
  
  const handleFilterChange = (newFilter: Partial<EconomieFilter>) => {
    setFilter(prev => ({
      ...prev,
      ...newFilter
    }));
  };
  
  const handleResetFilters = () => {
    setFilter(DEFAULT_FILTER);
  };
  
  const handleSortChange = (field: keyof EconomieRecord) => {
    setSort(prevSort => ({
      field: field as EconomieSort['field'],
      direction: prevSort.field === field && prevSort.direction === 'asc' ? 'desc' : 'asc'
    }));
  };
  
  const handleAddTransaction = () => {
    setSelectedRecord(undefined);
    setIsModalOpen(true);
  };
  
  const handleEditTransaction = (id: string) => {
    const record = economieRecords.find(r => r.id === id);
    if (record) {
      setSelectedRecord(record);
      setIsModalOpen(true);
    }
  };
  
  const handleDeleteTransaction = (id: string) => {
    deleteEconomieRecord(id);
    toast.success('Transaction supprimée avec succès');
  };
  
  const handleSaveTransaction = (data: EconomieCreationData) => {
    if (selectedRecord) {
      updateEconomieRecord(selectedRecord.id, data);
      toast.success('Transaction mise à jour avec succès');
    } else {
      addEconomieRecord(data);
      toast.success('Transaction ajoutée avec succès');
    }
    setIsModalOpen(false);
  };
  
  const handleGenerateReport = () => {
    setIsReportOpen(true);
  };
  
  const handleCalculateProjections = () => {
    setIsProjectionOpen(true);
  };
  
  const updateTreasuryBalance = (newBalance: number) => {
    setTreasury((prev: TreasuryStatus) => ({
      ...prev,
      balance: newBalance
    }));
  };
  
  const handleRefreshData = () => {
    const totalIncome = economieRecords
      .filter(r => r.type === ECONOMIE_TYPES.INCOME)
      .reduce((sum, r) => sum + r.amount, 0);
      
    const totalExpenses = economieRecords
      .filter(r => r.type === ECONOMIE_TYPES.EXPENSE)
      .reduce((sum, r) => sum + r.amount, 0);
      
    updateTreasuryBalance(totalIncome - totalExpenses);
    toast.success('Données économiques actualisées');
  };
  
  return {
    economieRecords: filteredAndSortedRecords,
    filter,
    sort,
    isModalOpen,
    selectedRecord,
    isReportOpen,
    isProjectionOpen,
    treasury,
    economicFactors,
    handleFilterChange,
    handleResetFilters,
    handleSortChange,
    handleAddTransaction,
    handleEditTransaction,
    handleDeleteTransaction,
    handleSaveTransaction,
    handleGenerateReport,
    handleCalculateProjections,
    handleRefreshData,
    setIsModalOpen,
    setIsReportOpen,
    setIsProjectionOpen,
    updateTreasuryBalance
  };
};
