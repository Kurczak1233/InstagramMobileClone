import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

import { Navigation } from "./src/components/Navigation/Navigation";
import { UserIdContextProvider } from "./src/contexts";
import { AppStateContextProvider } from "./src/contexts/AppStateContextProvider";

export const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppStateContextProvider>
        <UserIdContextProvider>
          <Navigation />
        </UserIdContextProvider>
      </AppStateContextProvider>
    </QueryClientProvider>
  );
}
