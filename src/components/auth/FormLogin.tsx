'use client';

import { useState, useTransition } from 'react';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { z } from 'zod';

import { loginAction } from "@/actions/login.action";

import { loginSchema } from '@/utils';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormMessage,
  FormField,
  FormLabel,
  FormItem,
  Form,
} from "@/components/ui/form";

import { Eye, EyeOff } from 'lucide-react';

export const FormLogin = () => {
  const router = useRouter();

  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    setError(null);
    startTransition(async() => {
      const res = await loginAction(values);
      
      if (!res.success) {
        setError(res.message);
      } else {
        router.push('/admin');
      }
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Ingrese su correo electrónico"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Ingrese su contraseña"
                    {...field}
                    className="border-2 border-gray-300 rounded-md px-3 py-2 w-full"
                  />

                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-500" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && (
          <FormMessage>{error}</FormMessage>
        )}

        <Button
          type="submit"
          disabled={isPending}
          className='w-full'
        >
          Enviar
        </Button>
      </form>
      
      <div className="flex justify-center mt-4">
        <Link
          href="/auth/register"
          className="text-sm underline"
        >
          Crear una cuenta
        </Link>
      </div>
    </Form>
  )
}
