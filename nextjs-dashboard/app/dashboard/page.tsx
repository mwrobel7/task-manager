import { useState } from 'react'
import Sidebar from '../components/sidebar'
import TaskForm from '../components/taskForm'

export default function DashboardPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    personOrTeam: '',
    dueDate: '',
  })

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(formData),
    })

    setFormData({
      title: '',
      description: '',
      personOrTeam: '',
      dueDate: '',
    })
  }

  return (
    <main className="min-h-screen flex">
      <Sidebar />

      <section className="flex-1 p-10">
        <TaskForm />
      </section>
    </main>
  )
}