"use client"
import React from "react"
import { Login as loginUser} from "../actions"
export default function Login(){
  const [userName, setUserName] = React.useState<string>("")
  const [password,  setPassword] = React.useState<string>("")

  const handleLoginUser = async (e: React.FormEvent) =>{
    e.preventDefault()

    let resp =  await loginUser({
      userName: userName,
      password: password
    })

    if(resp.success){
      console.log(resp.success)
    }

  }
  return (
    <div className=" flex flex-col  justify-center items-center">
      <h1 className="text-xxl">
        Login Page
      </h1>
      <form 
        className="flex flex-col gap-2 w-[25rem]"
        onSubmit={handleLoginUser} >
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
        <input className="bg-slate-500 rounded p-3 w-[50%] mx-auto" type="submit" value="Login"></input>
      </form>
    </div>
  )}
