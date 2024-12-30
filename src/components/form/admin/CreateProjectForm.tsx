'use client';

import { useEffect, useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { InputDate, Spinner } from "@/components/common";
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
  FormDescription,
  FormMessage,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  Form,
} from "@/components/ui/form";
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
  Select,
} from "@/components/ui/select"

import { IProject } from "@/interfaces";

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
})
.superRefine((data, ctx) => {
  // Si el estado es diferente de "finished", endDate debe ser opcional
  if ((data.status !== "finished") && data.endDate) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "La fecha de finalización debe estar vacío para este estado",
      path: ["endDate"],
    });
  } else {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "La fecha de finalización es obligatoria",
      path: ["endDate"],
    });
  }

  // Validar que `endDate` sea posterior a `startDate`
  if (data.endDate && data.startDate && data.endDate < data.startDate) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "La fecha de finalización debe ser posterior a la de inicio",
      path: ["endDate"],
    });
  }
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
      endDate: undefined,
      status: "pending",
      imageUrl: "",
      url: "",
      stack: "",
    },
  });

  const status = form.watch("status");
  const startDate = form.watch("startDate");
  const endDate = form.watch("endDate");

  useEffect(() => {
    if (status !== "finished") {
      form.setValue("endDate", undefined);
      return;
    }

    if (startDate && endDate) {
      form.setValue("endDate", undefined);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, startDate]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    if (!data || !data?.id) {
      toast.error("No se pudo actualizar el proyecto");
      return;
    }

    startTransition( async () => {
      // if (error) {
      //   toast.error(error);
      // } else {
      //   toast.success("Perfil actualizado correctamente");
      // }
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        form.reset();
        setOpen(open);
      }}
    >
      <Button
        size={sizeButton}
        onClick={() => setOpen(true)}
      >
        {textButton}
      </Button>

      <DialogContent className="h-[90vh] overflow-auto">
        <DialogHeader className="my-2">
          <DialogTitle className="text-center uppercase">
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

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Estado del proyecto</FormLabel>
                    <Select
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione un estado" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pending">Pendiente</SelectItem>
                        <SelectItem value="in-progress">En progreso</SelectItem>
                        <SelectItem value="finished">Finalizado</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Link del proyecto</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="url"
                        placeholder="Ingrese la URL del proyecto"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Imagen del proyecto</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="url"
                        placeholder="Ingrese la URL del proyecto"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stack"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel>Stack del proyecto</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="Text"
                        placeholder="Ingrese el stack del proyecto"
                      />
                    </FormControl>
                    <FormDescription>
                      Ingrese el stack separando por comas (Excel, Word, etc)
                    </FormDescription>
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
                          onChange={field.onChange}
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
                      <FormLabel
                        className={status !== "finished" ? "opacity-50" : ""}
                      >
                        Fecha de finalizacion
                      </FormLabel>
                      <FormControl>
                        <InputDate
                          value={field.value}
                          customClass="w-full"
                          onChange={field.onChange}
                          disabled={status !== "finished"}
                          disabledDays={{
                            before: startDate || new Date(),
                            after: new Date(),
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* <pre>
                {JSON.stringify(form.getValues(), null, 2)}
              </pre> */}

              <div className="col-span-2 flex justify-center">
                <Button
                  type="submit"
                  className="w-2/6 mx-auto my-6"
                  // disabled={!form.formState.isValid}
                >
                  {isPending ? <Spinner /> : "Actualizar"}
                </Button>
              </div>
            </form>
          </Form>
        </div>

      </DialogContent>
    </Dialog>
  )
}
