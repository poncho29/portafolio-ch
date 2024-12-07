import Image from 'next/image';
import Link from 'next/link';

import { Linkedin } from 'lucide-react';

import { DownloadButton } from '@/components/common';
import { Button } from '@/components/ui/button';

import { IHome } from '@/interfaces';

interface Props {
  data: IHome
}

export const IAmSection = ({ data }: Props) => {
  return (
    <section
      id="inicio"
      className="flex flex-col-reverse md:flex-row items-center justify-between gap-6 my-24"
    >
      <div className="space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          { data.name }
        </h1>

        <p className="max-w-3xl text-xl text-muted-foreground">
          { data.description }
        </p>

        <div className="flex flex-col gap-y-6 sm:gap-x-4 sm:flex-row">
          <div className="flex gap-x-4">
            <Button asChild>
              <Link href="#contact">Cont&aacute;ctame</Link>
            </Button>

            <DownloadButton
              urlFile='/cv-sebastian-meneses.pdf'
              fileName='cv-sebastian-meneses.pdf'
              buttonText='Descargar CV'
            />
          </div>

          <div className="flex items-center gap-x-4">
            <Link href={data.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>

      <Image
        src="/default-user.webp"
        alt="Camilo Hernandez"
        width={300}
        height={300}
        className="shadow-2xl shadow-black/50"
        priority
      />
    </section>
  )
}
