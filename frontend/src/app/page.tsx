"use client";
import { Button } from "antd";
import Link from "next/link";
import '@ant-design/v5-patch-for-react-19';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import LanguageSelector from "@/components/language-selector";
import { Greet } from "../../wailsjs/go/main/App";

export default function Home() {
    const { t } = useTranslation();
    const [greeting, setGreeting] = useState("");

    useEffect(() => {
        const fetchGreeting = async () => {
            try {
                const message = await Greet("User");
                setGreeting(message);
            } catch (error) {
                console.error("Error al llamar Greet:", error);
                setGreeting("");
            }
        };
        fetchGreeting();
    }, []);

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
                {greeting && <p>{greeting}</p>}
            </div>
        </div>
    );
}
