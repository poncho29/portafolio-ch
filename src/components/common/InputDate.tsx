"use client";

import * as React from "react";

import { Calendar as CalendarIcon } from "lucide-react";
import { es } from "date-fns/locale";
import { format } from "date-fns";

import { cn } from "@/lib/utils";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";

interface Props {
  value: Date | undefined;
  placeholder?: string;
  customClass?: string;
  disabled?: boolean;
  disabledDays?: {
    before: Date;
    after: Date;
  };
  onChange: (date: Date | undefined) => void;
}

export const InputDate = ({
  value,
  customClass,
  placeholder = "Seleccione una fecha",
  disabled,
  disabledDays,
  onChange,
}: Props) => {
  return (
    <Popover>
      <PopoverTrigger
        asChild
        disabled={disabled}
      >
        <Button
          variant="outline"
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !value || disabled && "text-muted-foreground",
            customClass && customClass
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value ? format(value, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          initialFocus
          mode="single"
          locale={es}
          selected={value}
          disabled={disabledDays}
          onSelect={onChange}
        />
      </PopoverContent>
    </Popover>
  )
}
