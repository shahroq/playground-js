import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { pause } from "@jsp/shared/utils";
import { Skeleton, Alert, Item } from "@jsp/shared/comps";

const API_BASE_URL = "http://localhost:3009";
const PAGE_LIMIT = 2;

async function getProducts({ pageParam = 1 }) {
  await pause(1500);

  const { data } = await axios.get(`${API_BASE_URL}/products`, {
    params: {
      _page: pageParam,
      _per_page: PAGE_LIMIT,
    },
  });

  return {
    products: data.data,
    currentPage: pageParam,
    totalPages: data.pages,
  };
}

export function ProductsList() {
  const {
    data,
    error,
    isPending,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      // console.log(lastPage);
      return lastPage.currentPage < lastPage.totalPages
        ? lastPage.currentPage + 1
        : undefined;
    },
  });

  // Sentinel element placed at the bottom of the list; when it scrolls
  // into view we trigger the next page fetch automatically.
  const sentinelRef = useRef(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: "200px" }, // start loading a bit before it's fully visible
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending) return <Skeleton times={PAGE_LIMIT} height="h-15" />;

  if (isError) {
    const message =
      error instanceof Error ? error.message : "Something went wrong.";
    return <Alert variant="warning">{message}</Alert>;
  }

  return (
    <>
      <div className="flex gap-1 justify-between">
        <h3>Products</h3>
      </div>

      <hr />

      <ul className="space-y-5 pb-1">
        {data.pages.map((page) =>
          page.products.map((product) => (
            <Item as="li" key={product.id} className="border py-5">
              <Item.Content>
                <Item.Title>{product.name}</Item.Title>
                <Item.Description>
                  {`${product.description} [${product.id}]`}
                </Item.Description>
              </Item.Content>
            </Item>
          )),
        )}
      </ul>

      {/* Invisible marker the observer watches; also shows status text */}
      <div ref={sentinelRef}>
        {isFetchingNextPage ? (
          <Skeleton times={PAGE_LIMIT} height="h-15" />
        ) : hasNextPage ? (
          ""
        ) : (
          "No more products"
        )}
      </div>
    </>
  );
}
