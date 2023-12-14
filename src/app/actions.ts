"use server"

import { db } from "@/db"
import { users } from "@/db/schema/users"
import { posts } from "@/db/schema/posts"
import {cookies} from "next/headers"
import { eq } from "drizzle-orm"
const bcrypt = require('bcrypt');
const saltRounds = 10;
export async function createPost(
    {
        userId,
        content
    }: {
        userId: number,
        content: string
    }
) {
    let postData;

    try {

        console.log("userId: ", userId)
        console.log("content: ", content)
        postData = await db.insert(posts).values({
            "userId": userId,
            "content": content
        }).returning().run()
    } catch (err) {
        return {
            "failure": "Failed to insert post"
        }
    }

    return {
        "success": "Post added Sexfully",
        "postData": postData
    }
}

export async function createUser(
    {
        userName,
        password
    }: {
        userName: string,
        password: string
    }
) {
    let signedUser;
    try {
        //@ts-ignore
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        signedUser = await db.insert(users).values({
            "username": userName,
            "password": hash
        }).returning().run()
        cookies().set("user_name", userName);
    } catch (err) {
        return { "failure": "Unable to add user" }
    }

    return {
        "success": "user add successfully",
        "signedUser": signedUser
    }
}

export async function Login(
    {
        userName,
        password
    }:{
        userName: string,
        password: string
    }
){
    try{
        let currentUser = await db.select().from(users).where(eq(users.username, userName)).then((res)=>res[0])
        if(currentUser && bcrypt.compareSync(password, currentUser.password)){
            cookies().set("user_name", currentUser.username)

            return { "success": "user log in"} 
        } else{
            throw new Error("Unable to log in")
        }
    } catch(err){
        return { "failure": "user unable to log in" }
    }
}


export async function getAllPost() {
    try{
        const allPosts = await db.select().from(posts);
        if(allPosts){
            return {
                "success": "all posts",
                "posts": allPosts
            }
        } else{
            return {"error": "cannot find posts"}
        }
    } catch(err){
        return {"error": "cannot find posts"}
    }
}
// get single post from db based on the post id passed in the params

export async function getSinglePost({
    postId
}:{
    postId: number
}) {
    try{
        const singlePost = await db.select()
            .from(posts)
            .where(eq(posts.id, postId))
            .then((res)=>res[0]);
        if(singlePost){
            return {
                "success": "single post",
                "post": singlePost
            }
        } else{
            return {"error": "cannot find post"}
        }
    } catch(err){
        return {"error": "cannot find post"}
    }                        
}

