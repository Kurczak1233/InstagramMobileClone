import React from "react";

type IAppStateContext = {
  setIsLoggedInMethod: () => void;
};

type IAppStateContextProvider = {
  children: React.ReactNode;
};

export const appStateContext = React.createContext<IAppStateContext>({
  setIsLoggedInMethod: () => null,
});

export const AppStateContextProvider = ({
  children,
}: IAppStateContextProvider) => {
  return (
    <appStateContext.Provider value={{ setIsLoggedInMethod: () => null }}>
      {children}
    </appStateContext.Provider>
  );
};
