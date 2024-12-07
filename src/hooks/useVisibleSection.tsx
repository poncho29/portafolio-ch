import { useEffect, useState } from "react";

export const useVisibleSection = (sectionIds: string[]) => {
  const [visibleSection, setVisibleSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find(entry => entry.isIntersecting);
        if (visibleEntry) {
          setVisibleSection(visibleEntry.target.id);
        }
      },
      { threshold: 1 }
    );

    sectionIds.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [sectionIds]);

  return visibleSection;
};