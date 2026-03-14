import { cn } from "@/utils/utils"

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export default function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("max-w-screen-xl mx-auto px-5 overflow-x-hidden", className)}>
      {children}
    </div>
  )
}
