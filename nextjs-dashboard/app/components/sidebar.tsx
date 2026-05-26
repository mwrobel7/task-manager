import Link from 'next/link'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import LogoutButton from './logoutButton'

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET
)

export default async function Sidebar() {
  const cookieStore = await cookies()

  const token =
    cookieStore.get('token')?.value

  let admin = false

  if (token) {
    try {
      const { payload } = await jwtVerify(
        token,
        secret
      )

      admin = !!payload.admin
    } catch {}
  }

  return (
    <aside className="w-72 border-r p-6 flex flex-col min-h-screen">
      <h1 className="text-2xl font-bold mb-10">
        {admin
          ? 'Admin Panel'
          : 'Dashboard'}
      </h1>

      <nav className="flex flex-col gap-4 mb-4">
        {admin ? (
          <>
            <Link
              href="/admin-dashboard"
              className="border p-4 rounded"
            >
              Powrót do pulpitu
            </Link>

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
              href="/dashboard"
              className="border p-4 rounded"
            >
              Powrót do pulpitu
            </Link>

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

      <LogoutButton />
    </aside>
  )
}