import Link from 'next/link';

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center p-10">
      <div className="w-full max-w-xl text-center">
        <h1 className="text-5xl font-bold mb-6">
          Task List Manager
        </h1>

        <div className="flex items-center justify-center gap-4">
          <Link
            href="/register"
            className="border px-6 py-3 rounded"
          >
            Utwórz konto
          </Link>

          <Link
            href="/login"
            className="border px-6 py-3 rounded"
          >
            Zaloguj się
          </Link>
        </div>
      </div>
    </main>
  );
}
