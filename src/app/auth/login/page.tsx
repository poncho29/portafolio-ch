import { FormLogin } from "@/components/auth";

export default function AuthPage() {
  return (
    <div className="min-w-96">
      <h2 className="text-2xl font-bold mb-4">Iniciar sesión</h2>

      <FormLogin />
    </div>
  );
}