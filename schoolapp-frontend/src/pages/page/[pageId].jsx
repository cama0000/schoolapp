import ProtectedRoutes from '@/components/ProtectedRoutes';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const NotebookPage = () => {
  const router = useRouter();
  const { pageId } = router.query;
  const { setPageFromId, page } = useAuth();

  useEffect(()=>{
    if(pageId){
      setPageFromId(pageId);
    }
  }, [pageId])

  return (
    <div className="mt-12 w-full flex justify-center">
        <span className="text-5xl font-bold">
          {page?.title}
        </span>
      </div>




  )
}

export default ProtectedRoutes(NotebookPage);