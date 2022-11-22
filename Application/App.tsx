import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

import { Navigation } from "./src/components/Navigation/Navigation";
import { AppStateContextProvider } from "./src/contexts/AppStateContextProvider";

export const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppStateContextProvider>
        <Navigation />
      </AppStateContextProvider>
    </QueryClientProvider>
  );
}
