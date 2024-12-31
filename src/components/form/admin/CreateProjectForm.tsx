'use client';

import { useEffect, useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import { createProject, updateProject } from "@/actions/project-action";

import { ProjectFormSchema } from "@/utils";

import { FormDescription, FormMessage, FormControl, FormField, FormLabel, FormItem, Form } from "@/components/ui/form";
import { SelectContent, SelectTrigger, SelectValue, SelectItem, Select } from "@/components/ui/select"
import { DialogContent, DialogHeader, DialogTitle, Dialog } from "@/components/ui/dialog";
import { InputDate, Spinner } from "@/components/common";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProjectFormSchema>>({
    resolver: zodResolver(ProjectFormSchema),
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

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      form.reset({
        title: data.title,
        description: data?.description || "",
        startDate: new Date(data.startDate),
        endDate: data?.endDate ? new Date(data.endDate) : undefined,
        status: data.status,
        imageUrl: data.imageUrl,
        url: data?.url || "",
        stack: data.stack.join(", ")
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const status = form.watch("status");
  const startDate = form.watch("startDate");
  const endDate = form.watch("endDate");

  const onSubmit = async (values: z.infer<typeof ProjectFormSchema>) => {
    // console.log(values);

    const formattedValues = {
      ...values,
      startDate: startDate.toISOString(),
      endDate: endDate ? endDate.toISOString() : undefined,
      stack: values.stack.split(", "),
    };

    console.log(formattedValues);

    startTransition( async () => {
      if (data && data?.id) {
        const { error } = await updateProject(data.id, formattedValues);

        if (error ) {
          toast.error(error);
        } else {
          toast.success("Proyecto actualizado correctamente");
          form.reset();
          setOpen(false);
        }
      } else {
        const { error } = await createProject(formattedValues);

        if (error ) {
          toast.error(error);
        } else {
          toast.success("Proyecto creado correctamente");
          form.reset();
          setOpen(false);
        }
      }      
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
                      onValueChange={(value) => {
                        field.onChange(value);
                        form.setValue("endDate", undefined);
                      }}
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
                        type="text"
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
                          onChange={(date) => {
                            field.onChange(date);
                            if (form.getValues("endDate"))
                              form.setValue("endDate", undefined);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) =>  (
                    <FormItem className="flex flex-col mb-4">
                      <FormLabel
                        className={status !== "finished" ? "opacity-50" : ""}
                      >
                        Fecha de finalizacion
                      </FormLabel>
                      <FormControl>
                        <InputDate
                          value={endDate}
                          customClass="w-full"
                          onChange={field.onChange}
                          disabled={status !== "finished"}
                          disabledDays={{
                            before: startDate || new Date(),
                            after: endDate || new Date(),
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
                  disabled={!form.formState.isValid}
                >
                  {isPending ? <Spinner /> : !data?.id ? "Crear" : "Actualizar"}
                </Button>
              </div>
            </form>
          </Form>
        </div>

      </DialogContent>
    </Dialog>
  )
}
