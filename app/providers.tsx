'use client'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { useLayoutEffect, useState } from 'react'

interface Props {
  children?: React.ReactNode
}

export const NextProvider = ({ children }: Props) => {
  const [isMockReady, setIsMockReady] = useState(false)

  useLayoutEffect(() => {
    const mock = async () => {
      const { worker } = await import('../mocks/browser')
      await worker.start()
      setIsMockReady(true)
    }
    mock()
  }, [isMockReady])

  return <>{children}</>
}

export const NextLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <div className="mt-20 p-10">{children}</div>
      <Footer />
    </>
  )
}
