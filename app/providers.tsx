'use client'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import GoogleAnalytics from './googleAnalytics'

const queryClient = new QueryClient()

interface Props {
  children?: React.ReactNode
}

export function NextProvider({ children }: Props) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <GoogleAnalytics GA_TRACKING_ID={process.env.NEXT_PUBLIC_GA_ID} />
          {children}
          <ReactQueryDevtools />
          <Toaster />
        </SessionProvider>
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export function NextLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
