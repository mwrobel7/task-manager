'use client'

import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include',
    })

    router.push('/login')
  }

  return (
    <button
      onClick={handleLogout}
      className="mt-auto border p-4 rounded"
    >
      Wyloguj się
    </button>
  )
}