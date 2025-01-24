import { NextRequest, NextResponse } from "next/server";

import { UploadFileService } from "./upload-file.service";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No se envió ninguna imagen" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadService = new UploadFileService();
    const response = await uploadService.uploadFile({
      buffer,
      originalname: file.name,
      mimetype: file.type
    } as Express.Multer.File);

    return NextResponse.json({ file: response, error: null });
  } catch (error) {
    console.error("Failed to upload image", error);
    return NextResponse.json({
      url: null,
      error: `Error subiendo la imagen ${error instanceof Error ? `: ${error.message}` : ""}`
    }, { status: 500 });
  }
};
