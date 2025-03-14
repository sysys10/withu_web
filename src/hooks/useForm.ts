'use client'

import { ChangeEvent, FormEvent, useState } from 'react'

type FormErrors<T> = {
  [K in keyof T]?: string
}

interface UseFormProps<T> {
  initialValues: T
  onSubmit: (values: T) => Promise<void> | void
  validate: (values: T) => FormErrors<T>
}

function useForm<T extends Record<string, any>>({ initialValues, onSubmit, validate }: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<FormErrors<T>>({})

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const newValues = { ...values, [name]: value }
    setValues(newValues)
    setErrors(prev => ({ ...prev, [name]: validate(newValues)[name] }))
  }
  const onBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target
    setErrors(prev => ({ ...prev, [name]: validate(values)[name] }))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (
      Object.values(errors).every(error => error === undefined) &&
      Object.values(values).every(value => value !== '')
    ) {
      console.log('submit')
      onSubmit(values)
    } else {
      setErrors(prev => ({ ...prev, ...validate(values) }))
    }
  }

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    onBlur,
    setValues
  }
}

export default useForm
