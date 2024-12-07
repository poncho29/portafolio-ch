'use client';

import { DownloadIcon } from "lucide-react";

import { Button } from "../ui/button";

interface Props {
  urlFile: string;
  fileName: string;
  buttonText: string;
}

export const DownloadButton =({ urlFile, fileName, buttonText }: Props) => {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = urlFile;
    link.download = fileName 

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Button
      variant="outlineCustom"
      className="flex items-center space-x-2"
      onClick={handleDownload}
    >
      <DownloadIcon className="h-4 w-4" />
      <span>{buttonText}</span>
    </Button>
  )
}