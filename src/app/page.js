"use client"
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { storage } from './firebase.js'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"

export default function DropResume({ message }) {

  const [spin, setSpin] = useState(false)
  const [downloadUrl, setDownloadUrl] = useState('')

  const onDrop = useCallback(acceptedFiles => {
    setSpin(true)
    const file = acceptedFiles[0]
    const mountainsRef = ref(storage, 'easyapply/' + file.name);

    uploadBytesResumable(mountainsRef, file).then((snapshot) => {

      getDownloadURL(snapshot.ref).then(downloadURL => {
        setDownloadUrl(downloadURL)
        setSpin(false)
      })
    });

  }, [])
  const { getRootProps, getInputProps } = useDropzone({ onDrop })

  return (
    <div {...getRootProps()} className='flex justify-center m-2 border-2 rounded-lg p-4 '>
      <input {...getInputProps()} />
      <div>
        <div className=''>
          {downloadUrl === '' ? <UploadIcon /> : <></>}
        </div>
        {spin ? <div className='flex justify-center'><Spin /></div> : <>{message}</>}
        {downloadUrl === '' ? <></> :
          <div className=''><iframe src={downloadUrl} frameBorder="0" allowFullScreen height={'500px'} width={'100%'}></iframe></div>}
      </div>
    </div>
  )
}

export const Spin = () => (<div className='animate-ping -ml-1 mr-3 h-5 w-5 text-indigo-500'>...</div>)
export const  UploadIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>)
