'use client'

import { useState, useEffect } from 'react'
import Navigation from './Navigation'
import Banner from './Banner'

export default function ClientHome() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('http://localhost:4000')
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.error('Error:', error))
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation/>
      <Banner />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">
          서버로부터의 메시지: {message}
        </h1>
      </main>
    </div>
  )
}