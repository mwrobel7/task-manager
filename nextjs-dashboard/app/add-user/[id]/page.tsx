'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

export default function AddUserPage() {
  const params = useParams()
  const router = useRouter()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    team: '',
  })

  useEffect(() => {
    fetch(`/api/temporary-users/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          firstName: data.user.first_name,
          lastName: data.user.last_name,
          email: data.user.email,
          team: '',
        })
      })
  }, [params.id])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    const res = await fetch(
      `/api/approve-user/${params.id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
    )

    if (res.ok) {
      router.push('/admin-dashboard')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-4 border p-6 rounded-xl"
      >
        <h1 className="text-2xl font-bold">
          Dodaj użytkownika
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
          placeholder="Zespół"
          value={formData.team}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="rounded p-5"
style={{
  background: 'var(--card)',
}}
        >
          Zatwierdź użytkownika
        </button>
      </form>
    </main>
  )
}