import ProtectedRoutes from '@/components/ProtectedRoutes';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import 'draft-js/dist/Draft.css';
import MyEditor from '@/components/MyEditor';

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
    <div className="mt-12 w-full flex-col text-center justify-center">
        <span className="text-5xl font-bold">
            {page?.title}
        </span>

        <div className="mt-12 justify-center flex">
            <MyEditor />
        </div>
    </div>
  )
}

export default ProtectedRoutes(NotebookPage);