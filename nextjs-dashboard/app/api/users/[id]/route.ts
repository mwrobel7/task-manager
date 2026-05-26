export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import { pool } from '@/app/lib/db'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    const result = await pool.query(
      `
        SELECT
          id,
          first_name,
          last_name,
          email,
          admin,
          team
        FROM users
        WHERE id = $1
      `,
      [id]
    )

    return NextResponse.json({
      user: result.rows[0],
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Błąd serwera' },
      { status: 500 }
    )
  }
}

export async function PUT(
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
      admin,
    } = body

    await pool.query(
      `
        UPDATE users
        SET
          first_name = $1,
          last_name = $2,
          email = $3,
          team = $4,
          admin = $5
        WHERE id = $6
      `,
      [
        firstName,
        lastName,
        email,
        team,
        admin,
        id,
      ]
    )

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