"use client"
import Link from "next/link";
import { useState } from 'react'

export default function Register()
{
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    })

    const [message, setMessage] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setMessage('')

        const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        })

        const data = await res.json()

        if (!res.ok) {
        setMessage(data.error)
        return
        }

        setMessage(data.message)

        setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        })
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-10">
            <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 border p-6 rounded-xl">
                <h2 className="text-2xl font-bold">Rejestracja</h2>
                <input type="text" id="firstName" name="firstName" placeholder="Imię" value={formData.firstName} onChange={handleChange} className="w-full border p-3 rounded" required/>
                <input type="text" id="lastName" name="lastName" placeholder="Nazwisko" value={formData.lastName} onChange={handleChange} className="w-full border p-3 rounded" required/>
                <input type="email" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full border p-3 rounded" required/>
                <input type="password" id="password" name="password" placeholder="Hasło" value={formData.password} onChange={handleChange} className="w-full border p-3 rounded" required/>
                <button type="submit" className="rounded p-5"
style={{
  background: 'var(--card)',
}}>Zarejestruj się</button>
                {message && (
                    <p className="text-sm">
                        {message}
                    </p>
                )}
            </form>

        </div>
    )
}