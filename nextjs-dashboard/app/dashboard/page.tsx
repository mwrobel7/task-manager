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
    <main className="min-h-screen flex">
      <aside className="w-72 border-r p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-10">
          Dashboard
        </h1>

        <nav className="flex flex-col gap-4">
          <Link
            href="/account-settings"
            className="border p-4 rounded"
          >
            Ustawienia konta
          </Link>

          <Link
            href="/tasks"
            className="border p-4 rounded"
          >
            Lista zadań
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
        <h2 className="text-3xl font-bold">
          Witaj
        </h2>
      </section>
    </main>
  )
}