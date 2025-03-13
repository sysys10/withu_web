'use client'
import { useState } from 'react'

export default function useForm<T>(initialForm: T) {
  const [form, setForm] = useState(initialForm)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  return { form, onChange }
}
