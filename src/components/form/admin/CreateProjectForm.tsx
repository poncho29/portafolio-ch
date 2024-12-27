'use client';

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { IProject } from "@/interfaces";

interface Props {
  textButton?: string;
  sizeButton?: 'default' | 'sm' | 'lg' | 'icon';
  data?: IProject;
}

export const CreateProjectForm = ({
  textButton = 'Crear Proyecto',
  sizeButton = 'default',
  data
}: Props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);
    

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        size={sizeButton}
        onClick={() => setOpen(true)}
      >
        {textButton}
      </Button>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            {data ? data.title : 'This action cannot be undone. This will permanently delete your account and remove your data from our servers.'}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
