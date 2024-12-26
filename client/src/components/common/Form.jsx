import { useCallback } from "react"
import {  useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation, useQuery } from "@tanstack/react-query"
import Spinner from "../ui/Spinner"

function Form({ id, yupSchema, apiEndpoints }) {
  const { handleSubmit, formState, control, reset, setValue, getValues } =
    useForm({
      resolver: yupResolver(yupSchema),
      defaultValues: {},
    })

  const formErrors = formState.errors

  const mutate_form = useMutation({
    mutationKey: [id ? apiEndpoints.UpdateOne.url : apiEndpoints.CreateOne.url],
    mutationFn: async (data) => {
      if (id) {
        return await service(apiEndpoints.UpdateOne, {
          data,
          payload: { id: id },
        })
      } else {
        return await service(apiEndpoints.CreateOne, { data })
      }
    },
    onSuccess: async (data) => {
     
    },
  })

  const error = mutate_form.error

  const onSubmit = useCallback(
    (values) => {
      const data = { ...values }
      mutate_form.mutate(data)
    },
    [mutate_form]
  )

  const {
    isLoading : queryLoading,
    error: queryError,
  } = useQuery({
    queryKey: [apiEndpoints.ReadOne.url, id],
    queryFn: async () => {
      const res = await service(apiEndpoints.ReadOne, {
        params: {
          id,
        },
      })
      const data = res?.data?.data
      reset(data)
      return data
    },
    enabled: !!id,
  })

  return (
    <>
      {(() => {
        if (queryLoading) {
          return <Spinner />
        }

        if (queryError) {
          return (
            <div className="flex justify-center">
              Error Fetching data
            </div>
          )
        }

        return (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-10 "
          >
            {children}
          </form>
        )
      })()}
    </>
  )
}

export default BlogForm
