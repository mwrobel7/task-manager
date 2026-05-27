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

    const existingUser = await pool.query(
      'SELECT * FROM temporary_users WHERE email = $1',
      [email]
    )

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        { error: 'Email już istnieje' },
        { status: 409 }
      )
    }

    const passwordHash = await bcrypt.hash(password, 10)

    await pool.query(
      `
        INSERT INTO temporary_users (
          first_name,
          last_name,
          email,
          password_hash
        )
        VALUES ($1, $2, $3, $4)
      `,
      [firstName, lastName, email, passwordHash]
    )

    return NextResponse.json({
      success: true,
      message: 'Wysłano prośbę o rejestrację do admina'
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Błąd serwera' },
      { status: 500 }
    )
  }
}