import React from "react";
import Spinner from "../ui/Spinner";

function RenderSuspense({
  error = null,
  isLoading = false,
  errorFallback = <div>{error?.message}</div>,
  loadingFallback = <Spinner />,
  children,
  data,
  level,
  notFoundFallback = <div>Data not found</div>,
}) {
  const errorFallbacks = {
    ["page"]: (
      <>
        <div>{error?.message}</div>
      </>
    ),
  };

  const loadingFallbacks = {
    ["page"]: (
      <>
        <Spinner />
      </>
    ),
  };
  const notFoundFallbacks = {
    ["page"]: (
      <>
        <div>Data not found</div>
      </>
    ),
  };

  errorFallback = errorFallback || errorFallbacks?.[level];
  loadingFallback = loadingFallback || loadingFallbacks?.[level];
  notFoundFallback = notFoundFallback || notFoundFallbacks?.[level];

  if (isLoading) {
    return loadingFallback;
  }

  if (error) {
    return errorFallback;
  }

  if (!data || data?.length === 0) {
    return notFoundFallback;
  }

  return children;
}

export default RenderSuspense;

function TableLayout({ children }) {
  return (
    <div className="h-[300px] flex items-center justify-center">{children}</div>
  );
}
