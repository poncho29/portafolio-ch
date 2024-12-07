import Link from 'next/link';

import { Linkedin } from 'lucide-react';

import { LinkHeader } from './LinkHeader';

import { MENU_LINKS } from '../../../public/data/menu';

export const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-4 ">
        <nav>
          <ul className="flex gap-x-4">
            {MENU_LINKS.map((link) => (
              <li key={link.id}>
                <LinkHeader href={link.href} label={link.label} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex gap-x-4">
          <Link href="https://www.linkedin.com/in/sebastianmeneses29/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="h-6 w-6" />
          </Link>
        </div>
      </div>

      <div className="text-center pb-3">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Camilo Hern&aacute;ndez
          <span className='hidden sm:inline'>&nbsp;-&nbsp;</span>
          <br className="sm:hidden" />
          Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}