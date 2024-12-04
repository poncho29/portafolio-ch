"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IHome } from "@/interfaces/home.interface";
import { useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  data?: IHome;
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
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      form.setValue("name", data.name);
      form.setValue("age", data.age);
      form.setValue("email", data.email);
      form.setValue("profession", data.profession);
      form.setValue("description", data.description);
      form.setValue("address", data.address);
      form.setValue("phone", data?.phone || "");
      form.setValue("urlCurriculum", data.urlCurriculum);
      form.setValue("linkedin", data.linkedin);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
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
                  <Input type="text" placeholder="Ingrese su nombre completo" {...field} />
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
                  type="number"
                  min={0}
                  placeholder="Ingrese su edad"
                  {...field}
                  value={field.value || ""}
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
                    placeholder="Ingrese su correo electrónico"
                    type="email"
                    {...field}
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
                  <Input type="text" placeholder="Ingrese su profesión" {...field} />
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
                  <Input type="text" placeholder="Ingrese su dirección" {...field} />
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
                  <Input type="tel" placeholder="Ingrese su teléfono" {...field} />
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
                  <Input type="url" placeholder="Ingrese la URL de su currículum" {...field} />
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
                  <Input type="url" placeholder="Ingrese la URL de su LinkedIn" {...field} />
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
                    rows={8}
                    placeholder="Ingrese su descripción"
                    className="resize-none"
                    {...field}
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
            Actualizar
          </Button>
        </div>
      </form>
    </Form>
  )
}
