'use client';
export default function Formulario() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
                {/* Encabezado */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        Perfil de Orientación Laboral
                    </h1>
                    <p className="text-gray-600">
                        Cuéntanos sobre ti para encontrar la mejor ruta laboral y formativa
                    </p>
                </div>

                <form className="space-y-8">
                    {/* Sección 1: Información Personal */}
                    <div className="border-b pb-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Información Personal</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nombre completo *
                                </label>
                                <input
                                    type="text"
                                    placeholder="Tu nombre"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Edad *
                                    </label>
                                    <input
                                        type="number"
                                        min="14"
                                        max="30"
                                        placeholder="Tu edad"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Género
                                    </label>
                                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                        <option>Seleccionar</option>
                                        <option>Masculino</option>
                                        <option>Femenino</option>
                                        <option>Otro</option>
                                        <option>Prefiero no decir</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Nivel de educación completado *
                                </label>
                                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option>Seleccionar</option>
                                    <option>Primaria incompleta</option>
                                    <option>Primaria completa</option>
                                    <option>Secundaria incompleta</option>
                                    <option>Secundaria completa</option>
                                    <option>Formación profesional</option>
                                    <option>Otro</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Sección 2: Fortalezas y Habilidades */}
                    <div className="border-b pb-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">¿En qué eres bueno? (Fortalezas)</h2>

                        <div className="space-y-3">
                            <p className="text-sm text-gray-600 mb-3">Selecciona todas las que se apliquen</p>

                            <div className="grid grid-cols-2 gap-3">
                                {['Trabajo en equipo', 'Creatividad', 'Liderazgo', 'Organización', 'Atención al detalle', 'Resolución de problemas', 'Comunicación', 'Paciencia', 'Enseñanza', 'Manualidades', 'Deporte', 'Música'].map((skill) => (
                                    <label key={skill} className="flex items-center space-x-2 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                                        <span className="text-sm text-gray-700">{skill}</span>
                                    </label>
                                ))}
                            </div>

                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Cuéntanos más (opcional)
                                </label>
                                <textarea
                                    placeholder="Describe otras habilidades o fortalezas que creas que tienes..."
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sección 3: Intereses Laborales */}
                    <div className="border-b pb-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Tus Intereses Laborales *</h2>

                        <div className="space-y-3">
                            <p className="text-sm text-gray-600 mb-3">¿Qué tipo de trabajo te llama más la atención?</p>

                            <div className="grid grid-cols-2 gap-3">
                                {['Trabajo con personas', 'Trabajo con máquinas', 'Trabajo manual', 'Trabajo administrativo', 'Trabajo creativo', 'Trabajo al aire libre', 'Trabajo físico', 'Trabajo de oficina', 'Trabajo en equipo', 'Trabajo independiente', 'Sector sanitario', 'Sector tecnológico'].map((interest) => (
                                    <label key={interest} className="flex items-center space-x-2 cursor-pointer">
                                        <input type="radio" name="interests" className="w-4 h-4 text-blue-600" />
                                        <span className="text-sm text-gray-700">{interest}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sección 4: Experiencia Laboral */}
                    <div className="border-b pb-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Experiencia Laboral</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    ¿Has tenido trabajos anteriores?
                                </label>
                                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option>Seleccionar</option>
                                    <option>No, es mi primer trabajo</option>
                                    <option>Sí, trabajos puntuales/temporales</option>
                                    <option>Sí, trabajos de corta duración</option>
                                    <option>Sí, experiencia laboral estable</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Describe tu experiencia (opcional)
                                </label>
                                <textarea
                                    placeholder="Cuéntanos qué tipos de trabajos has tenido y qué aprendiste..."
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sección 5: Oficios de Referencia */}
                    <div className="border-b pb-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Oficios o Profesiones de Interés</h2>

                        <div className="space-y-4">
                            <p className="text-sm text-gray-600">¿Hay algún oficio o profesión que te atrae? (opcional)</p>

                            <div className="grid grid-cols-2 gap-3">
                                {['Electricista', 'Carpintería', 'Plomería', 'Albañilería', 'Cocina', 'Peluquería', 'Mecánica', 'Soldadura', 'Jardinería', 'Limpieza', 'Seguridad', 'Cuidados', 'Venta', 'Logística'].map((trade) => (
                                    <label key={trade} className="flex items-center space-x-2 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                                        <span className="text-sm text-gray-700">{trade}</span>
                                    </label>
                                ))}
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="¿Otro oficio? Escribe aquí..."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sección 6: Disponibilidad */}
                    <div className="border-b pb-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Disponibilidad *</h2>

                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    ¿Cuál es tu disponibilidad horaria?
                                </label>
                                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option>Seleccionar</option>
                                    <option>Disponible a tiempo completo</option>
                                    <option>Disponible a tiempo parcial</option>
                                    <option>Por las mañanas</option>
                                    <option>Por las tardes</option>
                                    <option>Fines de semana</option>
                                    <option>Flexible</option>
                                </select>
                            </div>

                            <div>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                                    <span className="text-sm text-gray-700">
                                        Estoy disponible para participar en programas de formación
                                    </span>
                                </label>
                            </div>

                            <div>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
                                    <span className="text-sm text-gray-700">
                                        Tengo transporte propio o puedo desplazarme
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Sección 7: Consideraciones Especiales */}
                    <div className="pb-6">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Consideraciones Especiales</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    ¿Hay alguna consideración que debamos saber? (opcional)
                                </label>
                                <textarea
                                    placeholder="Discapacidades, limitaciones, situaciones especiales, idiomas, cuidados de personas dependientes, etc..."
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    ¿Cuál es tu principal motivación o expectativa? *
                                </label>
                                <textarea
                                    placeholder="¿Qué esperas conseguir con orientación laboral? ¿Cuál es tu objetivo?"
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
                            Enviar Formulario
                        </button>
                        <button
                            type="reset"
                            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 rounded-lg transition-colors"
                        >
                            Limpiar Formulario
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
