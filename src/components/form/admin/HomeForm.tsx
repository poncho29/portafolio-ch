"use client";

import { useEffect, useTransition } from "react";
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import toast from "react-hot-toast";
import { z } from "zod";

import { updateHome } from "@/actions/home.action";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/common";
import { Input } from "@/components/ui/input";
import {
  FormMessage,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  Form,
} from "@/components/ui/form";

import { IHome } from "@/interfaces/home.interface";

interface Props {
  data: IHome | null;
}

const formSchema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }),
  age: z
    .number({ invalid_type_error: 'La edad es requerida' })
    .nonnegative({ message: 'La edad debe no puder ser negativa' }),
  email: z
    .string()
    .email({ message: 'El correo electrónico debe ser válido' }),
  profession: z.string().min(1, { message: "La profesión es requerida" }),
  description: z
    .string()
    .min(1, { message: "La descripción es requerida" })
    .max(1000, { message: "La descripción debe tener máximo 1000 caracteres" }),
  address: z.string().min(1, { message: "La dirección es requerida" }),
  phone: z
    .string()
    .min(1, { message: "El teléfono es requerido" })
    .regex(/^\+?\d{7,15}$/, { message: "El teléfono debe ser válido" }),
  urlCurriculum: z.string().url({ message: "La URL del currículum debe ser válida" }),
  linkedin: z.string().url({ message: "La URL de LinkedIn debe ser válida" }),
});

export const HomeForm = ({ data }: Props) => {
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      form.reset({
        name: data.name || "",
        age: data.age || undefined,
        email: data.email || "",
        profession: data.profession || "",
        description: data.description || "",
        address: data.address || "",
        phone: data.phone || "",
        urlCurriculum: data.urlCurriculum || "",
        linkedin: data.linkedin || "",
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      age: undefined,
      email: "",
      profession: "",
      description: "",
      address: "",
      phone: "",
      urlCurriculum: "",
      linkedin: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!data || !data?.id) {
      toast.error("No se pudo actualizar el perfil");
      return;
    }

    startTransition( async () => {
      const { error } = await updateHome(data.id, values);

      if (error) {
        toast.error(error);
      } else {
        toast.success("Perfil actualizado correctamente");
      }
    });
  }
  
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="lg:grid lg:grid-cols-2 gap-4"
      >

        <div className="space-y-4 mb-4 lg:mb-0">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre Completo</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Ingrese su nombre completo"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Edad</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    min={0}
                    placeholder="Ingrese su edad"
                    value={field.value || ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value === "" ? undefined : Number(value))
                    }}
                    onBlur={field.onBlur}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo Electrónico</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="Ingrese su correo electrónico"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="profession"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profesión</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Ingrese su profesión"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dirección</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Ingrese su dirección"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Teléfono</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="tel"
                    placeholder="Ingrese su teléfono"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="urlCurriculum"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL Currículum</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="url"
                    placeholder="Ingrese la URL de su currículum"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL LinkedIn</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="url"
                    placeholder="Ingrese la URL de su LinkedIn"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="col-span-2">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={8}
                    placeholder="Ingrese su descripción"
                    className="resize-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        
        <div className="col-span-2 flex justify-center">
          <Button
            type="submit"
            className="w-2/6 mx-auto my-8"
            disabled={!form.formState.isValid}
          >
            {isPending ? <Spinner /> : "Actualizar"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
