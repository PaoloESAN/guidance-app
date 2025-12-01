'use client';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import LanguageSelector from "./language-selector";
import { Form, Input, Select, Checkbox, Button, Card, Row, Col, Modal, Steps, Typography } from 'antd';
import { QueryGroqAPI, ObtenerTerminoBusqueda } from '../../wailsjs/go/main/App';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSupabase } from '@/hooks/useSupabase';
import { TablesInsert } from '../../database.types';
import { ArrowLeft, ArrowRight, Send, User, Brain, Briefcase, Hammer, Clock, HeartHandshake, Compass } from 'lucide-react';

const { Title, Text } = Typography;

interface FormData {
    fullName: string;
    age: number;
    gender: string;
    educationLevel: string;

    strengths: string[];
    strengthsDescription: string;

    laboralInterests: string;

    previousJobs: string;
    workExperienceDescription: string;

    trades: string[];
    otherTrade: string;

    workingHours: string;
    trainingPrograms: boolean;
    hasTransport: boolean;

    specialConsiderations: string;
    mainMotivation: string;
}

const steps = [
    { title: 'form.personalInfo', icon: <User size={20} />, fields: ['fullName', 'age', 'gender', 'educationLevel'] },
    { title: 'form.strengths', icon: <Brain size={20} />, fields: ['strengths', 'strengthsDescription'] },
    { title: 'form.laboralInterests', icon: <Briefcase size={20} />, fields: ['laboralInterests'] },
    { title: 'form.workExperience', icon: <Briefcase size={20} />, fields: ['previousJobs', 'workExperienceDescription'] },
    { title: 'form.tradesOfInterest', icon: <Hammer size={20} />, fields: ['trades', 'otherTrade'] },
    { title: 'form.availability', icon: <Clock size={20} />, fields: ['workingHours', 'trainingPrograms', 'hasTransport'] },
    { title: 'form.specialConsiderations', icon: <HeartHandshake size={20} />, fields: ['specialConsiderations', 'mainMotivation'] },
];

