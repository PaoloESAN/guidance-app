'use client';

import { ReactNode, useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n/config';

interface I18nProviderProps {
    children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (!i18n.isInitialized) {
            i18n.init().then(() => {
                setIsInitialized(true);
            });
        } else {
            setIsInitialized(true);
        }
    }, []);

    if (!isInitialized) {
        return null;
    }

    return (
        <I18nextProvider i18n={i18n}>
            {children}
        </I18nextProvider>
    );
}
