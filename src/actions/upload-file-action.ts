'use server';

export const uploadFileAction = async (formData: FormData): Promise<string> => {
  const req = await fetch ('/api/upload-files', {
    method: 'POST',
    body: formData
  });

  const image = await req.json();

  return image;
}