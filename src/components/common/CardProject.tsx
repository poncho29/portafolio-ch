import Image from 'next/image';
// import Link from 'next/link';

import { 
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
  Card,
} from '../ui/card';

import { IProject } from '@/interfaces';

interface Props {
  project: IProject;
}

export const CardProject = ({ project }: Props) => {
  const { name, description, urlImage, stack } = project

  return (
    <>
      <Card className='border border-yellow-200'>
        <CardHeader className='px-5 pb-3'>
          <Image
            src={urlImage}
            alt={`Project ${name}`}
            width={400}
            height={200}
            className="rounded-md mx-auto"
          />
        </CardHeader>

        <CardContent className='px-5'>
          <div className="flex flex-wrap gap-2 mb-2">
            {stack.map((item) => (
              <span key={item} className="text-sm">
                {item} |
              </span>
            ))}
          </div>
          <CardTitle className='text-sm mb-2'>{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
          
          {/* <div className='flex gap-4'>
            <Button asChild>
              <Link href={urlDemo} target='_blank'>Ver proyecto</Link>
            </Button>
            {isPrivate && urlDemoVideo ? (
              <Button asChild>
                <Link href={urlDemoVideo} target='_blank'>Ver demo</Link>
              </Button>
            ) : (
              <Button asChild>
                <Link href={urlCode} target='_blank'>Ver Codigo</Link>
              </Button>
            )}
          </div> */}
        </CardContent>
      </Card>
    </>
  )
}
