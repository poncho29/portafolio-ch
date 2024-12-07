import { FolderOpenDot } from 'lucide-react';

export default function ProjectPage() {
  return (
    <div className='animate-fadeIn'>
      <div className="flex items-center gap-2 mb-8">
        <FolderOpenDot strokeWidth={2.5} className='size-7' />
        <h1 className='text-2xl font-bold'>Vista de Proyectos</h1>
      </div>

      <h2>Proyectos</h2>
    </div>
  );
}