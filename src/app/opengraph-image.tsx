import { ImageResponse } from 'next/og'

export const alt = 'MasterFabric Inc. — Custom Software & AI Transformation'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 55%, #1d4ed8 100%)',
          padding: '72px 80px',
          color: '#ffffff',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontSize: 28,
            letterSpacing: -0.4,
            fontWeight: 600,
          }}
        >
          MasterFabric Inc.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 58,
              lineHeight: 1.08,
              fontWeight: 700,
              letterSpacing: -1.4,
              maxWidth: 960,
            }}
          >
            Custom Software & AI Transformation
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 26,
              lineHeight: 1.4,
              color: '#dbeafe',
              maxWidth: 860,
            }}
          >
            Bespoke systems for institutions and private clients — plus iOS, Android, and HarmonyOS apps.
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 22,
            color: '#bfdbfe',
          }}
        >
          <span>masterfabric.co</span>
          <span>Ankara · Worldwide</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
