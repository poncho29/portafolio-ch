import { Spinner } from "@/components/common";

export default function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Spinner />
    </div>
  )
}