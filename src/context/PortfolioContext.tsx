import { createContext, useContext, useState, type ReactNode } from 'react';
import { type PortfolioData, loadData, saveData } from '../lib/portfolioData';

interface PortfolioContextType {
  data: PortfolioData;
  updateData: (data: PortfolioData) => void;
}

const PortfolioContext = createContext<PortfolioContextType>(null!);

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<PortfolioData>(loadData);

  const updateData = (newData: PortfolioData) => {
    saveData(newData);
    setData(newData);
  };

  return (
    <PortfolioContext.Provider value={{ data, updateData }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);
