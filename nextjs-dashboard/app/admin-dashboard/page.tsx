'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import Sidebar from '../components/sidebar'
import TaskForm from '../components/taskForm'

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
      <Sidebar />

      <section className="flex-1 p-10">

      <section className="flex-1 p-10">
        <TaskForm />
      </section>

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