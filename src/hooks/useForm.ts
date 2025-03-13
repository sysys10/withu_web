'use client'
import { useState, useEffect, ChangeEvent, FormEvent } from 'react'

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
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setValues(prev => ({ ...prev, [name]: value }))
    // setErrors(prev => ({ ...prev, [name]: validate(values)[name] }))
  }
  const onBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target
    setErrors(prev => ({ ...prev, [name]: validate(values)[name] }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setErrors(validate(values))
  }

  useEffect(() => {
    const submitForm = async () => {
      if (isLoading) {
        if (Object.keys(errors).length === 0) {
          try {
            await onSubmit(values)
          } catch (error) {
            console.error('Form submission error:', error)
          }
        }
        setIsLoading(false)
      }
    }

    submitForm()
  }, [errors, isLoading, onSubmit, values])

  return {
    values,
    errors,
    isLoading,
    handleChange,
    handleSubmit,
    onBlur,
    setValues
  }
}

export default useForm
