'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

type SidebarProps = {
  admin: boolean
}

export default function Sidebar({
  admin,
}: SidebarProps) {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include',
    })

    router.push('/login')
  }
  return (
    <aside className="w-72 border-r p-6 flex flex-col min-h-screen">
      <h1 className="text-2xl font-bold mb-10">
        {admin ? 'Admin Panel' : 'Dashboard'}
      </h1>

      <nav className="flex flex-col gap-4">
        {admin ? (
          <>
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
          </>
        ) : (
          <>
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
          </>
        )}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto border p-4 rounded"
      >
        Wyloguj się
      </button>
    </aside>
  )
}