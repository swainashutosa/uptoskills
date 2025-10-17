import React, { createContext, useContext, useState } from 'react';

const ContestContext = createContext();

export const useContest = () => {
  const context = useContext(ContestContext);
  if (!context) {
    throw new Error('useContest must be used within a ContestProvider');
  }
  return context;
};

const ContestProvider = ({ children }) => {
  const [contestData, setContestData] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
    image: null,
    bonusPrize: '',
    notes: '',
    violations: '',
    reportRewards: '',
    coinDistribution: '',
    maxAttempts: '',
    subquestions: [{ sub_title: '', sub_description: '', example_input: '', example_output: '', recursive_logic: '' }],
  });

  const updateContestData = (updates) => {
    setContestData(prev => ({ ...prev, ...updates }));
  };

  return (
    <ContestContext.Provider value={{ contestData, updateContestData }}>
      {children}
    </ContestContext.Provider>
  );
};

export default ContestProvider;
