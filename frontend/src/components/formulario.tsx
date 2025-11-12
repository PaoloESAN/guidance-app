'use client';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import '@ant-design/v5-patch-for-react-19';
import LanguageSelector from "./language-selector";
import ButtonTheme from "./buttonTheme";
import { Form, Input, Select, Checkbox, Button, Card, Row, Col, Alert, Space } from 'antd';

interface FormData {
    // Personal Info
    fullName: string;
    age: number;
    gender: string;
    educationLevel: string;

    // Strengths
    strengths: string[];
    strengthsDescription: string;

    // Interests
    laboralInterests: string;

    // Work Experience
    previousJobs: string;
    workExperienceDescription: string;

    // Trades
    trades: string[];
    otherTrade: string;

    // Availability
    workingHours: string;
    trainingPrograms: boolean;
    hasTransport: boolean;

    // Special Considerations
    specialConsiderations: string;
    mainMotivation: string;
}

export default function Formulario() {
    const { t } = useTranslation();
    const { register, watch, handleSubmit, formState: { errors }, reset, control } = useForm<FormData>({
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

    const selectedStrengths = watch('strengths');
    const selectedTrades = watch('trades');
    const selectedInterests = watch('laboralInterests');

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        setSubmitMessage('');

        try {
            console.log('Datos del formulario:', data);

            // Llamar a la funcion de wails
            // const result = await window.go.main.App.ProcessForm(JSON.stringify(data));

            setSubmitMessage(t('form.successMessage') || 'Formulario enviado correctamente');
            reset();
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
        <div className="h-screen p-8">
            <div className="absolute top-4 right-4 flex gap-3">
                <ButtonTheme />
                <LanguageSelector />
            </div>

            <div className="max-w-2xl mx-auto pb-8">
                {/* Encabezado */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">
                        {t('form.title')}
                    </h1>
                    <p className="text-base">
                        {t('form.subtitle')}
                    </p>
                </div>

                {submitMessage && (
                    <Alert
                        message={submitMessage}
                        type={submitMessage.includes('Error') ? 'error' : 'success'}
                        showIcon
                        closable
                        className="mb-4"
                    />
                )}

                <Form layout="vertical" onFinish={handleSubmit(onSubmit)} style={{ gap: '1rem' }}>
                    {/* Sección 1: Información Personal */}
                    <Card title={t('form.personalInfo')} style={{ marginBottom: '1rem' }} className='mb-4'>
                        <Row gutter={16}>
                            <Col xs={24}>
                                <Form.Item
                                    label={`${t('form.fullName')} *`}
                                    validateStatus={errors.fullName ? 'error' : ''}
                                    help={errors.fullName?.message}
                                >
                                    <Input
                                        placeholder={t('form.fullNamePlaceholder')}
                                        {...register('fullName', { required: 'El nombre es obligatorio' })}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col xs={24} sm={12}>
                                <Form.Item
                                    label={`${t('form.age')} *`}
                                    validateStatus={errors.age ? 'error' : ''}
                                    help={errors.age?.message}
                                >
                                    <Input
                                        type="number"
                                        min={14}
                                        max={30}
                                        placeholder={t('form.agePlaceholder')}
                                        {...register('age', {
                                            validate: (value) => {
                                                if (!value && value !== 0) return 'La edad es obligatoria';
                                                if (value < 14) return 'Mínimo 14 años';
                                                if (value > 30) return 'Máximo 30 años';
                                                return true;
                                            }
                                        })}
                                    />
                                </Form.Item>
                            </Col>

                            <Col xs={24} sm={12}>
                                <Form.Item
                                    label={`${t('form.gender')} *`}
                                    validateStatus={errors.gender ? 'error' : ''}
                                    help={errors.gender?.message}
                                >
                                    <Select
                                        placeholder={t('form.genderOptions.select')}
                                        {...register('gender', { required: 'El género es obligatorio' })}
                                        options={[
                                            { label: t('form.genderOptions.male'), value: 'male' },
                                            { label: t('form.genderOptions.female'), value: 'female' },
                                            { label: t('form.genderOptions.other'), value: 'other' },
                                            { label: t('form.genderOptions.preferNotToSay'), value: 'preferNotToSay' },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col xs={24}>
                                <Form.Item
                                    label={`${t('form.educationLevel')} *`}
                                    validateStatus={errors.educationLevel ? 'error' : ''}
                                    help={errors.educationLevel?.message}
                                >
                                    <Select
                                        placeholder={t('form.educationLevelOptions.select')}
                                        {...register('educationLevel', { required: 'El nivel educativo es obligatorio' })}
                                        options={[
                                            { label: t('form.educationLevelOptions.primaryIncomplete'), value: 'primaryIncomplete' },
                                            { label: t('form.educationLevelOptions.primaryComplete'), value: 'primaryComplete' },
                                            { label: t('form.educationLevelOptions.secondaryIncomplete'), value: 'secondaryIncomplete' },
                                            { label: t('form.educationLevelOptions.secondaryComplete'), value: 'secondaryComplete' },
                                            { label: t('form.educationLevelOptions.vocational'), value: 'vocational' },
                                            { label: t('form.educationLevelOptions.other'), value: 'other' },
                                        ]}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>

                    {/* Sección 2: Fortalezas y Habilidades */}
                    <Card title={t('form.strengths')} style={{ marginBottom: '1rem' }} className="mb-4">
                        <Form.Item label={t('form.selectAllThatApply')}>
                            <div className="space-y-2">
                                {strengthOptions.map((skill) => (
                                    <div key={skill}>
                                        <Controller
                                            name="strengths"
                                            control={control}
                                            render={({ field }) => (
                                                <Checkbox
                                                    checked={field.value.includes(skill)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            field.onChange([...field.value, skill]);
                                                        } else {
                                                            field.onChange(field.value.filter((item: string) => item !== skill));
                                                        }
                                                    }}
                                                >
                                                    {t(`form.${skill}`)}
                                                </Checkbox>
                                            )}
                                        />
                                    </div>
                                ))}
                            </div>
                        </Form.Item>

                        <Form.Item label={t('form.tellUsMore')}>
                            <Input.TextArea
                                rows={3}
                                placeholder={t('form.tellUsMorePlaceholder')}
                                {...register('strengthsDescription')}
                            />
                        </Form.Item>
                    </Card>

                    {/* Sección 3: Intereses Laborales */}
                    <Card title={`${t('form.laboralInterests')} *`} style={{ marginBottom: '1rem' }} className="mb-4">
                        <Form.Item
                            label={t('form.whatTypeOfWork')}
                            validateStatus={errors.laboralInterests ? 'error' : ''}
                            help={errors.laboralInterests?.message}
                        >
                            <div className="space-y-2">
                                {interestOptions.map((interest) => (
                                    <div key={interest}>
                                        <label className="flex items-center cursor-pointer">
                                            <input
                                                type="radio"
                                                value={interest}
                                                {...register('laboralInterests', { required: 'Debes seleccionar un interés laboral' })}
                                                className="mr-2"
                                            />
                                            <span>{t(`form.${interest}`)}</span>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </Form.Item>
                    </Card>

                    {/* Sección 4: Experiencia Laboral */}
                    <Card title={t('form.workExperience')} style={{ marginBottom: '1rem' }} className="mb-4">
                        <Form.Item
                            label={`${t('form.hadPreviousJobs')} *`}
                            validateStatus={errors.previousJobs ? 'error' : ''}
                            help={errors.previousJobs?.message}
                        >
                            <Select
                                placeholder={t('form.previousJobsOptions.select')}
                                {...register('previousJobs', { required: 'Debes seleccionar tu experiencia laboral' })}
                                options={[
                                    { label: t('form.previousJobsOptions.noFirstJob'), value: 'noFirstJob' },
                                    { label: t('form.previousJobsOptions.punctualJobs'), value: 'punctualJobs' },
                                    { label: t('form.previousJobsOptions.shortTermJobs'), value: 'shortTermJobs' },
                                    { label: t('form.previousJobsOptions.stableExperience'), value: 'stableExperience' },
                                ]}
                            />
                        </Form.Item>

                        <Form.Item label={t('form.describeExperience')}>
                            <Input.TextArea
                                rows={3}
                                placeholder={t('form.describeExperiencePlaceholder')}
                                {...register('workExperienceDescription')}
                            />
                        </Form.Item>
                    </Card>

                    {/* Sección 5: Oficios de Referencia */}
                    <Card title={t('form.tradesOfInterest')} style={{ marginBottom: '1rem' }} className="mb-4">
                        <Form.Item label={t('form.anyTradeInterest')}>
                            <div className="space-y-2">
                                {tradeOptions.map((trade) => (
                                    <div key={trade}>
                                        <Controller
                                            name="trades"
                                            control={control}
                                            render={({ field }) => (
                                                <Checkbox
                                                    checked={field.value.includes(trade)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            field.onChange([...field.value, trade]);
                                                        } else {
                                                            field.onChange(field.value.filter((item: string) => item !== trade));
                                                        }
                                                    }}
                                                >
                                                    {t(`form.${trade}`)}
                                                </Checkbox>
                                            )}
                                        />
                                    </div>
                                ))}
                            </div>
                        </Form.Item>

                        <Form.Item label={t('form.otherTrade')}>
                            <Input
                                placeholder={t('form.otherTrade')}
                                {...register('otherTrade')}
                            />
                        </Form.Item>
                    </Card>

                    {/* Sección 6: Disponibilidad */}
                    <Card title={`${t('form.availability')} *`} style={{ marginBottom: '1rem' }} className="mb-4">
                        <Form.Item
                            label={t('form.workingHoursAvailability')}
                            validateStatus={errors.workingHours ? 'error' : ''}
                            help={errors.workingHours?.message}
                        >
                            <Select
                                placeholder={t('form.availabilityOptions.select')}
                                {...register('workingHours', { required: 'Debes seleccionar disponibilidad' })}
                                options={[
                                    { label: t('form.availabilityOptions.fullTime'), value: 'fullTime' },
                                    { label: t('form.availabilityOptions.partTime'), value: 'partTime' },
                                    { label: t('form.availabilityOptions.mornings'), value: 'mornings' },
                                    { label: t('form.availabilityOptions.afternoons'), value: 'afternoons' },
                                    { label: t('form.availabilityOptions.weekends'), value: 'weekends' },
                                    { label: t('form.availabilityOptions.flexible'), value: 'flexible' },
                                ]}
                            />
                        </Form.Item>

                        <Form.Item>
                            <div className="space-y-2">
                                <div>
                                    <Checkbox
                                        {...register('trainingPrograms')}
                                    >
                                        {t('form.trainingPrograms')}
                                    </Checkbox>
                                </div>
                                <div>
                                    <Checkbox
                                        {...register('hasTransport')}
                                    >
                                        {t('form.hasTransport')}
                                    </Checkbox>
                                </div>
                            </div>
                        </Form.Item>
                    </Card>

                    {/* Sección 7: Consideraciones Especiales */}
                    <Card title={t('form.specialConsiderations')} style={{ marginBottom: '1rem' }} className="mb-4">
                        <Form.Item label={t('form.specialConsiderationsDescription')}>
                            <Input.TextArea
                                rows={3}
                                placeholder={t('form.specialConsiderationsPlaceholder')}
                                {...register('specialConsiderations')}
                            />
                        </Form.Item>

                        <Form.Item
                            label={`${t('form.mainMotivation')} *`}
                            validateStatus={errors.mainMotivation ? 'error' : ''}
                            help={errors.mainMotivation?.message}
                        >
                            <Input.TextArea
                                rows={3}
                                placeholder={t('form.mainMotivationPlaceholder')}
                                {...register('mainMotivation', { required: 'La motivación principal es obligatoria' })}
                            />
                        </Form.Item>
                    </Card>

                    {/* Botones */}
                    <Form.Item>
                        <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                            <Button
                                onClick={() => reset()}
                            >
                                {t('form.reset')}
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isLoading}
                            >
                                {isLoading ? (t('form.sending') || 'Enviando...') : t('form.submit')}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}
