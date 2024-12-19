import { getHome } from "@/actions/home.action";

import { ContactFormSection, IAmSection, ProjectSection } from "@/sections/home";

import { ScrollToTopButton } from "@/components/common";

export default async function Home() {
  const { data, error} = await getHome();

  return (
    <>
      {data && !error ? (
        <>
          <IAmSection data={data} />

          <section id="experiencia" className="py-28 h-[500px]">
            <h2 className="text-3xl font-bold mb-4">Experiencia</h2>
          </section>
    
          <ProjectSection />

          <section id="habilidades" className="py-28 h-[500px]">
            <h2 className="text-3xl font-bold mb-4">Habilidades</h2>
          </section>
    
          <ContactFormSection />
    
          <ScrollToTopButton />
        </>
      ) : (
        <p>{error}</p>
      )}
    </>
  );
}
