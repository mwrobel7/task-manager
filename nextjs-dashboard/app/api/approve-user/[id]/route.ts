export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import { pool } from '@/app/lib/db'
import { transporter } from '@/app/lib/mail'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params
  try {
    const body = await req.json()

    const {
      firstName,
      lastName,
      email,
      team,
    } = body

    const tempUserResult = await pool.query(
      `
        SELECT *
        FROM temporary_users
        WHERE id = $1
      `,
      [id]
    )

    const tempUser = tempUserResult.rows[0]

    await pool.query(
      `
        INSERT INTO users (
          first_name,
          last_name,
          email,
          password_hash,
          admin,
          team
        )
        VALUES ($1, $2, $3, $4, $5, $6)
      `,
      [
        firstName,
        lastName,
        email,
        tempUser.password_hash,
        false,
        team,
      ]
    )

    await pool.query(
      `
        DELETE FROM temporary_users
        WHERE id = $1
      `,
      [id]
    )

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Konto zatwierdzone',
      text: 'Twoje konto zostało zatwierdzone',
    })

    return NextResponse.json({
      success: true,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Błąd serwera' },
      { status: 500 }
    )
  }
}