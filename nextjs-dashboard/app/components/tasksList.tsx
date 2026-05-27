import { pool } from '@/app/lib/db'
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'
import CompleteTaskButton from './completeTaskButton'

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET
)

export default async function TasksList() {
  const cookieStore = await cookies()

  const token =
    cookieStore.get('token')?.value

  if (!token) {
    return null
  }

  const { payload } = await jwtVerify(
    token,
    secret
  )

  const fullName = `${payload.firstName} ${payload.lastName}`

  const team = payload.team

  const result = await pool.query(
    `
      SELECT
        id,
        title,
        description,
        person_or_team,
        curr_date,
        due_date,
        status
      FROM tasks
      WHERE
        person_or_team = $1
        OR person_or_team = $2
      ORDER BY due_date ASC
    `,
    [fullName, team]
  )

  const tasks = result.rows

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="rounded p-5"
style={{
  background: 'var(--card)',
}}
        >
          <div className="mb-4">
            <h2 className="text-xl font-bold">
              {task.title}
            </h2>

            <p className="text-sm mt-1">
              {task.description}
            </p>
          </div>

          <div className="space-y-1 text-sm">
            <p>
              <strong>
                Przypisano do:
              </strong>{' '}
              {task.person_or_team}
            </p>

            <p>
              <strong>
                Data utworzenia:
              </strong>{' '}
              {new Date(
                task.curr_date
              ).toLocaleDateString()}
            </p>

            <p>
              <strong>
                Termin oddania:
              </strong>{' '}
              {new Date(
                task.due_date
              ).toLocaleDateString()}
            </p>

            <p>
  <strong>Status:</strong>{' '}
  {task.status
    ? 'Skończone'
    : 'Nie skończone'}
</p>
{!task.status && (
  <CompleteTaskButton
    taskId={task.id}
  />
)}
          </div>
        </div>
      ))}
    </div>
  )
}