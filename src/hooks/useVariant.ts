import { useEffect, useState } from 'react';

type Variant = 'A' | 'B';

export default function useVariant(): { variant: Variant; setVariant: (v: Variant) => void } {
    const [variant, setVariantState] = useState<Variant>('A');

    useEffect(() => {
        try {
            const url = new URL(window.location.href);
            const param = url.searchParams.get('variant');
            const stored = localStorage.getItem('site_variant');
            if (param === 'B' || stored === 'B') {
                setVariantState('B');
            } else {
                setVariantState('A');
            }
        } catch (e) {
            setVariantState('A');
        }
    }, []);

    const setVariant = (v: Variant) => {
        try {
            localStorage.setItem('site_variant', v);
        } catch (e) {
            /* ignore */
        }
        setVariantState(v);
    };

    return { variant, setVariant };
}
