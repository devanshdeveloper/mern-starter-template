import { useQuery } from "@tanstack/react-query";

const Await = ({ children , ...queryOptions }) => {
  const queryState = useQuery(queryOptions);

  // Ensure children is a function
  if (typeof children !== "function") {
    throw new Error("The children of <Await> must be a function.");
  }

  return <>{children(queryState)}</>;
};

export default Await;
