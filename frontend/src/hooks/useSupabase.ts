import { createClient } from '@supabase/supabase-js'
import { Database, TablesInsert } from '../../database.types'

const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const useSupabase = () => {
    async function insertUser(usuario: TablesInsert<'perfiles_usuarios'>) {
        const { data, error } = await supabase
            .from('perfiles_usuarios')
            .insert([usuario])
            .select()

        if (error) {
            console.error('Error insertando usuario:', error)
            return null
        }
        return data
    }

    async function insertRecomendation(userId: string, recomendationText: string) {
        const { data, error } = await supabase
            .from('recomendaciones')
            .insert([
                { perfil_id: userId, texto_recomendacion: recomendationText },
            ])
            .select()

        if (error) {
            console.error('Error insertando recomendación:', error)
            return null
        }
        return data
    }

    return { insertUser, insertRecomendation }
}