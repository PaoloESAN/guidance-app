'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, Row, Col, Empty, Button, Badge, Spin, Typography } from 'antd';
import { Scraping } from '../../../wailsjs/go/main/App';
import { utils } from '../../../wailsjs/go/models';
import LanguageSelector from '@/components/language-selector';
import Link from 'next/link';
import { Compass, MapPin, Building2, ExternalLink, ArrowLeft, Search } from 'lucide-react';

export default function EmpleosPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [jobs, setJobs] = useState<utils.Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [oficio, setOficio] = useState<string | null>(null);

    useEffect(() => {
        const fetchJobs = async () => {
            const oficioParam = searchParams.get('oficio');

            if (!oficioParam) {
                router.push('/');
                return;
            }

            setOficio(oficioParam.toLowerCase());
            setLoading(true);

            try {
                const scrapedJobs = await Scraping(`https://pe.linkedin.com/jobs/search?keywords=${encodeURI(oficioParam)}&location=Per%C3%BA&geoId=102927786`);
                setJobs(scrapedJobs);
            } catch (error) {
                console.error('Error al hacer scraping:', error);
                setJobs([]);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, [searchParams, router]);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 transition-colors duration-300">
            {/* Navbar */}
            <nav className="w-full px-6 py-4 flex justify-between items-center backdrop-blur-sm fixed top-0 z-50 bg-white/50 dark:bg-black/20 border-b border-gray-200/50 dark:border-gray-800/50">
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <Compass className="w-8 h-8 text-white" />
                    <span className="text-xl font-bold text-white">
                        Guidance App
                    </span>
                </Link>
                <div className="flex items-center gap-4">
                    <LanguageSelector />
                </div>
            </nav>

            <div className="flex-grow pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-12">
                        <Button
                            type="text"
                            icon={<ArrowLeft size={20} />}
                            onClick={() => router.back()}
                            className="mb-6 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
                        >
                            Volver
                        </Button>

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h1 className="text-4xl font-bold mb-2 text-slate-900 dark:text-white flex items-center gap-3">
                                    Empleos de <span className="capitalize text-blue-600 dark:text-blue-400">{oficio}</span>
                                </h1>
                                <p className="text-slate-600 dark:text-slate-400 text-lg flex items-center gap-2">
                                    <Search size={18} />
                                    Se encontraron <Badge count={jobs.length} showZero color="#2563eb" /> oportunidades disponibles
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <Spin size="large" />
                        </div>
                    ) : jobs.length > 0 ? (
                        <Row gutter={[24, 24]}>
                            {jobs.map((job, index) => (
                                <Col xs={24} sm={12} lg={8} key={index}>
                                    <Card
                                        className="h-full shadow-lg hover:shadow-xl transition-all duration-300 border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl flex flex-col"
                                        styles={{ body: { height: '100%', display: 'flex', flexDirection: 'column' } }}
                                    >
                                        <div className="flex-grow">
                                            <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white line-clamp-2" title={job.title}>
                                                {job.title}
                                            </h3>

                                            <div className="space-y-3 mb-6">
                                                <div className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                                                    <Building2 size={18} className="mt-1 shrink-0" />
                                                    <span className="font-medium">{job.company}</span>
                                                </div>
                                                <div className="flex items-start gap-2 text-slate-500 dark:text-slate-400">
                                                    <MapPin size={18} className="mt-1 shrink-0" />
                                                    <span>{job.location}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <Button
                                            type="primary"
                                            block
                                            size="large"
                                            href={job.link}
                                            target="_blank"
                                            icon={<ExternalLink size={18} />}
                                            className="mt-auto bg-blue-600 hover:bg-blue-700 border-none flex items-center justify-center gap-2"
                                        >
                                            Aplicar ahora
                                        </Button>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <Card className="text-center py-16 border-0 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm">
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                description={
                                    <span className="text-slate-500 dark:text-slate-400 text-lg">
                                        No hay empleos disponibles para "{oficio}" en este momento
                                    </span>
                                }
                            >
                                <Button type="primary" onClick={() => router.push('/')} className="mt-4">
                                    Volver al inicio
                                </Button>
                            </Empty>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
