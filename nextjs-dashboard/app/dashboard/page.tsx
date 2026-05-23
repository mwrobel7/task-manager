'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter()

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
          Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="border px-4 py-2 rounded"
        >
          Wyloguj się
        </button>
      </div>

      <div className="grid gap-4 max-w-md">
        <Link
          href="/settings"
          className="border p-4 rounded"
        >
          Ustawienia konta
        </Link>

        <Link
          href="/tasks"
          className="border p-4 rounded"
        >
          Podgląd listy zadań
        </Link>
      </div>
    </main>
  )
}