import { useState, useEffect } from 'react';

/**
 * useScrollSpy – erkennt automatisch, welche Sektion gerade im Viewport sichtbar ist.
 * @param sektionenIds Array mit den IDs der zu beobachtenden Sektionen
 * @param rootMargin  Offset für den Viewport (z.B. '-30% 0px -60% 0px' bedeutet: Sektion muss 30% von oben sichtbar sein)
 */
const useScrollSpy = (sektionenIds: string[], rootMargin = '-20% 0px -70% 0px'): string => {
    const [aktiveSektionId, setAktiveSektionId] = useState<string>('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (eintraege) => {
                eintraege.forEach((eintrag) => {
                    if (eintrag.isIntersecting) {
                        setAktiveSektionId(eintrag.target.id);
                    }
                });
            },
            { rootMargin }
        );

        // Alle Sektionen beobachten
        sektionenIds.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [sektionenIds, rootMargin]);

    return aktiveSektionId;
};

export default useScrollSpy;
