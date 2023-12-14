"use client"
import React,{useState} from "react"
import {createPost as createPostAction} from "../actions"
export default function CreatePostForm({userId}:{userId:number}){
  const [content, setContent] = useState<string>("");

  const handleCreatePost = async (e:React.FormEvent) => {
    e.preventDefault()

    const res = await createPostAction({
      userId,
      content
    })

    if(res.success){
      console.log(res.postData)
    } else{
      console.log("bitch wyd")
    }
    console.log({content});
  }

  return  (
    <form onSubmit={handleCreatePost} className="flex flex-col gap-2 justify-center items-center">
      <input
        className="text-black p-10 rounded"
        type="text"
        onChange={(e)=>{
          setContent(e.target.value);
        }} placeholder="content Bitch">
      </input>
      <input 
        className="bg-slate-500 rounded p-3"
        type="submit" value="submit"></input>
    </form>
  )
}
