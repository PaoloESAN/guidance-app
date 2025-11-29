'use client';

import '@ant-design/v5-patch-for-react-19';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, Row, Col, Empty, Button, Badge, Spin, Space } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { Scraping } from '../../../wailsjs/go/main/App';
import { utils } from '../../../wailsjs/go/models';
import ButtonTheme from '@/components/buttonTheme';
import LanguageSelector from '@/components/language-selector';

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



    if (loading) {
        return (
            <Spin size="large" fullscreen />
        );
    }

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-start mb-12">
                    <div>
                        <h1 className="text-4xl font-bold mb-2">
                            Empleos de <span className="font-bold capitalize">{oficio}</span>
                        </h1>
                        <p className="text-gray-600">
                            Se encontraron <Badge count={jobs.length} className="ml-2" /> oportunidades disponibles
                        </p>
                    </div>
                    <Space direction="horizontal" size="middle">
                        <Button
                            type="primary"
                            icon={<HomeOutlined />}
                            onClick={() => router.push('/')}
                        >
                            Inicio
                        </Button>
                        <ButtonTheme />
                        <LanguageSelector />
                    </Space>
                </div>

                {/* Jobs List */}
                {jobs.length > 0 ? (
                    <Row gutter={[24, 24]}>
                        {jobs.map((job, index) => (
                            <Col xs={24} sm={12} lg={8} key={index}>
                                <Card
                                    title={job.title}
                                    className="h-full"
                                >
                                    <p className='mb-2'>Compañia: {job.company}</p>
                                    <p className='mb-2'>Ubicación: {job.location}</p>
                                    <Button type='primary'><a href={job.link} target="_blank" rel="noopener noreferrer">Aplica Aquí</a></Button>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <Card className="text-center py-12">
                        <Empty
                            description={`No hay empleos disponibles para "${oficio}"`}
                            style={{ marginTop: 48 }}
                        >
                            <Button type="primary" onClick={() => router.push('/')}>
                                Volver al inicio
                            </Button>
                        </Empty>
                    </Card>
                )}
            </div>
        </div>
    );
}
