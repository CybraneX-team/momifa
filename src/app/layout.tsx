import React from 'react'
import { Metadata } from 'next'
import { Jost, Syne } from 'next/font/google'

import { AdminBar } from './_components/AdminBar'
import { Footer } from './_components/Footer'
import { Header } from './_components/Header'
import { Providers } from './_providers'
import { InitTheme } from './_providers/Theme/InitTheme'
import { mergeOpenGraph } from './_utilities/mergeOpenGraph'

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import './_css/app.scss'

gsap.registerPlugin(ScrollTrigger);

const jost = Syne({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-jost',
})

export default async function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <title>MOMIFA</title>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className={jost.variable}>
        <Providers>
          <AdminBar />
          {/* @ts-expect-error */}
          <Header />
          <main className="main">{children}</main>
          {/* @ts-expect-error */}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://payloadcms.com'),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
  openGraph: mergeOpenGraph(),
}