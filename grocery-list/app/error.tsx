'use client' 
 
import { title } from '@/components/primitives'
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  useEffect(() => {    
    console.error(error)
  }, [error])
 
  return (
    <div>
      <h2 className={title()}>Algo deu errado!</h2>
      <button
        onClick={() => reset()}
      >
        Tentar novamente
      </button>
    </div>
  )
}