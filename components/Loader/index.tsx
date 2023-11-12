import { GridLayout } from '../RoomGrid';

export function Loader({ className }: { className?: string }) {
  return (
    <div className={`flex gap-3 justify-center mt-10 ${className}`}>
      <div className="w-1 h-1 animate-ping rounded-full bg-gray-600" />
      <div className="w-1 h-1 animate-ping rounded-full bg-gray-600" />
      <div className="w-1 h-1 animate-ping rounded-full bg-gray-600" />
    </div>
  );
}

export function GridLoader({ className }: { className?: string }) {
  return (
    <GridLayout>
      {[...Array(8)].map((e, i) => (
        <div
          key={i}
          className="rounded-md w-full h-80 md:h-56 object-fit bg-gray-200 animate-pulse"
        />
      ))}
    </GridLayout>
  );
}

export function ListLoader({ className }: { className?: string }) {
  return (
    <div className={`grid md:grid-cols-2 gap-4 ${className}`}>
      {[...Array(8)].map((e, i) => (
        <div
          key={i}
          className="rounded-md w-full h-40 md:h-32 object-fit bg-gray-200 animate-pulse"
        />
      ))}
    </div>
  );
}

export function FullPageLoader() {
  return (
    <div className="fixed w-full top-0 inset-x-0 h-screen flex flex-col justify-center bg-black/60 z-50">
      <div className="animate-spin w-10 h-10 text-gray-400 rounded-full border-[4px] m-auto border-t-transparent border-current" />
    </div>
  );
}
