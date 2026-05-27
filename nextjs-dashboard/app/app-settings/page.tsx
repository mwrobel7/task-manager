import Link from "next/link";
import Sidebar from "../components/sidebar";

export default function AppSettingsPage() {
  return (
    <main className="min-h-screen flex">
      <Sidebar />
      <section className="flex-1 p-10">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold">
            Ustawienia aplikacji
          </h1>
        </div>
      </section>
    </main>
  )
}