'use client'

import { useState, useEffect } from 'react'

export default function ClientHome() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('http://localhost:4000')
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.error('Error:', error))
  }, [])

  return (
    <div className="container mx-auto px-4">
      <main className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold mb-4">
          서버로부터의 메시지: {message}
        </h1>
      </main>
    </div>
  )
}