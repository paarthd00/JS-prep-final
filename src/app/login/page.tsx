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

    console.log(userName)
    console.log(password);
  }
  return (
    <form onSubmit={handleLoginUser}>
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
  )}
