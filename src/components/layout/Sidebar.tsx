import { FolderOpenDot, House } from 'lucide-react';

import { LogoutButton } from './LogoutButton';
import { LinkSidebar } from './LinkSidebar';

export const Sidebar = () => {
  return (
    <div className='w-80 h-screen flex flex-col p-4 bg-slate-200'>
      <div className='pb-8 border-b border-gray-200'>
        <h4 className='text-3xl font-bold'>Menú</h4>
      </div>

      <ul className='flex flex-col gap-2'>
        <LinkSidebar href="/admin" text="Home" icon={<House />} />
        <LinkSidebar href="/admin/proyectos" text="Proyectos" icon={<FolderOpenDot />} />
      </ul>

      <div className=' mt-auto'>
        <LogoutButton />
      </div>
    </div>
  )
}
