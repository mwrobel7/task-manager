'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type TempUser = {
  id: number
  first_name: string
  last_name: string
  email: string
}

export default function AdminDashboardPage() {
  const [users, setUsers] = useState<TempUser[]>([])

  const [formData, setFormData] = useState({
  title: '',
  description: '',
  personOrTeam: '',
  dueDate: '',
})

  const router = useRouter()

  useEffect(() => {
    fetch('/api/temporary-users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users)
      })
  }, [])

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

  const handleLogout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include',
    })

    router.push('/login')
  }

  const handleDelete = async (id: number) => {
    const res = await fetch(
      `/api/delete-user/${id}`,
      {
        method: 'DELETE',
        credentials: 'include',
      }
    )

    if (res.ok) {
      setUsers((prev) =>
        prev.filter((user) => user.id !== id)
      )
    }
  }

  return (
    <main className="min-h-screen flex">
      <aside className="w-72 border-r p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-10">
          Admin Panel
        </h1>

        <nav className="flex flex-col gap-4">
          <Link
            href="/app-settings"
            className="border p-4 rounded"
          >
            Ustawienia aplikacji
          </Link>

          <Link
            href="/account-settings"
            className="border p-4 rounded"
          >
            Ustawienia konta
          </Link>

          <Link
            href="/users"
            className="border p-4 rounded"
          >
            Lista użytkowników
          </Link>

          <Link
            href="/all-tasks"
            className="border p-4 rounded"
          >
            Wszystkie zadania
          </Link>
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto border p-4 rounded"
        >
          Wyloguj się
        </button>
      </aside>

      <section className="flex-1 p-10">
  <h2 className="text-3xl font-bold mb-8">
    Dodaj zadanie
  </h2>

  <form
    onSubmit={handleSubmit}
    className="max-w-2xl space-y-4 mb-14"
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

  <h2 className="text-3xl font-bold mb-8">
    Oczekujący użytkownicy
  </h2>

  <div className="space-y-4 max-w-2xl">
    {users.map((user) => (
      <div
        key={user.id}
        className="border p-4 rounded flex items-center justify-between gap-4"
      >
        <Link
          href={`/add-user/${user.id}`}
          className="flex-1"
        >
          <p>
            {user.first_name} {user.last_name}
          </p>

          <p>{user.email}</p>
        </Link>

        <button
          onClick={() =>
            handleDelete(user.id)
          }
          className="border px-4 py-2 rounded"
        >
          Usuń
        </button>
      </div>
    ))}
  </div>
</section>
    </main>
  )
}