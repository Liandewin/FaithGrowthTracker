import { createSupabaseServerClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function GET() {
    const supabase = await createSupabaseServerClient()

    const { data, error } = await supabase
        .from('verses')
        .select('*')

    if (error || !data || data.length === 0) {
        return NextResponse.json({ error: 'No verses found' }, { status: 404 })
    }

    // Use the day of the year to pick a verse so it changes daily
    const dayOfYear = Math.floor(
        (new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
    )
    const verse = data[dayOfYear % data.length]

    return NextResponse.json(verse)
}