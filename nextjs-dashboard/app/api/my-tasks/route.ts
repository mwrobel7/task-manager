export const runtime = 'nodejs'

import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import { pool } from '@/app/lib/db'

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET
)

export async function GET(req: NextRequest) {
  try {
    const token =
      req.cookies.get('token')?.value

    if (!token) {
      return NextResponse.json(
        { error: 'Brak tokena' },
        { status: 401 }
      )
    }

    const { payload } = await jwtVerify(
      token,
      secret
    )

    const fullName = `${payload.firstName} ${payload.lastName}`

    const team = payload.team

    const result = await pool.query(
      `
        SELECT
          id,
          title,
          description,
          person_or_team,
          curr_date,
          due_date
        FROM tasks
        WHERE
          person_or_team = $1
          OR person_or_team = $2
        ORDER BY due_date ASC
      `,
      [fullName, team]
    )

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