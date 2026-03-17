import { createSupabaseServerClient } from '@/lib/supabase-server'
import HomeClient from '@/components/home-page/home-client'

export default async function DashboardPage() {
    const supabase = await createSupabaseServerClient()

    const { data: { user } } = await supabase.auth.getUser()

    let firstName = 'Friend'

    if (user) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('first_name')
            .eq('id', user.id)
            .single()

        if (profile?.first_name) firstName = profile.first_name
    }

    return <HomeClient firstName={firstName} />
}