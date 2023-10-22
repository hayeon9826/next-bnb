import { GridLayout } from '../RoomGrid'

export function Loader({ className }: { className?: string }) {
  return (
    <div className={`flex gap-4 justify-center mt-10 ${className}`}>
      <div className="w-2 h-2 animate-ping rounded-full bg-gray-500" />
      <div className="w-2 h-2 animate-ping rounded-full bg-gray-500" />
      <div className="w-2 h-2 animate-ping rounded-full bg-gray-500" />
    </div>
  )
}

export function LoaderGrid({ className }: { className?: string }) {
  return (
    <GridLayout>
      {[...Array(12)].map((e, i) => (
        <div
          key={i}
          className="rounded-md w-full h-72 md:h-56 object-fit bg-gray-200 animate-pulse"
        />
      ))}
    </GridLayout>
  )
}
