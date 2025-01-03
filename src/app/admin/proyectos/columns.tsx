"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { IProject } from "@/interfaces";

const handleTruncateText = (text: string, maxLength: number) => 
  text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

const handleFormatDate = (dateString: string) => {
  if (!dateString) return "-";

  const date = new Date(dateString);
  return format(date, "yyyy-MM-dd"); // Formato corto
};

const handleFormatStatus = (status: string) => {
  switch (status) {
    case "pending":
      return "Pendiente";
    case "in-progress":
      return "En progreso";
    case "finished":
      return "Finalizado";
    default:
      return status;
  }
}

export const columns: ColumnDef<IProject>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Título",
    cell: ({ row }) => (
      <div className="w-[120px]">
        {handleTruncateText(row.original.title || "", 60)}
      </div>
    ),
  },
  {
    accessorKey: "description",
    header: "Descripción",
    cell: ({ row }) => (
      <div className="w-[200px]">
        {handleTruncateText(row.original.description || "", 60)}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => (
      <div className="w-[80px] capitalize">
        {handleFormatStatus(row.original.status)}
      </div>
    ),
  },
  {
    accessorKey: "startDate",
    header: "Fecha de inicio",
    cell: ({ row }) => (
      <div className="w-[120px]">
        {handleFormatDate(row.original.startDate || "")}
      </div>
    ),
  },
  {
    accessorKey: "endDate",
    header: "Fecha de fin",
    cell: ({ row }) => (
      <div className="w-[120px]">
        {handleFormatDate(row.original.endDate || "")}
      </div>
    ),
  },
  {
    accessorKey: "url",
    header: "URL",
    cell: ({ row }) => (
      <div className="w-[120px]">
        {handleTruncateText(row.original.url || "", 40)}
      </div>
    ),
  },
  {
    accessorKey: "stack",
    header: "Stack",
    cell: ({ row }) => (
      <div className="w-[160px]">
        {handleTruncateText(row.original.stack ? row.original.stack.join(", ") : "-", 60)}
      </div>
    ),
  }
];
