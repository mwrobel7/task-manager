export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { pool } from '@/app/lib/db'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { email, password } = body

    const result = await pool.query(
      `
        SELECT *
        FROM users
        WHERE email = $1
      `,
      [email]
    )

    if (result.rows.length === 0) {
      return NextResponse.json(
        { error: 'Nieprawidłowe dane logowania' },
        { status: 401 }
      )
    }

    const user = result.rows[0]

    const passwordMatch = await bcrypt.compare(
      password,
      user.password_hash
    )

    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Nieprawidłowe dane logowania' },
        { status: 401 }
      )
    }

    const token = jwt.sign(
      {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        team: user.team,
        admin: user.admin,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: '7d',
      }
    )

    const cookieStore = await cookies()

    cookieStore.set('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    })

    return NextResponse.json({
      success: true,
      admin: user.admin,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Błąd serwera' },
      { status: 500 }
    )
  }
}