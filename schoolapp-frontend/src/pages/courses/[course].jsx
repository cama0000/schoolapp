import { useRouter } from 'next/router';
import React from 'react'

const coursePage = () => {
  const router = useRouter();
  const { course } = router.query;

  return (
    <div className="flex-1 flex flex-col items-center mt-12">
      <span className="text-6xl font-bold">
        {course}
      </span>

      <span className="text-xl mt-8">
        Here are your tasks.
      </span>
    </div>
  )
}

export default coursePage;