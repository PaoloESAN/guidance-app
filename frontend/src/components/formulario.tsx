'use client';
import { useTranslation } from 'react-i18next';
import '@ant-design/v5-patch-for-react-19';
import LanguageSelector from "./language-selector";

export default function Formulario() {
    const { t } = useTranslation();

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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <div className="absolute top-4 right-4">
                <LanguageSelector />
            </div>
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
                {/* Encabezado */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        {t('form.title')}
                    </h1>
                    <p className="text-gray-600">
                        {t('form.subtitle')}
                    </p>
                </div>

                <form className="space-y-8">
                    {/* Sección 1: Información Personal */}
                    <div className="border-b pb-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">{t('form.personalInfo')}</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('form.fullName')} *
                                </label>
                                <input
                                    type="text"
                                    placeholder={t('form.fullNamePlaceholder')}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('form.age')} *
                                    </label>
                                    <input
                                        type="number"
                                        min="14"
                                        max="30"
                                        placeholder={t('form.agePlaceholder')}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('form.gender')}
                                    </label>
                                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                        <option>{t('form.genderOptions.select')}</option>
                                        <option>{t('form.genderOptions.male')}</option>
                                        <option>{t('form.genderOptions.female')}</option>
                                        <option>{t('form.genderOptions.other')}</option>
                                        <option>{t('form.genderOptions.preferNotToSay')}</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('form.educationLevel')} *
                                </label>
                                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option>{t('form.educationLevelOptions.select')}</option>
                                    <option>{t('form.educationLevelOptions.primaryIncomplete')}</option>
                                    <option>{t('form.educationLevelOptions.primaryComplete')}</option>
                                    <option>{t('form.educationLevelOptions.secondaryIncomplete')}</option>
                                    <option>{t('form.educationLevelOptions.secondaryComplete')}</option>
                                    <option>{t('form.educationLevelOptions.vocational')}</option>
                                    <option>{t('form.educationLevelOptions.other')}</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Sección 2: Fortalezas y Habilidades */}
                    <div className="border-b pb-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">{t('form.strengths')}</h2>

                        <div className="space-y-3">
                            <p className="text-sm text-gray-600 mb-3">{t('form.selectAllThatApply')}</p>

                            <div className="grid grid-cols-2 gap-3">
                                {strengthOptions.map((skill) => (
                                    <label key={skill} className="flex items-center space-x-2 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                                        <span className="text-sm text-gray-700">{t(`form.${skill}`)}</span>
                                    </label>
                                ))}
                            </div>

                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    {t('form.tellUsMore')}
                                </label>
                                <textarea
                                    placeholder={t('form.tellUsMorePlaceholder')}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sección 3: Intereses Laborales */}
                    <div className="border-b pb-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">{t('form.laboralInterests')} *</h2>

                        <div className="space-y-3">
                            <p className="text-sm text-gray-600 mb-3">{t('form.whatTypeOfWork')}</p>

                            <div className="grid grid-cols-2 gap-3">
                                {interestOptions.map((interest) => (
                                    <label key={interest} className="flex items-center space-x-2 cursor-pointer">
                                        <input type="radio" name="interests" className="w-4 h-4 text-blue-600" />
                                        <span className="text-sm text-gray-700">{t(`form.${interest}`)}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sección 4: Experiencia Laboral */}
                    <div className="border-b pb-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">{t('form.workExperience')}</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('form.hadPreviousJobs')}
                                </label>
                                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option>{t('form.previousJobsOptions.select')}</option>
                                    <option>{t('form.previousJobsOptions.noFirstJob')}</option>
                                    <option>{t('form.previousJobsOptions.punctualJobs')}</option>
                                    <option>{t('form.previousJobsOptions.shortTermJobs')}</option>
                                    <option>{t('form.previousJobsOptions.stableExperience')}</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('form.describeExperience')}
                                </label>
                                <textarea
                                    placeholder={t('form.describeExperiencePlaceholder')}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sección 5: Oficios de Referencia */}
                    <div className="border-b pb-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">{t('form.tradesOfInterest')}</h2>

                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">{t('form.anyTradeInterest')}</p>

                            <div className="grid grid-cols-2 gap-3">
                                {tradeOptions.map((trade) => (
                                    <label key={trade} className="flex items-center space-x-2 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                                        <span className="text-sm text-gray-700">{t(`form.${trade}`)}</span>
                                    </label>
                                ))}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder={t('form.otherTrade')}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sección 6: Disponibilidad */}
                    <div className="border-b pb-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">{t('form.availability')} *</h2>

                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('form.workingHoursAvailability')}
                                </label>
                                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option>{t('form.availabilityOptions.select')}</option>
                                    <option>{t('form.availabilityOptions.fullTime')}</option>
                                    <option>{t('form.availabilityOptions.partTime')}</option>
                                    <option>{t('form.availabilityOptions.mornings')}</option>
                                    <option>{t('form.availabilityOptions.afternoons')}</option>
                                    <option>{t('form.availabilityOptions.weekends')}</option>
                                    <option>{t('form.availabilityOptions.flexible')}</option>
                                </select>
                            </div>

                            <div>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                                    <span className="text-sm text-gray-700">
                                        {t('form.trainingPrograms')}
                                    </span>
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                                    <span className="text-sm text-gray-700">
                                        {t('form.hasTransport')}
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Sección 7: Consideraciones Especiales */}
                    <div className="pb-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">{t('form.specialConsiderations')}</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('form.specialConsiderationsDescription')}
                                </label>
                                <textarea
                                    placeholder={t('form.specialConsiderationsPlaceholder')}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {t('form.mainMotivation')} *
                                </label>
                                <textarea
                                    placeholder={t('form.mainMotivationPlaceholder')}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Botones */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
                        >
                            {t('form.submit')}
                        </button>
                        <button
                            type="reset"
                            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded-lg transition-colors"
                        >
                            {t('form.reset')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
