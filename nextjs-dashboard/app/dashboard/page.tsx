import Sidebar from '../components/sidebar'
import TaskForm from '../components/taskForm'

export default function DashboardPage() {

  return (
    <main className="min-h-screen flex">
      <Sidebar />

      <section className="flex-1 p-10">
        <TaskForm />
      </section>
    </main>
  )
}