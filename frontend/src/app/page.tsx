"use client";
import { Button } from "antd";
import Link from "next/link";
import { useTranslation } from 'react-i18next';
import LanguageSelector from "@/components/language-selector";

export default function Home() {
    const { t } = useTranslation();

    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-screen min-w-max gap-8">
                <div className="absolute top-4 right-4">
                    <LanguageSelector />
                </div>
                <h1 className="text-4xl font-bold text-center">{t('home.welcome')}</h1>
                <Link href="/form">
                    <Button type="primary" size="large">
                        {t('home.goToForm')}
                    </Button>
                </Link>
            </div>
        </div>
    );
}
