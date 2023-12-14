"use client"
import React from "react"
import { createUser } from "../actions"
export default function SignUp(){
  const [userName, setUserName] = React.useState<string>("")
  const [password,  setPassword] = React.useState<string>("")

  const handleAddUser = async (e: React.FormEvent) =>{
    e.preventDefault()
    
   let resp =  await createUser({
      userName: userName,
      password: password
    })

    if(resp.success){
      console.log(resp.signedUser)
    }

    console.log(userName)
    console.log(password);
  }
  return (
    <form onSubmit={handleAddUser}>
      <input 
        className="text-black"
        placeholder="username"
        onChange={(e)=>{setUserName(e.target.value)}}>
      </input>
      <input 
        className="text-black"
        placeholder="password"
        type="password"
        onChange={(e)=>{setPassword(e.target.value)}}>
      </input>
      <input type="submit" value="signup"></input>
    </form>
  )
}
