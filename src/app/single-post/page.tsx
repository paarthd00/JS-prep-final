'use client'
 
import { useSearchParams } from 'next/navigation'
import React from 'react' 
 
export default function SinglePost(){
  const searchParams = useSearchParams()

  const id = searchParams.get('id')
  return <>
    you searched :: {id}
    
  </>
}

