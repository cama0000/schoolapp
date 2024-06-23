import { useRouter } from 'next/router';
import React from 'react'

const NotebookPage = () => {
  const router = useRouter();
  const { page } = router.query;

  return (
    <div className='ml-11'>{page}</div>
  )
}

export default NotebookPage;