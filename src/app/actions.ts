"use server"
import { db } from "../db/index"
import { users } from "../db/schema/users"
import { posts } from "../db/schema/posts"
import { cookies } from "next/headers"
import { eq,and } from "drizzle-orm"
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

export async function createPost(
    {
        userId,
        content
    }: {
        userId: number,
        content: string
    }) {
    let postData;

    try {
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
        "success": "Post added",
        "postData": postData
    }
}

export async function getAllPost() {
    try {
        const allPosts = await db.select()
            .from(users)
            .innerJoin(posts, eq(users.id, posts.userId));

        if (allPosts) {
            return {
                "success": "all posts",
                "posts": allPosts
            }
        } else {
            return { "error": "cannot find posts" }
        }
    } catch (err) {
        return { "error": "cannot find posts" }
    }
}

export async function getSinglePost(
    {
        postId
    }: {
        postId: number
    }) {
    try {
        const singlePost = await db.select()
            .from(posts)
            .where(eq(posts.id, postId))
            .then((res) => res[0]);

        if (singlePost) {
            return {
                "success": "single post",
                "post": singlePost
            }
        } else {
            return { "error": "cannot find post" }
        }
    } catch (err) {
        return { "error": "cannot find post" }
    }
}


export async function updatePost(
    {
        postId,
        userId,
        content

    }: {
        postId: number,
        userId: number,
        content: string
    }) {
    try {
        let updatedPost = await db.update(posts).set({
            "content": content
        }).where(and(eq(posts.id, postId), eq(posts.userId, userId))).returning().run();
        if(updatedPost){
            return {
                "success": "post updated"
            }
        } else{
            return { "error": "cannot update post" }
        }
    } catch (err) {
        return { "error": "cannot update post" }
    }
}

export async function deletePost(
    {
        postId,
        userId,
    }: {
        postId: number,
        userId: number
    }) {
    try {
        const deletedPost = await db.delete(posts).where(and(eq(posts.id, postId),eq(posts.userId,userId))).returning().run();
        if(deletedPost){
            return {
                "success": "post deleted"
            }
        } else{
            return { "error": "cannot delete post" }
        }
    } catch (err) {
        return { "error": "cannot delete post" }
    }
}

export async function deleteUser(
    { userId }: { userId: number }
) {
    try {
        await db.delete(users).where(eq(users.id, userId));
        return userId;
    } catch (err) {
        console.log(err);
        return "Error encountered while deleting user"
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
    //@ts-ignore
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const userInDB = await db.select()
        .from(users)
        .where(eq(users.username, userName))
        .then((res) => res[0])

    let result = await db.insert(users).values({
        "username": userName,
        "password": hash
    }).returning().run()

    let signedUser = {
        id: result.rows[0].id,
        username: result.rows[0].username,
        password: result.rows[0].password
    };

    console.log({ signedUser });

    return signedUser;
}

export async function signUp(
    {
        userName,
        password
    }: {
        userName: string,
        password: string
    }
) {
    let addedUser = await createUser({ userName, password });
    jwt.sign({ user: userName }, process.env.SECRET, (err: Error, token: string) => {
        if (err) {
            console.log(err);
            throw new Error("Unable to log in")
        }
        cookies().set("user_token", token)
        cookies().set("user_name", userName);
    });
    return {
        "success": "Signed up user successfully",
        user: addedUser
    }
}

export async function Login(
    {
        userName,
        password
    }: {
        userName: string,
        password: string
    }
) {
    try {
        let currentUser = await db.select()
            .from(users)
            .where(eq(users.username, userName))
            .then((res) => res[0])

        if (currentUser && bcrypt.compareSync(password, currentUser.password)) {
            delete (currentUser as { password?: string }).password;

            jwt.sign(currentUser, process.env.SECRET, (err: Error, token: string) => {
                if (err) {
                    console.log(err);
                    throw new Error("Unable to log in")
                }
                cookies().set("user_token", token)
                cookies().set("user_name", userName);
            });
            return { "success": "user log in" }
        } else {
            throw new Error("Unable to log in")
        }
    } catch (err) {
        return { "failure": "user unable to log in" }
    }
}


