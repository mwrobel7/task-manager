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

  const router = useRouter()

  useEffect(() => {
    fetch('/api/temporary-users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users)
      })
  }, [])

  const handleLogout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include',
    })

    router.push('/login')
  }

  return (
    <main className="min-h-screen p-10">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="border px-4 py-2 rounded"
        >
          Wyloguj się
        </button>
      </div>

      <div className="grid gap-4 max-w-md mb-10">
        <Link
          href="/app-settings"
          className="border p-4 rounded"
        >
          Ustawienia aplikacji
        </Link>

        <Link
          href="/settings"
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
          Podgląd listy zadań wszystkich grup
        </Link>
      </div>

      <h2 className="text-2xl font-bold mb-4">
        Oczekujący użytkownicy
      </h2>

      <div className="space-y-4">
        {users.map((user) => (
          <Link
            key={user.id}
            href={`/add-user/${user.id}`}
            className="block border p-4 rounded"
          >
            <p>
              {user.first_name} {user.last_name}
            </p>

            <p>{user.email}</p>
          </Link>
        ))}
      </div>
    </main>
  )
}