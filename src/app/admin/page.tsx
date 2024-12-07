import { House } from 'lucide-react';

import { getHome } from '@/actions/home.action';

import { HomeForm } from '@/components/form';
import { Error } from '@/components/layout';

export default async function AdminPage() {
  const { data, error } = await getHome();
  
  return (
    <div className='animate-fadeIn'>
      <div className="flex items-center gap-2 mb-8">
        <House strokeWidth={2.5} className='size-7' />
        <h1 className='text-2xl font-bold'>Vista del Home</h1>
      </div>

      {!data || error ? (
        <Error errorMessage={error} />
      ) : (
        <HomeForm data={data} />
      )}

    </div>
  );
}