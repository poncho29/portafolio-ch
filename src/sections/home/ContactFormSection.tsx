'use client';

import { useEffect, useState } from 'react';

import { sendContactForm } from '@/actions';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { IContactFormData, IContactFormErrors } from '@/interfaces/contact-form.interface';

export const ContactFormSection = () => {
  const [formData, setFormData] = useState<IContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<IContactFormErrors>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (submitSuccess || errors.submit) {
      setShowAlert(true);

      const timer = setTimeout(() => {
        setShowAlert(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [submitSuccess, errors.submit])

  const validateField = (name: keyof IContactFormData, value: string): string => {
    switch (name) {
      case 'name':
        return value.trim() ? '' : 'El nombre es requerido'
      case 'email':
        return value.trim() 
          ? (/\S+@\S+\.\S+/.test(value) ? '' : 'El email no es válido')
          : 'El email es requerido'
      case 'message':
        return value.trim() ? '' : 'El mensaje es requerido'
      default:
        return ''
    }
  }

  const validateForm = (): boolean => {
    const newErrors: IContactFormErrors = {}
    let isValid = true

    Object.keys(formData).forEach((key) => {
      const error = validateField(key as keyof IContactFormData, formData[key as keyof IContactFormData])
      if (error) {
        newErrors[key as keyof IContactFormErrors] = error
        isValid = false
      }
    })

    setErrors(newErrors)
    return isValid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    const error = validateField(name as keyof IContactFormData, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const error = validateField(name as keyof IContactFormData, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    setErrors({});

    if (validateForm()) {
      const response = await sendContactForm({ body: formData })

      console.log(response);

      if (!response.success) {
        setErrors({ ...errors, submit: "Ups, Algo salió mal. Por favor, inténtalo de nuevo." });
      } else {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', message: '' });
      }
    }

    setIsSubmitting(false)
  }

  return (
    <section id="contacto" className="my-28">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto py-4 space-y-6">
        <h2 className="text-3xl font-bold mb-4">
          Contáctame
        </h2>
        
        {showAlert && submitSuccess && (
          <Alert className="bg-green-100 border-green-400 text-green-700">
            <AlertDescription>¡Formulario enviado! Responderé lo más pronto posible.</AlertDescription>
          </Alert>
        )}

        {showAlert && errors.submit && (
          <Alert variant="destructive">
            <AlertDescription>{errors.submit}</AlertDescription>
          </Alert>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className='font-semibold'>Nombre</Label>
            <Input
              id="name"
              name="name"
              placeholder="Tu nombre"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className='font-semibold'>Correo electrónico</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message" className='font-semibold'>Mensaje</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Escribe tu mensaje aquí"
            className="min-h-[150px]"
            value={formData.message}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
        </div>
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </Button>
      </form>
    </section>
  )
}