export default function Formulario() {
    const { t } = useTranslation();
    const { register, watch, handleSubmit, formState: { errors }, reset, control, trigger } = useForm<FormData>({
        defaultValues: {
            fullName: '',
            age: undefined as any,
            gender: '',
            educationLevel: '',
            strengths: [],
            strengthsDescription: '',
            laboralInterests: '',
            previousJobs: '',
            workExperienceDescription: '',
            trades: [],
            otherTrade: '',
            workingHours: '',
            trainingPrograms: false,
            hasTransport: false,
            specialConsiderations: '',
            mainMotivation: '',
        },
        mode: 'onSubmit'
    });

    const [isLoading, setIsLoading] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const { insertUser, insertRecomendation } = useSupabase();
    const [currentStep, setCurrentStep] = useState(0);
    const [direction, setDirection] = useState<'next' | 'prev'>('next');

    const selectedStrengths = watch('strengths');
    const selectedTrades = watch('trades');
    const selectedInterests = watch('laboralInterests');

    const router = useRouter();

    const getTranslatedValue = (key: string) => {
        return t((`form.${key}`), { lng: 'es' });
    };

    const getTranslatedTrades = () => {
        return selectedTrades.map((trade: string) => getTranslatedValue(trade));
    };

    const irEmpleos = async () => {
        try {
            const tradesLimpios = selectedTrades.map((trade: string) => trade.replace('tradeOptions.', ''));
            const terminoBusqueda = await ObtenerTerminoBusqueda(tradesLimpios);
            router.push(`/empleos?oficio=${encodeURIComponent(terminoBusqueda)}`);
        } catch (error) {
            console.error('Error al obtener término de búsqueda:', error);
            router.push(`/empleos?oficio=general`);
        }
    }

    const nextStep = async () => {
        const fields = steps[currentStep].fields;
        const isValid = await trigger(fields as any);
        if (isValid) {
            setDirection('next');
            setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
        }
    };

    const prevStep = () => {
        setDirection('prev');
        setCurrentStep((prev) => Math.max(prev - 1, 0));
    };

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        setSubmitMessage('');

        try {
            console.log('Datos del formulario:', data);

            const prompt = `Basándote en el siguiente perfil de usuario, proporciona recomendaciones detalladas de oficios y carreras vocacionales:

INFORMACIÓN PERSONAL:
- Nombre: ${data.fullName}
- Edad: ${data.age} años
- Género: ${getTranslatedValue(data.gender)}
- Nivel educativo: ${getTranslatedValue(data.educationLevel)}

FORTALEZAS Y HABILIDADES:
- Fortalezas seleccionadas: ${data.strengths.map((s: string) => getTranslatedValue(s)).join(', ') || 'No especificadas'}
- Descripción adicional: ${data.strengthsDescription || 'No proporcionada'}

INTERESES LABORALES:
- Tipo de trabajo preferido: ${getTranslatedValue(data.laboralInterests)}

EXPERIENCIA LABORAL:
- Experiencia previa: ${getTranslatedValue(data.previousJobs)}
- Descripción de experiencia: ${data.workExperienceDescription || 'No proporcionada'}

OFICIOS DE INTERÉS:
- Oficios seleccionados: ${getTranslatedTrades().join(', ') || 'No especificados'}
- Otros oficios de interés: ${data.otherTrade || 'No especificados'}

DISPONIBILIDAD:
- Horarios disponibles: ${getTranslatedValue(data.workingHours)}
- Interesado en programas de capacitación: ${data.trainingPrograms ? 'Sí' : 'No'}
- Tiene transporte: ${data.hasTransport ? 'Sí' : 'No'}

CONSIDERACIONES ESPECIALES:
- Consideraciones: ${data.specialConsiderations || 'No hay consideraciones especiales'}
- Motivación principal: ${data.mainMotivation}

Por favor, proporciona:
1. Las 3-5 oficios más recomendados según el perfil del usuario
2. Por qué cada oficio es una buena opción basándose en sus fortalezas e intereses
3. Requisitos de formación necesarios
4. Perspectivas de empleo y salario potencial
5. Próximos pasos recomendados para iniciar en estos oficios`;

            const usuarioData: TablesInsert<'perfiles_usuarios'> = {
                nombre_completo: data.fullName,
                edad: data.age,
                genero: data.gender,
                nivel_educativo: data.educationLevel,
                fortalezas: data.strengths.length > 0 ? data.strengths : null,
                descripcion_fortalezas: data.strengthsDescription || null,
                intereses_laborales: data.laboralInterests,
                empleos_previos: data.previousJobs,
                descripcion_experiencia: data.workExperienceDescription || null,
                oficios: data.trades.length > 0 ? data.trades : null,
                otro_oficio: data.otherTrade || null,
                horario_disponible: data.workingHours,
                interes_programas_capacitacion: data.trainingPrograms,
                tiene_transporte: data.hasTransport,
                consideraciones_especiales: data.specialConsiderations || null,
                motivacion_principal: data.mainMotivation,
                idioma: 'es'
            };

            const usuarioGuardado = await insertUser(usuarioData);

            if (usuarioGuardado && usuarioGuardado.length > 0) {
                const usuarioId = usuarioGuardado[0].id;

                const respuesta = await QueryGroqAPI(prompt);
                setModalContent(respuesta);
                setModalVisible(true);

                await insertRecomendation(usuarioId, respuesta);
            }

            setSubmitMessage(t('form.successMessage') || 'Formulario enviado correctamente');
        } catch (error) {
            console.error('Error:', error);
            setSubmitMessage(t('form.errorMessage') || 'Error al enviar el formulario');
        } finally {
            setIsLoading(false);
        }
    };

    const strengthOptions = [
        'strengthOptions.teamwork',
        'strengthOptions.creativity',
        'strengthOptions.leadership',
        'strengthOptions.organization',
        'strengthOptions.attention',
        'strengthOptions.problemSolving',
        'strengthOptions.communication',
        'strengthOptions.patience',
        'strengthOptions.teaching',
        'strengthOptions.crafts',
        'strengthOptions.sports',
        'strengthOptions.music',
    ];

    const interestOptions = [
        'interestOptions.workWithPeople',
        'interestOptions.workWithMachines',
        'interestOptions.manualWork',
        'interestOptions.administrativeWork',
        'interestOptions.creativeWork',
        'interestOptions.outdoorWork',
        'interestOptions.physicalWork',
        'interestOptions.officeWork',
        'interestOptions.teamWork',
        'interestOptions.independentWork',
        'interestOptions.healthSector',
        'interestOptions.techSector',
    ];

    const tradeOptions = [
        'tradeOptions.electrician',
        'tradeOptions.carpentry',
        'tradeOptions.plumbing',
        'tradeOptions.masonry',
        'tradeOptions.cooking',
        'tradeOptions.hairdressing',
        'tradeOptions.mechanics',
        'tradeOptions.welding',
        'tradeOptions.gardening',
        'tradeOptions.cleaning',
        'tradeOptions.security',
        'tradeOptions.care',
        'tradeOptions.sales',
        'tradeOptions.logistics',
    ];

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

            <div className="flex-grow flex flex-col items-center justify-center pt-24 pb-12 px-4">
                <div className="w-full max-w-4xl">
                    {/* Progress Steps */}
                    <div className="mb-8 hidden md:block">
                        <Steps
                            current={currentStep}
                            items={steps.map((step) => ({
                                icon: step.icon,
                            }))}
                            className="custom-steps"
                        />
                    </div>

                    {/* Mobile Progress */}
                    <div className="mb-6 md:hidden flex items-center justify-between px-4">
                        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            Paso {currentStep + 1} de {steps.length}
                        </span>
                        <div className="h-2 w-32 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-600 transition-all duration-300"
                                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                            />
                        </div>
                    </div>

                    <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl overflow-hidden">
                        <div className="mb-6">
                            <Title level={3} className="!mb-1">
                                {t(steps[currentStep].title)}
                            </Title>
                            <Text type="secondary">
                                {t('form.subtitle')}
                            </Text>
                        </div>

                        <Form layout="vertical" onFinish={handleSubmit(onSubmit)} className="min-h-[400px] flex flex-col justify-between">
                            <div className={`transition-all duration-300 ${direction === 'next' ? 'animate-slide-in-right' : 'animate-slide-in-left'}`} key={currentStep}>
                                {currentStep === 0 && (
                                    <div className="space-y-4">
                                        <Row gutter={16}>
                                            <Col xs={24}>
                                                <Form.Item label={`${t('form.fullName')} *`} validateStatus={errors.fullName ? 'error' : ''} help={errors.fullName?.message}>
                                                    <Controller name="fullName" control={control} rules={{ required: 'El nombre es obligatorio' }} render={({ field }) => <Input size="large" placeholder={t('form.fullNamePlaceholder')} {...field} />} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={16}>
                                            <Col xs={24} sm={12}>
                                                <Form.Item label={`${t('form.age')} *`} validateStatus={errors.age ? 'error' : ''} help={errors.age?.message}>
                                                    <Controller name="age" control={control} rules={{ validate: (value) => (!value && value !== 0) ? 'La edad es obligatoria' : (value < 14 ? 'Mínimo 14 años' : (value > 30 ? 'Máximo 30 años' : true)) }} render={({ field }) => <Input size="large" type="number" min={14} max={30} placeholder={t('form.agePlaceholder')} {...field} />} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item label={`${t('form.gender')} *`} validateStatus={errors.gender ? 'error' : ''} help={errors.gender?.message}>
                                                    <Controller name="gender" control={control} rules={{ required: 'El género es obligatorio' }} render={({ field }) => <Select size="large" placeholder={t('form.genderOptions.select')} {...field} options={[{ label: t('form.genderOptions.male'), value: 'male' }, { label: t('form.genderOptions.female'), value: 'female' }, { label: t('form.genderOptions.other'), value: 'other' }, { label: t('form.genderOptions.preferNotToSay'), value: 'preferNotToSay' }]} />} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={16}>
                                            <Col xs={24}>
                                                <Form.Item label={`${t('form.educationLevel')} *`} validateStatus={errors.educationLevel ? 'error' : ''} help={errors.educationLevel?.message}>
                                                    <Controller name="educationLevel" control={control} rules={{ required: 'El nivel educativo es obligatorio' }} render={({ field }) => <Select size="large" placeholder={t('form.educationLevelOptions.select')} {...field} options={[{ label: t('form.educationLevelOptions.primaryIncomplete'), value: 'primaryIncomplete' }, { label: t('form.educationLevelOptions.primaryComplete'), value: 'primaryComplete' }, { label: t('form.educationLevelOptions.secondaryIncomplete'), value: 'secondaryIncomplete' }, { label: t('form.educationLevelOptions.secondaryComplete'), value: 'secondaryComplete' }, { label: t('form.educationLevelOptions.vocational'), value: 'vocational' }, { label: t('form.educationLevelOptions.other'), value: 'other' }]} />} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </div>
                                )}

                                {currentStep === 1 && (
                                    <div className="space-y-4">
                                        <Form.Item label={t('form.selectAllThatApply')}>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {strengthOptions.map((skill) => (
                                                    <Controller key={skill} name="strengths" control={control} render={({ field }) => (
                                                        <div
                                                            className={`p-3 rounded-lg border cursor-pointer transition-all ${field.value.includes(skill) ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'}`}
                                                            onClick={() => {
                                                                if (field.value.includes(skill)) {
                                                                    field.onChange(field.value.filter((item: string) => item !== skill));
                                                                } else {
                                                                    field.onChange([...field.value, skill]);
                                                                }
                                                            }}
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <Checkbox checked={field.value.includes(skill)} />
                                                                <span>{t(`form.${skill}`)}</span>
                                                            </div>
                                                        </div>
                                                    )} />
                                                ))}
                                            </div>
                                        </Form.Item>
                                        <Form.Item label={t('form.tellUsMore')}>
                                            <Controller name="strengthsDescription" control={control} render={({ field }) => <Input.TextArea rows={3} placeholder={t('form.tellUsMorePlaceholder')} {...field} />} />
                                        </Form.Item>
                                    </div>
                                )}

                                {currentStep === 2 && (
                                    <div className="space-y-4">
                                        <Form.Item label={t('form.whatTypeOfWork')} validateStatus={errors.laboralInterests ? 'error' : ''} help={errors.laboralInterests?.message}>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {interestOptions.map((interest) => (
                                                    <div key={interest}>
                                                        <label className={`flex items-center p-4 rounded-lg border cursor-pointer transition-all ${watch('laboralInterests') === interest ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-500' : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'}`}>
                                                            <input type="radio" value={interest} {...register('laboralInterests', { required: 'Debes seleccionar un interés laboral' })} className="mr-3 h-4 w-4 text-blue-600" />
                                                            <span className="font-medium">{t(`form.${interest}`)}</span>
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </Form.Item>
                                    </div>
                                )}

                                {currentStep === 3 && (
                                    <div className="space-y-4">
                                        <Form.Item label={`${t('form.hadPreviousJobs')} *`} validateStatus={errors.previousJobs ? 'error' : ''} help={errors.previousJobs?.message}>
                                            <Controller name="previousJobs" control={control} rules={{ required: 'Debes seleccionar tu experiencia laboral' }} render={({ field }) => <Select size="large" placeholder={t('form.previousJobsOptions.select')} {...field} options={[{ label: t('form.previousJobsOptions.noFirstJob'), value: 'noFirstJob' }, { label: t('form.previousJobsOptions.punctualJobs'), value: 'punctualJobs' }, { label: t('form.previousJobsOptions.shortTermJobs'), value: 'shortTermJobs' }, { label: t('form.previousJobsOptions.stableExperience'), value: 'stableExperience' }]} />} />
                                        </Form.Item>
                                        <Form.Item label={t('form.describeExperience')}>
                                            <Controller name="workExperienceDescription" control={control} render={({ field }) => <Input.TextArea rows={4} placeholder={t('form.describeExperiencePlaceholder')} {...field} />} />
                                        </Form.Item>
                                    </div>
                                )}

                                {currentStep === 4 && (
                                    <div className="space-y-4">
                                        <Form.Item label={t('form.anyTradeInterest')}>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                {tradeOptions.map((trade) => (
                                                    <Controller key={trade} name="trades" control={control} render={({ field }) => (
                                                        <div
                                                            className={`p-3 rounded-lg border cursor-pointer transition-all ${field.value.includes(trade) ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'}`}
                                                            onClick={() => {
                                                                if (field.value.includes(trade)) {
                                                                    field.onChange(field.value.filter((item: string) => item !== trade));
                                                                } else {
                                                                    field.onChange([...field.value, trade]);
                                                                }
                                                            }}
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <Checkbox checked={field.value.includes(trade)} />
                                                                <span className="text-sm">{t(`form.${trade}`)}</span>
                                                            </div>
                                                        </div>
                                                    )} />
                                                ))}
                                            </div>
                                        </Form.Item>
                                        <Form.Item label={t('form.otherTrade')}>
                                            <Controller name="otherTrade" control={control} render={({ field }) => <Input size="large" placeholder={t('form.otherTrade')} {...field} />} />
                                        </Form.Item>
                                    </div>
                                )}

                                {currentStep === 5 && (
                                    <div className="space-y-4">
                                        <Form.Item label={t('form.workingHoursAvailability')} validateStatus={errors.workingHours ? 'error' : ''} help={errors.workingHours?.message}>
                                            <Controller name="workingHours" control={control} rules={{ required: 'Debes seleccionar disponibilidad' }} render={({ field }) => <Select size="large" placeholder={t('form.availabilityOptions.select')} {...field} options={[{ label: t('form.availabilityOptions.fullTime'), value: 'fullTime' }, { label: t('form.availabilityOptions.partTime'), value: 'partTime' }, { label: t('form.availabilityOptions.mornings'), value: 'mornings' }, { label: t('form.availabilityOptions.afternoons'), value: 'afternoons' }, { label: t('form.availabilityOptions.weekends'), value: 'weekends' }, { label: t('form.availabilityOptions.flexible'), value: 'flexible' }]} />} />
                                        </Form.Item>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <Controller name="trainingPrograms" control={control} render={({ field }) => (
                                                <div className={`p-4 rounded-lg border cursor-pointer transition-all ${field.value ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700'}`} onClick={() => field.onChange(!field.value)}>
                                                    <div className="flex items-center gap-3">
                                                        <Checkbox checked={field.value} />
                                                        <span className="font-medium">{t('form.trainingPrograms')}</span>
                                                    </div>
                                                </div>
                                            )} />
                                            <Controller name="hasTransport" control={control} render={({ field }) => (
                                                <div className={`p-4 rounded-lg border cursor-pointer transition-all ${field.value ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700'}`} onClick={() => field.onChange(!field.value)}>
                                                    <div className="flex items-center gap-3">
                                                        <Checkbox checked={field.value} />
                                                        <span className="font-medium">{t('form.hasTransport')}</span>
                                                    </div>
                                                </div>
                                            )} />
                                        </div>
                                    </div>
                                )}

                                {currentStep === 6 && (
                                    <div className="space-y-4">
                                        <Form.Item label={t('form.specialConsiderationsDescription')}>
                                            <Controller name="specialConsiderations" control={control} render={({ field }) => <Input.TextArea rows={3} placeholder={t('form.specialConsiderationsPlaceholder')} {...field} />} />
                                        </Form.Item>
                                        <Form.Item label={`${t('form.mainMotivation')} *`} validateStatus={errors.mainMotivation ? 'error' : ''} help={errors.mainMotivation?.message}>
                                            <Controller name="mainMotivation" control={control} rules={{ required: 'La motivación principal es obligatoria' }} render={({ field }) => <Input.TextArea rows={3} placeholder={t('form.mainMotivationPlaceholder')} {...field} />} />
                                        </Form.Item>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between pt-8 mt-4 border-t border-gray-100 dark:border-gray-700">
                                <Button
                                    size="large"
                                    onClick={prevStep}
                                    disabled={currentStep === 0}
                                    icon={<ArrowLeft size={18} />}
                                    className="flex items-center"
                                >
                                    Atrás
                                </Button>

                                {currentStep < steps.length - 1 ? (
                                    <Button
                                        type="primary"
                                        size="large"
                                        onClick={nextStep}
                                        icon={<ArrowRight size={18} />}
                                        className="flex items-center bg-blue-600 hover:bg-blue-700"
                                    >
                                        Continuar
                                    </Button>
                                ) : (
                                    <Button
                                        type="primary"
                                        size="large"
                                        htmlType="submit"
                                        loading={isLoading}
                                        icon={<Send size={18} />}
                                        className="flex items-center bg-green-600 hover:bg-green-700 border-green-600 hover:border-green-700"
                                    >
                                        {isLoading ? (t('form.sending') || 'Enviando...') : t('form.submit')}
                                    </Button>
                                )}
                            </div>
                        </Form>
                    </Card>
                </div>
            </div>

            <Modal
                title={<div className="flex items-center gap-2"><Sparkles className="text-blue-500" /> {t('form.recommendations') || 'Recomendaciones de Oficios'}</div>}
                open={modalVisible}
                onOk={irEmpleos}
                onCancel={() => setModalVisible(false)}
                width={800}
                style={{ maxHeight: '80vh' }}
                styles={{ body: { maxHeight: '60vh', overflowY: 'auto' } }}
                footer={[
                    <Button key="back" onClick={() => setModalVisible(false)}>
                        {t('form.close')}
                    </Button>,
                    <Button key="submit" type="primary" onClick={irEmpleos}>
                        Ver Empleos
                    </Button>,
                ]}
            >
                <div className="prose dark:prose-invert max-w-none">
                    <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                        {modalContent}
                    </div>
                </div>
            </Modal>

            {/* CSS Animations */}
            <style jsx global>{`
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @keyframes slideInLeft {
                    from { opacity: 0; transform: translateX(-20px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .animate-slide-in-right {
                    animation: slideInRight 0.3s ease-out forwards;
                }
                .animate-slide-in-left {
                    animation: slideInLeft 0.3s ease-out forwards;
                }
                .custom-steps .ant-steps-item-process .ant-steps-item-icon {
                    background-color: #2563eb !important;
                    border-color: #2563eb !important;
                }
                .custom-steps .ant-steps-item-process .ant-steps-item-icon svg {
                    color: white !important;
                    stroke: white !important;
                }
                .custom-steps .ant-steps-item-wait .ant-steps-item-icon {
                    border-color: rgba(255, 255, 255, 0.3) !important;
                }
                .custom-steps .ant-steps-item-wait .ant-steps-item-icon svg {
                    color: rgba(255, 255, 255, 0.5) !important;
                    stroke: rgba(255, 255, 255, 0.5) !important;
                }
                .custom-steps .ant-steps-item-finish .ant-steps-item-icon {
                    border-color: #2563eb !important;
                }
                .custom-steps .ant-steps-item-finish .ant-steps-item-icon svg {
                    color: #2563eb !important;
                    stroke: #2563eb !important;
                }
            `}</style>
        </div>
    );
}

function Sparkles(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        </svg>
    )
}
