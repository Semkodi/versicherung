import { useEffect } from 'react';

interface StructuredDataProps {
    data: Record<string, unknown>;
}

export const StructuredData = ({ data }: StructuredDataProps) => {
    useEffect(() => {
        const scriptId = 'structured-data-ld-json';
        let script = document.getElementById(scriptId) as HTMLScriptElement;

        if (!script) {
            script = document.createElement('script');
            script.id = scriptId;
            script.type = 'application/ld+json';
            document.head.appendChild(script);
        }

        script.text = JSON.stringify(data);

        return () => {
            const element = document.getElementById(scriptId);
            if (element) {
                element.remove();
            }
        };
    }, [data]);

    return null;
};
