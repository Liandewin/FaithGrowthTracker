import * as React from 'react'

interface Props {
    name: string
    message: string
}

export default function FeedbackNotificationEmail({ name, message }: Props) {
    return (
        <div style={{ fontFamily: 'Georgia, serif', background: '#0a0a0f', color: 'white', padding: '40px 32px', maxWidth: 600, margin: '0 auto' }}>
            <h1 style={{ color: '#d4af37', fontSize: 28, marginBottom: 8 }}>New Feedback 💬</h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15, marginBottom: 32 }}>
                Someone submitted feedback on Faith & Growth Tracker
            </p>

            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 20, marginBottom: 16 }}>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px' }}>From</p>
                <p style={{ fontSize: 16, color: 'white', margin: 0 }}>{name}</p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: 20 }}>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 8px' }}>Message</p>
                <p style={{ fontSize: 16, color: 'white', lineHeight: 1.6, margin: 0 }}>{message}</p>
            </div>

            <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: 12, marginTop: 40 }}>
                Faith & Growth Tracker — Admin Notification
            </p>
        </div>
    )
}