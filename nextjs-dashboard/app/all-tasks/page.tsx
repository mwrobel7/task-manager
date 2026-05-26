import Sidebar from '../components/sidebar'
import AllTasksList from '../components/allTasksList'

export default function AllTasksPage() {
  return (
    <main className="min-h-screen flex">
      <Sidebar />

      <section className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-10">
          Wszystkie zadania
        </h1>

        <AllTasksList />
      </section>
    </main>
  )
}