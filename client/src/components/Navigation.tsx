'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import LoginModal from './LoginModal'

export default function Navigation() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="font-bold">
          <Image src="/images/logo.png" alt="모아요 로고" width={75} height={75} />
        </Link>
        <ul className="flex space-x-12">
          <li><Link href="/projects">프로젝트 찾기</Link></li>
          <li><Link href="/workspace">워크스페이스</Link></li>
          <li><Link href="/community">자유게시판</Link></li>
        </ul>
        <button onClick={() => setIsLoginModalOpen(true)}>로그인</button>
      </div>
      {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} />}
    </nav>
  )
}