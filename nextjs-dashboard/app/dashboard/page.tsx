'use client'

import { useState } from 'react'
import Sidebar from '../components/sidebar'

export default function DashboardPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    personOrTeam: '',
    dueDate: '',
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
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

    await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(formData),
    })

    setFormData({
      title: '',
      description: '',
      personOrTeam: '',
      dueDate: '',
    })
  }

  return (
    <main className="min-h-screen flex">
      <Sidebar />

      <section className="flex-1 p-10">
        <h2 className="text-3xl font-bold mb-8">
          Dodaj zadanie
        </h2>

        <form
          onSubmit={handleSubmit}
          className="max-w-2xl space-y-4"
        >
          <input
            type="text"
            name="title"
            placeholder="Nazwa zadania"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <textarea
            name="description"
            placeholder="Opis zadania"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-3 rounded min-h-32"
          />

          <input
            type="text"
            name="personOrTeam"
            placeholder="Przypisana osoba lub zespół"
            value={formData.personOrTeam}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            className="border px-6 py-3 rounded"
          >
            Dodaj zadanie
          </button>
        </form>
      </section>
    </main>
  )
}