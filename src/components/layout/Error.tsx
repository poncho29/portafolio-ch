import { CircleX } from "lucide-react";

interface Props {
  errorMessage: string | null;
}

export const Error = ({ errorMessage }: Props) => {
  return (
    <div className=' w-full h-full flex items-center justify-center animate-fadeIn'>
      <div className="flex flex-col items-center gap-4">
        <CircleX className="size-10 text-red-500" />

        <p className='text-2xl font-bold text-center text-red-500'>
          {errorMessage || "Ups, algo salió mal"}
        </p>
      </div>
    </div>
  )
}
