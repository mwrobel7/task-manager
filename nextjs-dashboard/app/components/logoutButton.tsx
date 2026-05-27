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
      className="w-full p-4 rounded mb-8"
      style={{
        background: 'var(--button)',
        color: 'white',
      }}
    >
      Wyloguj się
    </button>
  )
}