import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

import { Navigation } from "./src/components/Navigation/Navigation";

export const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Navigation />
    </QueryClientProvider>
  );
}
