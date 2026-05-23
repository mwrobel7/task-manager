'use client'

import { useEffect, useState } from 'react'

export default function DashboardPage() {
  const [name, setName] = useState('')

  useEffect(() => {
    const user = localStorage.getItem('user')

    if (user) {
      const parsedUser = JSON.parse(user)
      setName(parsedUser.firstName)
    }
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-bold">
        Witaj {name}
      </h1>
    </main>
  )
}