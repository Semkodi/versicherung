import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface MetadataConfig {
    title: string;
    description: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    type?: string;
}

export const usePageMetadata = (config: MetadataConfig) => {
    const ort = useLocation();

    useEffect(() => {
        // 1. Titel setzen
        document.title = config.title;

        // Hilfsfunktion zum Setzen oder Aktualisieren von Meta-Tags
        const setMetaTag = (attrName: string, attrVal: string, contentVal: string) => {
            let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute(attrName, attrVal);
                document.head.appendChild(element);
            }
            element.setAttribute('content', contentVal);
        };

        // Hilfsfunktion zum Setzen oder Aktualisieren von Link-Tags
        const setLinkTag = (relVal: string, hrefVal: string) => {
            let element = document.querySelector(`link[rel="${relVal}"]`);
            if (!element) {
                element = document.createElement('link');
                element.setAttribute('rel', relVal);
                document.head.appendChild(element);
            }
            element.setAttribute('href', hrefVal);
        };

        // 2. Meta-Description setzen
        setMetaTag('name', 'description', config.description);

        // 3. Canonical Link setzen (deutschlandweite Haupt-URL)
        const canonicalUrl = `https://simply-switch.de/versicherung${ort.pathname === '/' ? '' : ort.pathname}`;
        setLinkTag('canonical', canonicalUrl);

        // 4. Open Graph Meta-Tags für Social Media Sharing (WhatsApp, LinkedIn, etc.)
        setMetaTag('property', 'og:title', config.ogTitle || config.title);
        setMetaTag('property', 'og:description', config.ogDescription || config.description);
        setMetaTag('property', 'og:url', canonicalUrl);
        setMetaTag('property', 'og:type', config.type || 'website');
        if (config.ogImage) {
            setMetaTag('property', 'og:image', config.ogImage);
        }
    }, [config, ort.pathname]);
};
