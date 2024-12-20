import React from "react";

const Await = ({ queryKeys, queryFunc, options = {}, children }) => {
  const queryState = useQuery(queryKeys, queryFunc, options);

  // Ensure children is a function
  if (typeof children !== "function") {
    throw new Error("The children of <Await> must be a function.");
  }

  return <>{children(queryState)}</>;
};

export default Await;
