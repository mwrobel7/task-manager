export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import { pool } from '@/app/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      title,
      description,
      personOrTeam,
      dueDate,
    } = body

    if (
      !title ||
      !description ||
      !personOrTeam ||
      !dueDate
    ) {
      return NextResponse.json(
        { error: 'Wszystkie pola są wymagane' },
        { status: 400 }
      )
    }

    await pool.query(
      `
        INSERT INTO tasks (
          title,
          description,
          person_or_team,
          due_date,
          status
        )
        VALUES ($1, $2, $3, $4, $5)
      `,
      [
        title,
        description,
        personOrTeam,
        dueDate,
        false,
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