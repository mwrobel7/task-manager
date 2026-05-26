import Sidebar from '../components/sidebar'
import TasksList from '../components/tasksList'

export default function TasksPage() {
  return (
    <main className="min-h-screen flex">
      <Sidebar />

      <section className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-10">
          Moje zadania
        </h1>

        <TasksList />
      </section>
    </main>
  )
}