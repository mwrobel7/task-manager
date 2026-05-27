import Link from 'next/link'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import LogoutButton from './logoutButton'
import ThemeToggleButton from './themeToggleButton'

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
    <aside
  className="w-72 p-6 flex flex-col min-h-screen"
  style={{
    background: 'var(--sidebar)',
  }}
>
      <h1 className="text-2xl font-bold mb-10">
        {admin
          ? 'Admin Panel'
          : 'Dashboard'}
      </h1>

      <nav className="flex flex-col gap-4 mb-4">
        <ThemeToggleButton />
        {admin ? (
          <>
            <Link
              href="/admin-dashboard"
              className="p-4 rounded"
style={{
  background: 'var(--card)',
}}
            >
              Powrót do pulpitu
            </Link>

            <Link
              href="/app-settings"
              className="p-4 rounded"
style={{
  background: 'var(--card)',
}}
            >
              Ustawienia aplikacji
            </Link>

            <Link
              href="/settings"
              className="p-4 rounded"
style={{
  background: 'var(--card)',
}}
            >
              Ustawienia konta
            </Link>

            <Link
              href="/users"
              className="p-4 rounded"
style={{
  background: 'var(--card)',
}}
            >
              Lista użytkowników
            </Link>

            <Link
              href="/all-tasks"
              className="p-4 rounded"
style={{
  background: 'var(--card)',
}}
            >
              Wszystkie zadania
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/dashboard"
              className="p-4 rounded"
style={{
  background: 'var(--card)',
}}
            >
              Powrót do pulpitu
            </Link>

            <Link
              href="/account-settings"
              className="p-4 rounded"
style={{
  background: 'var(--card)',
}}
            >
              Ustawienia konta
            </Link>

            <Link
              href="/tasks"
              className="p-4 rounded"
style={{
  background: 'var(--card)',
}}
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