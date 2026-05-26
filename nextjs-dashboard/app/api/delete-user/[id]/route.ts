export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import { pool } from '@/app/lib/db'

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  try {
    await pool.query(
      `
        DELETE FROM temporary_users
        WHERE id = $1
      `,
      [id]
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