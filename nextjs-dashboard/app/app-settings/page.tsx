import Link from "next/link";
import Sidebar from "../components/sidebar";

export default function AppSettingsPage() {
  return (
    <main className="min-h-screen p-10">
      <Sidebar admin={true} />
      <h1 className="text-3xl font-bold">
        Ustawienia aplikacji
      </h1>
      <Link
            href="/admin-dashboard"
            className="border px-4 py-2 rounded"
          >
            Wróć do pulpitu
          </Link>
    </main>
  )
}