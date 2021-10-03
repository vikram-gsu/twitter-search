import React, { useContext } from "react";

interface FilterValueType {
  selectedHashTags: Set<string>;
  onHashTagClick: (currnetSelection:string) => void;
  clearHashTagSelection: ()=> void;
}
const FilterContext = React.createContext<FilterValueType|null>(null);

const useFilter = () => useContext(FilterContext);
type FilterProviderProps = {
  value: FilterValueType;
  children: React.ReactNode;
};
const FilterProvider = ({ value, children }: FilterProviderProps) => (
  <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
);
export { FilterProvider, useFilter };
