"use client"
import React from "react"
import { signUp} from "../actions"
import { useRouter } from 'next/navigation'
export default function SignUp(){
  const [userName, setUserName] = React.useState<string>("")
  const [password,  setPassword] = React.useState<string>("")
  const router = useRouter()
  const handleAddUser = async (e: React.FormEvent) =>{
    e.preventDefault()

    let resp =  await signUp({
      userName: userName,
      password: password
    })

    if(resp.success){
      router.replace(`/posts`)
    }
  }
  return (
    <div className=" flex flex-col  justify-center items-center">
      <h1 className="text-xxl">
        Signup Page
      </h1>
      <form 
        className="flex flex-col gap-2 w-[25rem]"
        onSubmit={handleAddUser} >
        <input 
          className="text-black p-4 rounded"
          placeholder="username"
          onChange={(e)=>{setUserName(e.target.value)}}>
        </input>
        <input 
          className="text-black p-4 rounded"
          placeholder="password"
          type="password"
          onChange={(e)=>{setPassword(e.target.value)}}>
        </input>
        <input className="bg-slate-500 rounded p-3 w-[50%] mx-auto" type="submit" value="Signup"></input>
      </form>
    </div>  )
}
