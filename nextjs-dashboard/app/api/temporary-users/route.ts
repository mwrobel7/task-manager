export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import { pool } from '@/app/lib/db'

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT *
      FROM temporary_users
      ORDER BY id DESC
    `)

    return NextResponse.json({
      users: result.rows,
    })
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: 'Błąd serwera' },
      { status: 500 }
    )
  }
}