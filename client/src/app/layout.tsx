import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: ['400', '500'],
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '모아요',
  description: '프로젝트 모집 서비스',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    return (
      <html lang="ko" className={roboto.className}>
        <body>{children}</body>
      </html>
    )
}