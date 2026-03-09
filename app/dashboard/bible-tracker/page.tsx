import { Suspense } from 'react'
import { WelcomeHeader } from '@/components/bible-tracker/welcome-header'
import { WelcomeHeaderSkeleton } from '@/components/bible-tracker/welcome-header-skeleton'
import BibleTrackerClient from '@/components/bible-tracker/bible-tracker-client'

export default function BibleTrackerPage() {
    return (
        <div style={{
            minHeight: '100vh',
            background: '#0a0a0f',
            padding: '32px',
            fontFamily: "'DM Sans', sans-serif",
            color: 'white',
        }}>
            <Suspense fallback={<WelcomeHeaderSkeleton />}>
                <WelcomeHeader />
            </Suspense>
            <BibleTrackerClient />
        </div>
    )
}