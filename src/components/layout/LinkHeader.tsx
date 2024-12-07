'use client';

import Link from 'next/link';

import { cn } from '@/lib/utils';

import { useVisibleSection } from '@/hooks';

interface Props {
  href: string;
  label: string;
}

export const LinkHeader = ({ href, label }: Props) => {
  const currentSection = useVisibleSection(['inicio', 'experiencia', 'proyectos', 'habilidades', 'contacto']);
  console.log(currentSection, href);
  
  return (
    <Link
      href={href}
      className={cn(
        'w-28 flex items-center justify-center p-2 rounded-md cursor-pointer transition-all duration-300 hover:font-semibold hover:bg-yellow-300',
        {
          'font-bold bg-sky bg-yellow-300': href.includes(currentSection),
        }
      )}
    >
      {label}
    </Link>
  )
}
