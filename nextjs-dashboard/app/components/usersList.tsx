import Link from 'next/link'
import { pool } from '@/app/lib/db'

export default async function UsersList() {
  const result = await pool.query(`
    SELECT
      id,
      first_name,
      last_name,
      email,
      admin,
      team
    FROM users
    ORDER BY id DESC
  `)

  const users = result.rows

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div
          key={user.id}
          className="border p-4 rounded flex items-center justify-between"
        >
          <div>
            <p className="font-semibold">
              {user.first_name}{' '}
              {user.last_name}
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
  )
}