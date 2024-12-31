import { FolderOpenDot } from 'lucide-react';

import { DataTable } from './data-table';
import { columns } from './columns';

import { getAllProjects } from '@/actions/project-action';

import { CreateProjectForm } from '@/components/form';
import { Error } from '@/components/layout';

export default async function ProjectPage() {
  const { data, error } = await getAllProjects();

  return (
    <div className='animate-fadeIn'>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <FolderOpenDot strokeWidth={2.5} className='size-7' />
          <h1 className='text-2xl font-bold'>Vista de Proyectos</h1>
        </div>

        <CreateProjectForm />
      </div>

      <div className="container mx-auto py-10">
        {error ? (
          <Error errorMessage={error} />
        ) : data && data.length > 0 && (
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </div>
  );
}