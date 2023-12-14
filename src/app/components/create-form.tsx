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
    <form onSubmit={handleCreatePost}>
      <input
        className="text-black"
        type="text"
        onChange={(e)=>{
          setContent(e.target.value);
        }} placeholder="content Bitch">
      </input>
      <input type="submit" value="submit"></input>
    </form>
  )
}
