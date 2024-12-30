'use client';

import { useEffect, useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  // DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Dialog,
} from "@/components/ui/dialog";
import {
  FormMessage,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  Form,
} from "@/components/ui/form";

import { IProject } from "@/interfaces";
import { InputDate } from "@/components/common";

interface Props {
  textButton?: string;
  sizeButton?: 'default' | 'sm' | 'lg' | 'icon';
  data?: IProject;
}

const formSchema = z.object({
  title: z.string().min(1, { message: "El titulo es requerido" }),
  description: z
    .string()
    .min(1, { message: "La descripción es requerida" })
    .max(1000, { message: "La descripción debe tener máximo 1000 caracteres" }),
  startDate: z.date().default(new Date()),
  endDate: z.date().optional(),
  status: z.string().min(1, { message: "El estado es requerido" }),
  imageUrl: z.string().min(1, { message: "La imagen es requerida" }),
  url: z.string().optional(),
  stack: z.string().min(1, { message: "El stack es requerido" }),
});

export const CreateProjectForm = ({
  textButton = 'Crear Proyecto',
  sizeButton = 'default',
  data
}: Props) => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      description: "",
      startDate: new Date(),
      endDate: new Date(),
      status: "",
      imageUrl: "",
      url: "",
      stack: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!data || !data?.id) {
      toast.error("No se pudo actualizar el proyecto");
      return;
    }

    startTransition( async () => {
      console.log(values);

      // if (error) {
      //   toast.error(error);
      // } else {
      //   toast.success("Perfil actualizado correctamente");
      // }
    });
  }

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
          <DialogTitle>
            {data ? 'Editar Proyecto' : 'Crear Proyecto'}
          </DialogTitle>
        </DialogHeader>

        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Titulo del proyecto</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Ingrese el titulo del proyecto"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Descripción del proyecto</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={6}
                        placeholder="Ingrese su descripción"
                        className="resize-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col mb-4">
                      <FormLabel>Fecha de inicio</FormLabel>
                      <FormControl>
                        <InputDate
                          value={field.value}
                          customClass="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col mb-4">
                      <FormLabel>Fecha de finalizacion</FormLabel>
                      <FormControl>
                        <InputDate
                          value={field.value}
                          customClass="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>

      </DialogContent>
    </Dialog>
  )
}
