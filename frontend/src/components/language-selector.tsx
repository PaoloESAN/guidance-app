'use client';

import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import { useEffect, useState } from 'react';

export default function LanguageSelector() {
    const { i18n } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

    useEffect(() => {
        setCurrentLanguage(i18n.language);
    }, [i18n.language]);

    const handleLanguageChange = (value: string) => {
        i18n.changeLanguage(value);
        localStorage.setItem('language', value);
        setCurrentLanguage(value);
    };

    return (
        <div className="flex items-center gap-2">
            <Select
                value={currentLanguage}
                onChange={handleLanguageChange}
                style={{ width: 120 }}
                options={[
                    { label: 'Español', value: 'es' },
                    { label: 'English', value: 'en' },
                ]}
            />
        </div>
    );
}
