'use client'

import { useRouter } from 'next/navigation'

type Props = {
  taskId: number
}

export default function CompleteTaskButton({
  taskId,
}: Props) {
  const router = useRouter()

  const handleComplete = async () => {
    await fetch(`/api/tasks/${taskId}`, {
      method: 'PATCH',
      credentials: 'include',
    })

    router.refresh()
  }

  return (
    <button
      onClick={handleComplete}
      className="border px-4 py-2 rounded mt-4"
    >
      Oznacz jako wykonane
    </button>
  )
}