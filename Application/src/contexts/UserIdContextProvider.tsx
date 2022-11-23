import React from "react";

type IUserIdStateContext = {
  userId: string;
};

type IUserIdStateContextProvider = {
  children: React.ReactNode;
};

export const userIdStateContext = React.createContext<IUserIdStateContext>({
  userId: "",
});

export const UserIdContextProvider = ({
  children,
}: IUserIdStateContextProvider) => {
  return (
    <userIdStateContext.Provider value={{ userId: "" }}>
      {children}
    </userIdStateContext.Provider>
  );
};
