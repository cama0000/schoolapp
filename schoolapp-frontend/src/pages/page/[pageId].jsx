// import ProtectedRoutes from '@/components/ProtectedRoutes';
// import { useAuth } from '@/context/AuthContext';
// import { useRouter } from 'next/router';
// import React, { useEffect, useState } from 'react';
// import 'draft-js/dist/Draft.css';
// import RichTextEditor from '@/components/RichTextEditor';
// import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
// import axios from 'axios';
// import { loadPageContent, savePageContent } from '@/services/client';

// const NotebookPage = () => {
//   const router = useRouter();
//   const { pageId } = router.query;
//   const { setPageFromId, page } = useAuth();

//   useEffect(() => {
//     if(pageId){
//       setPageFromId(pageId);
//     }
//   }, [pageId]);

//   // useEffect(() => {
//   //     loadContent().then((loadedEditorState) => {
//   //       setEditorState(loadedEditorState);
//   // });
//   //   }, [page, pageId]);

// //   const saveContent = async (event) => {
// //     // event.preventDefault();
// //     const contentState = editorState.getCurrentContent();

// //     console.log("CONTENT STATE: " + contentState);
// //     const rawContent = JSON.stringify(convertToRaw(contentState));

// //     console.log("HERE IS THE RAW CONTENT BEGING SAVED: " + rawContent);


// //     try {
// //       await savePageContent(pageId, rawContent);
// //       // await axios.put(`http://localhost:8080/api/page/savePageContent/${pageId}`, { content: rawContent }, {
// //       //   headers: {
// //       //     Authorization: `Bearer ${localStorage.getItem("access_token")}`
// //       //   }
// //       // });
// //       console.log('Content saved successfully');
// //     } catch (error) {
// //       console.error('Error saving content:', error);
// //     }
// //   };

// //   const loadContent = async () => {
// //     try{
// //         // const response = await loadPageContent(pageId);

// //         console.log("THE PAGE TO LOAD IS : " + page.id);
// //         console.log("PAGE CONTENT: " + page.content);

// //         const rawContent = page.content;
// //         const contentState = convertFromRaw(JSON.parse(rawContent));
// //         return EditorState.createWithContent(contentState);
// //     }
// //     catch(error){
// //         console.error('Error loading content:', error);
// //         return EditorState.createEmpty();
// //     }
// // };

//   return (
//     <div className="mt-12 w-full flex-col text-center justify-center">
//       <span className="text-5xl font-bold">
//         {page?.title}
//       </span>

//       <button className="mt-4 mb-4 p-2 bg-blue-500 text-white rounded" onClick={(event)=>{saveContent(event)}}>
//         SAVE
//       </button>

//       <div className="mt-12 justify-center flex">
//         <RichTextEditor pageId={pageId}/>
//       </div>
//     </div>
//   );
// };

// export default ProtectedRoutes(NotebookPage);


import ProtectedRoutes from '@/components/ProtectedRoutes';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import 'draft-js/dist/Draft.css';
import RichTextEditor from '@/components/RichTextEditor';

const NotebookPage = () => {
    const router = useRouter();
    const { pageId } = router.query;
    const { setPageFromId, page } = useAuth();
    const editorRef = useRef(null);

    useEffect(() => {
        if (pageId) {
            setPageFromId(pageId);
            handleLoad();
        }
    }, [pageId]);

    const handleSave = () => {
        if (editorRef.current) {
            editorRef.current.save();
        }
    };

    const handleLoad = () => {
      if (editorRef.current) {
          editorRef.current.load();
      }
  };

    return (
        <div className="mt-12 w-full">
            <RichTextEditor ref={editorRef} pageId={pageId} pageContent={page ? page.content : ''} />
            <button className="mt-4 p-2 bg-blue-500 text-white rounded" onClick={handleSave}>
                Save
            </button>
        </div>
    );
};

export default NotebookPage;