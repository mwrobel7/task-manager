'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type TempUser = {
  id: number
  first_name: string
  last_name: string
  email: string
}

export default function AdminDashboardPage() {
  const [users, setUsers] = useState<TempUser[]>([])

  useEffect(() => {
    fetch('/api/temporary-users')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users)
      })
  }, [])

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-6">
        Admin Dashboard
      </h1>

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