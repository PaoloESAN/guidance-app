"use client";
import { Button, Card, Typography } from "antd";
import { ArrowRight, Sparkles, Brain, Briefcase, Compass } from "lucide-react";
import Link from "next/link";
import { useTranslation } from 'react-i18next';
import LanguageSelector from "@/components/language-selector";
import ButtonTheme from "@/components/buttonTheme";

const { Title, Paragraph } = Typography;

export default function Home() {
    const { t } = useTranslation();

    return (
        <div className="h-screen overflow-hidden flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
            {/* Navbar */}
            <nav className="w-full px-6 py-4 flex justify-between items-center backdrop-blur-sm fixed top-0 z-50 bg-white/50 dark:bg-black/20 border-b border-gray-200/50 dark:border-gray-800/50">
                <div className="flex items-center gap-2">
                    <Compass className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                        Guidance App
                    </span>
                </div>
                <LanguageSelector />
            </nav>

            {/* Hero Section */}
            <main className="flex-grow flex flex-col pt-24 justify-center relative overflow-hidden">
                {/* Fondo */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-500/20 dark:bg-purple-500/10 rounded-full blur-[100px] -z-10 pointer-events-none" />

                <div className="container mx-auto px-6 py-12 lg:py-24 flex flex-col items-center text-center gap-12 z-10">
                    <div className="max-w-4xl space-y-8 animate-fade-in-up">
                        <div className="flex justify-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium border border-blue-200 dark:border-blue-800">
                                <Sparkles size={16} />
                                <span>Potenciado por IA</span>
                            </div>
                        </div>

                        <Title level={1} className="!text-5xl md:!text-6xl lg:!text-7xl !font-extrabold !mb-0 tracking-tight text-slate-900 dark:text-white leading-tight">
                            {t('home.welcome')}
                        </Title>

                        <Paragraph className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                            {t('home.subtitle')}
                        </Paragraph>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <Link href="/form">
                                <Button type="primary" size="large" icon={<ArrowRight size={20} />} className="h-14 px-10 text-lg rounded-full shadow-xl shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105 transition-all duration-300">
                                    {t('home.goToForm')}
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-12 opacity-80 hover:opacity-100 transition-opacity duration-500">
                        <div className="p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 flex flex-col items-center gap-3 hover:-translate-y-1 transition-transform">
                            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                <Brain size={24} />
                            </div>
                            <h3 className="font-semibold text-slate-800 dark:text-slate-200">{t('home.features.ai')}</h3>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 flex flex-col items-center gap-3 hover:-translate-y-1 transition-transform">
                            <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                                <Briefcase size={24} />
                            </div>
                            <h3 className="font-semibold text-slate-800 dark:text-slate-200">{t('home.features.jobs')}</h3>
                        </div>
                        <div className="p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 flex flex-col items-center gap-3 hover:-translate-y-1 transition-transform">
                            <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400">
                                <Compass size={24} />
                            </div>
                            <h3 className="font-semibold text-slate-800 dark:text-slate-200">Orientación Total</h3>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
