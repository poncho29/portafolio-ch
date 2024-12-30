import { z } from "zod";

export const ProjectFormSchema = z.object({
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
  if (data.status === "finished" && !data.endDate) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "La fecha de finalización es obligatoria",
      path: ["endDate"],
    });
    return;
  }

  // Validar que `endDate` sea posterior a `startDate`
  if (data.startDate && data.endDate && data.endDate < data.startDate) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "La fecha de finalización debe ser posterior a la de inicio",
      path: ["endDate"],
    });
  }
});