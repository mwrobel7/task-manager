'use client'

import { useEffect, useState } from 'react'
import Sidebar from '../components/sidebar'
import Link from 'next/link'

type Task = {
  id: number
  title: string
  description: string
  person_or_team: string
  curr_date: string
  due_date: string
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    fetch('/api/my-tasks', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.tasks)
      })
  }, [])

  return (
    <main className="min-h-screen flex">
      <Sidebar />
      <h1 className="text-3xl font-bold mb-10">
        Moje zadania
      </h1>
      <Link
          href="/dashboard"
          className="border px-4 py-2 rounded"
        >
          Wróć do pulpitu
        </Link>
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
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}