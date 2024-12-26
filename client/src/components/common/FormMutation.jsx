import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { cn } from "../../utils/cn";

const FormMutation = ({
  formOptions = {},
  mutationOptions = {},
  queryOptions = {},
  className,
  children,
}) => {
  const formState = useForm(formOptions);

  const mutation = useMutation(mutationOptions);

  const query = useQuery(queryOptions);

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <form
      className={cn("w-full", className)}
      onSubmit={formState.handleSubmit(onSubmit)}
    >
      {children({
        formState: { ...formState, formErrors: formState.formState.errors },
        mutationState: mutation,
        queryState: query,
      })}
    </form>
  );
};

export default FormMutation;
