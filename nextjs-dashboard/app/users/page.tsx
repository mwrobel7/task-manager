'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Sidebar from '../components/sidebar'

type User = {
  id: number
  first_name: string
  last_name: string
  email: string
  admin: boolean
  team: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users)
      })
  }, [])

  return (
    <main className="min-h-screen flex">
      <Sidebar admin={true} />
      <h1 className="text-3xl font-bold mb-10">
        Lista użytkowników
      </h1>
      <Link
          href="/admin-dashboard"
          className="border px-4 py-2 rounded"
        >
          Wróć do pulpitu
        </Link>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="border p-4 rounded flex items-center justify-between"
          >
            <div>
              <p className="font-semibold">
                {user.first_name} {user.last_name}
              </p>

              <p>{user.email}</p>

              <p>
                Zespół:{' '}
                {user.team || 'Brak'}
              </p>

              <p>
                Typ:{' '}
                {user.admin
                  ? 'Admin'
                  : 'Użytkownik'}
              </p>
            </div>

            <Link
              href={`/edit-user/${user.id}`}
              className="border px-4 py-2 rounded"
            >
              Edytuj
            </Link>
          </div>
        ))}
      </div>
    </main>
  )
}