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
                <br/><br/>
                <label>Imię:</label><br/>
                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full border p-3 rounded" required/>
                <br/>
                <label>Nazwisko:</label><br/>
                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full border p-3 rounded" required/>
                <br/>
                <label>Email:</label><br/>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full border p-3 rounded" required/>
                <br/>
                <label>Hasło:</label><br/>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full border p-3 rounded" required/>
                <br/><br/>
                <button type="submit" className="w-full bg-black text-white p-3 rounded">Zarejestruj się</button>
                <br/><br/><br/><br/>
                {message && (
                    <p className="text-sm">
                        {message}
                    </p>
                )}
            </form>

        </div>
    )
}