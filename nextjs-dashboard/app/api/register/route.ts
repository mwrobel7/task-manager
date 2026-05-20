export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { pool } from '@/app/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      firstName,
      lastName,
      email,
      password,
    } = body

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: 'Wszystkie pola są wymagane' },
        { status: 400 }
      )
    }

    const existingUser = await sql`
      SELECT * FROM temporary_users
      WHERE email = ${email}
    `

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: 'Email już istnieje' },
        { status: 409 }
      )
    }

    const passwordHash = await bcrypt.hash(password, 10)

    await sql`
      INSERT INTO temporary_users (
        first_name,
        last_name,
        email,
        password_hash
      )
      VALUES (
        ${firstName},
        ${lastName},
        ${email},
        ${passwordHash}
      )
    `

    return NextResponse.json({
      success: true,
      message: 'Użytkownik dodany do temporary_users'
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Błąd serwera' },
      { status: 500 }
    )
  }
}