'use server';

import { cloudinary } from "@/lib/cloudinary";

import { CloudinaryResponse } from "@/interfaces";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const streamifier = require('streamifier');

export const uploadFilAction = async (file: Express.Multer.File) => {
  return new Promise<CloudinaryResponse>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: process.env.CLOUDINARY_FOLDER_NAME || "default", resource_type: "image" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result as CloudinaryResponse);
      }
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
}