import { useRouter } from 'next/router'
import React from 'react'
export default function SinglePost(){
    const router = useRouter()
    const { id } = router.query
    console.log(id)

    return (

        <h1>Single Post</h1>
    )
}
