import Sidebar from '../components/sidebar'
import TaskForm from '../components/taskForm'
import AwatingUsersList from '../components/awatingUsersList'

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen flex">
      <Sidebar />

      <section className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-10">
          Admin Dashboard
        </h1>

        <div className="mb-16">
          <TaskForm />
        </div>

        <div>
          <AwatingUsersList />
        </div>
      </section>
    </main>
  )
}