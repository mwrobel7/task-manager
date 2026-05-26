'use client'

import { useRouter } from 'next/navigation'

type Props = {
  userId: number
}

export default function DeletePendingUserButton({
  userId,
}: Props) {
  const router = useRouter()

  const handleDelete = async () => {
    await fetch(
      `/api/delete-temporary-user/${userId}`,
      {
        method: 'DELETE',
        credentials: 'include',
      }
    )

    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      className="border px-4 py-2 rounded"
    >
      Usuń
    </button>
  )
}