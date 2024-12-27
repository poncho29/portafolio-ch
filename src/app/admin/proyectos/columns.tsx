"use client";

import { ColumnDef } from "@tanstack/react-table";

import { IProject } from "@/interfaces";

export const columns: ColumnDef<IProject>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Título",
  },
  {
    accessorKey: "description",
    header: "Descripción",
  },
  {
    accessorKey: "startDate",
    header: "Fecha de inicio",
  },
  {
    accessorKey: "endDate",
    header: "Fecha de fin",
  },
  {
    accessorKey: "status",
    header: "Estado",
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    accessorKey: "stack",
    header: "Stack",
  }
];
