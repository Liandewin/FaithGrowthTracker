'use client'

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts'
import { BibleReading } from './types'

interface Props {
    readings: BibleReading[]
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div style={{
                background: 'rgba(15,15,25,0.95)',
                border: '1px solid rgba(212,175,55,0.3)',
                borderRadius: 12,
                padding: '12px 16px',
                backdropFilter: 'blur(12px)',
            }}>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginBottom: 8 }}>{label}</p>
                {payload.map((p: any, i: number) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color }} />
                        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>{p.name}:</span>
                        <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>{p.value} chapters</span>
                    </div>
                ))}
            </div>
        )
    }
    return null
}

export default function ProgressChart({ readings }: Props) {
    const now = new Date()
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const chartData = days.map((day, i) => ({
        day,
        'This Month': readings.filter(r => {
            const d = new Date(r.date)
            return d.getDay() === i && d.getMonth() === now.getMonth()
        }).length,
        'Last Month': readings.filter(r => {
            const d = new Date(r.date)
            return d.getDay() === i && d.getMonth() === now.getMonth() - 1
        }).length,
    }))

    return (
        <div className="glass-card" style={{ padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, margin: 0, fontWeight: 600 }}>
                        Monthly Progress
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, marginTop: 4 }}>Chapters read per day</p>
                </div>
                <span style={{
                    fontSize: 12,
                    fontWeight: 600,
                    background: 'rgba(74,222,128,0.1)',
                    color: '#4ade80',
                    padding: '4px 12px',
                    borderRadius: 20,
                    border: '1px solid rgba(74,222,128,0.2)',
                }}>
                    This Month
                </span>
            </div>

            <ResponsiveContainer width="100%" height={220}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.35)', fontFamily: 'DM Sans' }}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: 'rgba(255,255,255,0.35)', fontFamily: 'DM Sans' }}
                        allowDecimals={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', paddingTop: 16 }} />
                    <Line
                        type="monotone"
                        dataKey="Last Month"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth={2}
                        dot={{ fill: 'rgba(255,255,255,0.2)', r: 4, strokeWidth: 0 }}
                        activeDot={{ r: 6, fill: 'white' }}
                        strokeDasharray="5 5"
                    />
                    <Line
                        type="monotone"
                        dataKey="This Month"
                        stroke="#d4af37"
                        strokeWidth={2.5}
                        dot={{ fill: '#d4af37', r: 4, strokeWidth: 0 }}
                        activeDot={{ r: 7, fill: '#d4af37', stroke: 'rgba(212,175,55,0.3)', strokeWidth: 6 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}