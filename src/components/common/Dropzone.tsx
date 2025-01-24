'use client';

import { useCallback, useState } from "react";

import { DropzoneOptions, useDropzone } from "react-dropzone";

import { uploadFileAction } from "@/actions/upload-file-action";

interface Props {
  label?: string;
  options?: DropzoneOptions;
}

export const Dropzone = ({
  label = 'Imagen Producto',
  options,
}: Props) => {
  const [files, setFiles] = useState<string[]>([]);

  const onDrop = useCallback(async (newFiles: File[]) => {
    const formData = new FormData();

    newFiles.forEach((newFile) => {
      formData.append('files', newFile);
    });

    const newFileUrl = await uploadFileAction(formData);
    setFiles([...files, newFileUrl]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isDragActive, isDragAccept, isDragReject, getRootProps, getInputProps} = useDropzone({
    ...options,
    maxFiles: options ? options?.maxFiles : 1,
    accept: options ? options?.accept : {
      'image/*': ['.jpg', '.jpeg', '.png', '.webp'],
    },
    onDrop
  });

  return (
    <>
      <div className="space-y-1">
        <label className="block text-sm font-medium leading-6 text-gray-900">
          { label }
        </label>

        <div
          {...getRootProps({
            className: `
              py-20 border-2 border-dashed  text-center 
              ${isDragActive ? 'border-gray-900 text-gray-900 bg-gray-200 ' : 'border-gray-400 text-gray-400 bg-white'} 
              ${isDragReject ? 'border-none bg-white' : 'cursor-not-allowed'}
            `
          })}
        >
          <input {...getInputProps()} />

          {isDragAccept && (<p>Suelta la Imagen</p>)}

          {isDragReject && (<p>Archivo no válido</p>)}

          {!isDragActive && (<p>Arrastra y suelta una imagen aquí</p>)}
        </div>
      </div>
    </>
  )
}
