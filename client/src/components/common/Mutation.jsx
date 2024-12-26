import { useMutation } from "@tanstack/react-query";
const Mutation = ({ children, ...mutationOptions }) => {
  const mutationState = useMutation(mutationOptions);

  // Ensure children is a function
  if (typeof children !== "function") {
    throw new Error("The children of <Mutation> must be a function.");
  }

  return <>{children(mutationState)}</>;
};

export default Mutation;
