import ProtectedRoutes from '@/components/ProtectedRoutes';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import 'draft-js/dist/Draft.css';
import RichTextEditor from '@/components/RichTextEditor';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import dayjs from 'dayjs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useDropzone } from 'react-dropzone';
import Tesseract, { createWorker } from 'tesseract.js';
import { loadPageContent, savePageContent } from '@/services/client';
import { convertToRaw } from 'draft-js';

const NotebookPage = () => {
    const router = useRouter();
    const { pageId } = router.query;
    const { setPageFromId, page, course, student } = useAuth();
    const editorRef = useRef(null);
    const [saving, setSaving] = useState(false);
    const [timeUpdated, setTimeUpdated] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [files, setFiles] = useState([]);
    const [ocrResult, setOcrResult] = useState('');
    // const [isProcessing, setIsProcessing] = useState(false);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: async (acceptedFiles) => {
            const file = acceptedFiles[0];
            setFiles(file ? [file] : []);
            if (file) {
                await processImage(file);
            }
        },
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg']
        },
        maxFiles: 1,
        multiple: false,
        onDropRejected: (fileRejections) => {
            console.log('File rejected:', fileRejections);
        }
    });

    useEffect(() => {
        if(pageId){
            setPageFromId(pageId);

            handleLoad();
        }
    }, [pageId]);

    // check if the student actually has this page
  useEffect(() => {
    // console.log("PAGES STUENT ID: " + page?.studentId);
    if(page && page?.studentId !== student?.id){
      router.push('/home');
    }

  }, [page, student?.id]);

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
          handleSave("");
        }
      };
  
      window.addEventListener('keydown', handleKeyDown);
  
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }, []);

    const handleSave = async (text) => {
        if(editorRef.current){
            setSaving(true);
            await editorRef.current.save(text)
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
      if(editorRef.current){
          editorRef.current.load();
      }
    };

    // OCR API to extract text from images
    const processImage = async (file) => {
        try {
            // setIsProcessing(true);
            
            const reader = new FileReader();
            reader.onload = async () => {
                try {
                  const { createWorker } = Tesseract;
                  (async () => {
                    const worker = await createWorker('eng');
                    const { data: { text } } = await worker.recognize(reader.result);
                    
                    (async () => {
                      await worker.terminate();
                    })();

                    await handleSave(text);
                    handleLoad();
                  })();
                } catch (error) {
                    console.error('OCR processing error:', error);
                }
            };
            reader.readAsDataURL(file);
        } catch (error) {
            console.error('Error setting up OCR:', error);
            // setIsProcessing(false);
        }
    };

    return (
      <div className="mt-12 w-full flex flex-col">
        <div className='flex items-center justify-between mx-32 mb-6'>
          <div className='flex items-center gap-4 text-purple-600'>
            <Button
              onClick={() => router.push(`/courses/${course?.id}`)}
              startIcon={<ArrowBackIcon />}
              className="!normal-case !text-purple-600 hover:!bg-purple-50"
              sx={{ 
                borderRadius: '9999px',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateX(-4px)',
                }
              }}
            >
              Back to {course?.courseName}
            </Button>
            
            <Button
              variant="contained"
              className="!bg-purple-600 hover:!bg-purple-700 !normal-case"
              onClick={() => setOpenDialog(true)}
            >
              Convert Notes
            </Button>
          </div>
        </div>

        <div className="flex justify-between items-center">
            <span className="text-5xl font-bold ml-32">{page?.title}</span>
            {/* <Button className="mr-32 p-2 bg-purple-500 text-white rounded" onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
            </Button> */}
        </div>
        <span className='ml-32 mt-3'>
            Last updated at: <em>{timeUpdated ? dayjs(timeUpdated).format('MMMM DD, YYYY h:mm A') : 'N/A'}</em>
        </span>
        <div className="mt-12 w-full flex justify-center">
            <RichTextEditor ref={editorRef} pageId={pageId} pageContent={page ? page.content : ''} />
        </div>



        

        <Dialog 
          open={openDialog} 
          onClose={() => {
            setOpenDialog(false);
            setFiles([]);
          }}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Upload an image of your notes.</DialogTitle>
          <DialogContent>
            <div 
              {...getRootProps()} 
              className={`p-10 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors
                ${isDragActive ? 'border-purple-600 bg-purple-50' : 'border-gray-300 hover:border-purple-400'}`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-purple-600">Drop the image here...</p>
              ) : (
                <div className="space-y-2">
                  <p className="text-gray-600">Drag and drop an image, or click to select</p>
                  <p className="text-sm text-gray-500">Supported formats: PNG, JPG, JPEG</p>
                </div>
              )}
              
              {files.length > 0 && (
                <div className="mt-4">
                  <p className="font-semibold">Selected image:</p>
                  <p className="text-sm text-gray-600">{files[0].name}</p>
                </div>
              )}
            </div>
{/* 
            {isProcessing && (
                <div className="mt-4 text-center">
                    <p className="text-purple-600">Processing image...</p>
                </div>
            )}

            {ocrResult && !isProcessing && (
                <div className="mt-4">
                    <p className="font-semibold mb-2">Extracted Text:</p>
                    <div className="max-h-60 overflow-y-auto p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm whitespace-pre-wrap">{ocrResult}</p>
                    </div>
                </div>
            )} */}
          </DialogContent>
        </Dialog>
      </div>
    );
};

export default ProtectedRoutes(NotebookPage);