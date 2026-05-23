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
        SELECT *
        FROM temporary_users
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