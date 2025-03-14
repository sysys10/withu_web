'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'

// useForm 타입 정의
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

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    await new Promise(r => setTimeout(r, 1000))
    await onSubmit(values)
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
