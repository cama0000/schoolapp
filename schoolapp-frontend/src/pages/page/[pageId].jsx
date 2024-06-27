import ProtectedRoutes from '@/components/ProtectedRoutes';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import 'draft-js/dist/Draft.css';
import RichTextEditor from '@/components/RichTextEditor';
import { Button, TextField } from '@mui/material';
import dayjs from 'dayjs';

const NotebookPage = () => {
    const router = useRouter();
    const { pageId } = router.query;
    const { setPageFromId, page, course } = useAuth();
    const editorRef = useRef(null);
    const [saving, setSaving] = useState(false);
    const [timeUpdated, setTimeUpdated] = useState(null);

    useEffect(() => {
        if (pageId) {
            setPageFromId(pageId);
            handleLoad();
        }
    }, [pageId]);

    // set time updated initially
    useEffect(() => {
      if (page?.timeUpdated) {
          setTimeUpdated(page.timeUpdated);
      }
  }, [page]);

    // Ctrl + S to save
    useEffect(() => {
      const handleKeyDown = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
          e.preventDefault();
          handleSave();
        }
      };
  
      window.addEventListener('keydown', handleKeyDown);
  
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, []);

    const handleSave = () => {
        if (editorRef.current) {
            setSaving(true);
            editorRef.current.save()
            .then(() => {
              const newTimeUpdated = new Date().toISOString();
              setTimeUpdated(newTimeUpdated);
              setSaving(false);
          })
          .catch((error) => {
              console.error('Error saving content:', error);
              setSaving(false);
          });
        }
    };

    const handleLoad = () => {
      if (editorRef.current) {
          editorRef.current.load();
      }
  };

    return (
      //   <div className="mt-12 w-full flex flex-col">
      //   <span className="text-5xl font-bold ml-32">{page?.title}</span>
      //   <span className='ml-32 mt-3'>Last updated at: <em>{ timeUpdated ? dayjs(timeUpdated).format('MMMM DD, YYYY h:mm A') : 'N/A'}</em></span>
      //   <div className="mt-12 w-full flex justify-center">
      //     <RichTextEditor ref={editorRef} pageId={pageId} pageContent={page ? page.content : ''} />
      //   </div>
      //   <div className="flex justify-center mt-4">
      //     <Button className="p-2 bg-purple-500 text-white rounded" onClick={handleSave}>
      //       Save
      //     </Button>
      //   </div>
      // </div>

      <div className="mt-12 w-full flex flex-col">
        <div className='ml-32 mt-0'>
          {course?.courseName} / {page?.title}
        </div>
        <div className="flex justify-between items-center">
            <span className="text-5xl font-bold ml-32">{page?.title}</span>
            <Button className="mr-32 p-2 bg-purple-500 text-white rounded" onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
            </Button>
        </div>
        <span className='ml-32 mt-3'>
            Last updated at: <em>{timeUpdated ? dayjs(timeUpdated).format('MMMM DD, YYYY h:mm A') : 'N/A'}</em>
        </span>
        <div className="mt-12 w-full flex justify-center">
            <RichTextEditor ref={editorRef} pageId={pageId} pageContent={page ? page.content : ''} />
        </div>
      </div>
    );
};

export default ProtectedRoutes(NotebookPage);
