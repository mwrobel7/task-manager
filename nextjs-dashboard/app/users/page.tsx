import Sidebar from '../components/sidebar'
import UsersList from '../components/usersList'

export default function UsersPage() {
  return (
    <main className="min-h-screen flex">
      <Sidebar />

      <section className="flex-1 p-10">
        <h1 className="text-3xl font-bold mb-10">
          Lista użytkowników
        </h1>

        <UsersList />
      </section>
    </main>
  )
}