'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function EditUserPage() {
  const params = useParams()
  const router = useRouter()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    team: '',
    admin: false,
  })

  useEffect(() => {
    fetch(`/api/users/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          firstName: data.user.first_name,
          lastName: data.user.last_name,
          email: data.user.email,
          team: data.user.team || '',
          admin: data.user.admin,
        })
      })
  }, [params.id])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } =
      e.target

    setFormData({
      ...formData,
      [name]:
        type === 'checkbox'
          ? checked
          : value,
    })
  }

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    const res = await fetch(
      `/api/users/${params.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      }
    )

    if (res.ok) {
      router.push('/users')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 border p-6 rounded-xl"
      >
        <h1 className="text-2xl font-bold">
          Edytuj użytkownika
        </h1>

        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="team"
          value={formData.team}
          onChange={handleChange}
          placeholder="Zespół"
          className="w-full border p-3 rounded"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="admin"
            checked={formData.admin}
            onChange={handleChange}
          />

          Admin
        </label>

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded"
        >
          Zapisz zmiany
        </button>
      </form>
    </main>
  )
}