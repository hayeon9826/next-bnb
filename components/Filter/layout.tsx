import { ReactNode } from 'react'
import cn from 'classnames'

interface FilterLayoutProps {
  title: string
  children: ReactNode
  isShow?: boolean
}

export default function FilterLayout({
  title,
  children,
  isShow = true,
}: FilterLayoutProps) {
  return (
    <div
      className={cn(
        'z-10 border px-8 py-10 border-gray-20 shadow-lg flex flex-col absolute bg-white w-full sm:max-w-3xl md:w-[768px] left-0 rounded-xl sm:top-[70px] top-80',
        {
          hidden: !isShow,
        },
      )}
    >
      <div className="text-sm font-semibold">{title}</div>
      {children}
    </div>
  )
}
