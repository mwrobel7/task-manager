import Link from "next/link";
import Sidebar from "../components/sidebar";

export default function AppSettingsPage() {
  return (
    <main className="min-h-screen flex">
      <Sidebar />
      <h1 className="text-3xl font-bold">
        Ustawienia aplikacji
      </h1>
    </main>
  )
}