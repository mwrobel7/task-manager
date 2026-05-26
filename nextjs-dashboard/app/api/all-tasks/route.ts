export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import { pool } from '@/app/lib/db'

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        id,
        title,
        description,
        person_or_team,
        curr_date,
        due_date
      FROM tasks
      ORDER BY person_or_team ASC
    `)

    return NextResponse.json({
      tasks: result.rows,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Błąd serwera' },
      { status: 500 }
    )
  }
}