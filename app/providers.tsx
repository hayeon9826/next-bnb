'use client'

import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { Toaster } from 'react-hot-toast'
import { RecoilRoot } from 'recoil'

const queryClient = new QueryClient()

interface Props {
  children?: React.ReactNode
}

export const NextProvider = ({ children }: Props) => {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools />
        <Toaster />
      </QueryClientProvider>
    </RecoilRoot>
  )
}

export const NextLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
