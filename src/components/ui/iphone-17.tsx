import React from 'react'

type Props = {
  children: React.ReactNode
  time?: string
  /** Replaces the idle Dynamic Island, e.g. with a live activity. */
  island?: React.ReactNode
  className?: string
}

// iPhone 17 wireframe: titanium edge, Dynamic Island, status bar, home indicator.
export default function IPhone17({ children, time = '9:41', island, className = '' }: Props) {

  return (
    <div className={`relative ${className}`}>
      {/* Side buttons: action, volume up/down, side, camera control */}
      <span className="absolute -left-[3px] top-[104px] h-7 w-[3px] rounded-l bg-gradient-to-b from-zinc-400 to-zinc-500" aria-hidden="true" />
      <span className="absolute -left-[3px] top-[148px] h-12 w-[3px] rounded-l bg-gradient-to-b from-zinc-400 to-zinc-500" aria-hidden="true" />
      <span className="absolute -left-[3px] top-[206px] h-12 w-[3px] rounded-l bg-gradient-to-b from-zinc-400 to-zinc-500" aria-hidden="true" />
      <span className="absolute -right-[3px] top-[164px] h-20 w-[3px] rounded-r bg-gradient-to-b from-zinc-400 to-zinc-500" aria-hidden="true" />
      <span className="absolute -right-[3px] top-[300px] h-10 w-[3px] rounded-r bg-gradient-to-b from-zinc-500 to-zinc-600" aria-hidden="true" />

      {/* Titanium frame */}
      <div className="rounded-[3.4rem] bg-gradient-to-br from-zinc-300 via-zinc-100 to-zinc-400 p-[3px] shadow-[0_40px_80px_-20px_rgba(15,23,42,0.45)]">
        <div className="rounded-[3.25rem] bg-black p-[10px]">
          <div className="relative h-[620px] w-[290px] overflow-hidden rounded-[2.7rem] bg-white">
            {/* Status bar */}
            <div className={`absolute inset-x-0 top-0 z-30 flex h-12 items-center justify-between px-7 pt-1 text-[13px] font-semibold text-slate-900`}>
              <span className="w-12 tabular-nums">{time}</span>
              <span className="flex w-12 items-center justify-end gap-1" aria-hidden="true">
                <svg viewBox="0 0 18 12" className="h-2.5 w-4" fill="currentColor">
                  <rect x="0" y="8" width="3" height="4" rx="1" />
                  <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
                  <rect x="10" y="3" width="3" height="9" rx="1" />
                  <rect x="15" y="0" width="3" height="12" rx="1" />
                </svg>
                <svg viewBox="0 0 16 12" className="h-2.5 w-3.5" fill="currentColor">
                  <path d="M8 2.5c2.3 0 4.4.9 6 2.4l1.1-1.2A10 10 0 0 0 8 1 10 10 0 0 0 .9 3.7L2 4.9a8.5 8.5 0 0 1 6-2.4Zm0 3.2c1.4 0 2.7.5 3.7 1.4l1.1-1.2A7 7 0 0 0 8 4.1 7 7 0 0 0 3.2 6l1.1 1.2a5.5 5.5 0 0 1 3.7-1.5Zm0 3.2c.6 0 1.1.2 1.5.6L8 11 6.5 9.5c.4-.4.9-.6 1.5-.6Z" />
                </svg>
                <span className={`relative flex h-[11px] w-[22px] items-center rounded-[3px] border border-slate-900/40 p-[1.5px]`}>
                  <span className={`h-full w-[80%] rounded-[1.5px] bg-slate-900`} />
                  <span className={`absolute -right-[3px] h-1 w-[1.5px] rounded-r bg-slate-900/40`} />
                </span>
              </span>
            </div>

            {/* Dynamic Island */}
            <div className="absolute left-1/2 top-2.5 z-40 -translate-x-1/2">
              {island ?? <IdleIsland />}
            </div>

            {/* Screen content */}
            <div className="absolute inset-0 pt-12">{children}</div>

            {/* Home indicator */}
            <div className={`absolute bottom-2 left-1/2 z-40 h-[5px] w-32 -translate-x-1/2 rounded-full bg-slate-900`} aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  )
}

/** Front camera lens with a faint blue reflection, as seen inside the island. */
export function CameraLens() {
  return (
    <span className="relative block h-[11px] w-[11px] rounded-full bg-[#0b0d17] ring-1 ring-white/5" aria-hidden="true">
      <span className="absolute left-[2px] top-[2px] h-[4px] w-[4px] rounded-full bg-gradient-to-br from-indigo-400/60 to-transparent" />
      <span className="absolute bottom-[2px] right-[2px] h-[2px] w-[2px] rounded-full bg-sky-300/30" />
    </span>
  )
}

function IdleIsland() {
  return (
    <div className="flex h-[30px] w-[100px] items-center justify-end rounded-full bg-black pr-3 shadow-[inset_0_0_2px_rgba(255,255,255,0.06)]" aria-hidden="true">
      <CameraLens />
    </div>
  )
}
