import Link from 'next/link'
import { pool } from '@/app/lib/db'
import DeletePendingUserButton from './deleteAwatingUserButton'

export default async function AwatingUsersList() {
  const result = await pool.query(`
    SELECT
      id,
      first_name,
      last_name,
      email
    FROM temporary_users
    ORDER BY id DESC
  `)

  const users = result.rows

  return (
    <>
      <h2 className="text-3xl font-bold mb-8">
        Oczekujący użytkownicy
      </h2>

      <div className="space-y-4 max-w-2xl">
        {users.map((user) => (
          <div
            key={user.id}
            className="border p-4 rounded flex items-center justify-between gap-4"
            style={{
  background: 'var(--card)',
}}
          >
            <Link
              href={`/add-user/${user.id}`}
              className="flex-1"
            >
              <p>
                {user.first_name}{' '}
                {user.last_name}
              </p>

              <p>{user.email}</p>
            </Link>

            <DeletePendingUserButton
              userId={user.id}
            />
          </div>
        ))}
      </div>
    </>
  )
}