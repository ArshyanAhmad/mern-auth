import { createContext } from "react";

export const AppContect = createContext();

export const AppContextProvider = (props) => {
   const value = {};

   return (
      <AppContect.Provider value={value}>{props.children}</AppContect.Provider>
   );
};
