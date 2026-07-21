import type { Page } from "@jsp/shared/types";
import { PageTitle } from "@/comps";
import { ProductsList } from "./ProductsList";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const page: Page = {
  title: "Products",
  breadcrumb: [
    { label: "Dashboard" },
    { label: "Catalog" },
    { label: "Product List w/ TanStack Infinite Query" },
  ],
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      gcTime: process.env.NODE_ENV === "development" ? 0 : 5 * 60 * 1000,
      retry: 2,
    },
  },
});

export default function ProductsPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <section>
        <PageTitle page={page} />
        <ProductsList />
      </section>

      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
