import { CardProject } from '@/components/common';

import { PROJECTS } from '../../../public/data/projects';

export const ProjectSection = () => {
  return (
    <section id="proyectos" className="py-28">
      <h2 className="text-3xl font-bold mb-4">Últimos proyectos</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <CardProject key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}
