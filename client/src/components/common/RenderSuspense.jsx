import React from "react";
import Spinner from "../ui/Spinner";

function RenderSuspense({
  error = null,
  isLoading = false,
  errorFallback = <div>{error?.message}</div>,
  loadingFallback = <Spinner />,
  children,
  data,
  notFoundFallback = <div>Data not found</div>,
}) {
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
