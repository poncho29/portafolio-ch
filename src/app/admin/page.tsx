import { House } from 'lucide-react';

import { HomeForm } from '@/components/form';
import { getHome } from '@/actions/home.action';

export default async function AdminPage() {
  const home = await getHome();
  console.log(home);
  
  return (
    <div>
      <div className="flex items-center gap-2 mb-8">
        <House strokeWidth={2.5} className='size-7' />
        <h1 className='text-2xl font-bold'>Vista del Home</h1>
      </div>

      <HomeForm data={home} />
    </div>
  );
}