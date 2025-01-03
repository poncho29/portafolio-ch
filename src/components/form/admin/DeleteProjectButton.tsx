'use client';

import { useState, useTransition } from "react";

import toast from "react-hot-toast";

import { deleteProjectById } from "@/actions/project-action";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/common";

interface Props {
  id: string | unknown;
}

export const DeleteProjectButton = ({ id }: Props) => {
  const [open, setOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  const handleDeleteProject = async () => {
    if (!id) return;

    startTransition( async () => {
      const { data, error } = await deleteProjectById(+id);

      if (!data) {
        toast.error(error);
      } else {
        toast.success("Proyecto actualizado correctamente");
        setOpen(false);
      }   
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <Button
        variant="destructive"
        size="sm"
        onClick={() => setOpen(true)}
      >
        Eliminar
      </Button>

      <DialogContent>
        <DialogHeader className="my-2">
          <DialogTitle className="text-center uppercase">
            ¿Seguro que deseas eliminar este proyecto?
          </DialogTitle>
        </DialogHeader>
        
        <DialogDescription
          className="flex justify-center gap-4"
        >
          <Button
            variant="destructive"
            onClick={handleDeleteProject}
          >
            {isPending ? <Spinner /> : "Eliminar"}
          </Button>

          <Button
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
