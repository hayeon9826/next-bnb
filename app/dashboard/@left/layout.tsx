'use client'

import ErrorBoundary from '@/components/ErrorBoundary'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      fallback={
        <>
          <div className="text-center min-h-screen flex flex-col justify-center">
            <h1 className="text-rose-700 font-bold text-2xl">
              Error Boundary!!
            </h1>
            <p className="text-gray-500 mt-4 text-sm">
              Something went wrong...please try again
            </p>
          </div>
        </>
      }
    >
      {children}
    </ErrorBoundary>
  )
}
