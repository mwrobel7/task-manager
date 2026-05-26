import { pool } from '@/app/lib/db'

export default async function AllTasksList() {
  const result = await pool.query(`
    SELECT
      id,
      title,
      description,
      person_or_team,
      curr_date,
      due_date
    FROM tasks
    ORDER BY person_or_team ASC
  `)

  const tasks = result.rows

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="border rounded p-5"
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
                Osoba/Zespół:
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
          </div>
        </div>
      ))}
    </div>
  )
}