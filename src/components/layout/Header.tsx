import { LinkHeader } from "./LinkHeader";

import { MENU_LINKS } from "../../../public/data/menu";

export const Header = () => {
  return (
    <header className="sticky top-0 w-full h-24 border-b z-50 bg-white md:h-16">
      <div className="h-full max-w-7xl flex flex-col items-center justify-between mx-auto py-2 px-6 md:flex-row md:py-0 xl:px-0">
        <span className="text-2xl font-bold uppercase italic">Camilo Hernández</span>

        <nav>
          <ul className="flex items-center gap-4">
            {MENU_LINKS.map((link) => (
              <li key={link.id}>
                <LinkHeader href={link.href} label={link.label} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
