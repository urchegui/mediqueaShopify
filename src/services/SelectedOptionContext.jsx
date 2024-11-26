import { createContext, useState, useContext } from 'react';

const SelectedOptionContext = createContext();

export const useSelectedOption = () => useContext(SelectedOptionContext);

export const SelectedOptionProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <SelectedOptionContext.Provider value={{ selectedOption, setSelectedOption }}>
      {children}
    </SelectedOptionContext.Provider>
  );
};