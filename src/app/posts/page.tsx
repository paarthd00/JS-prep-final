import { getAllPost, verifyToken} from "../actions"
import { cookies } from "next/headers";
type typePost=  {
    users: {
        id: number,
        username: string,
        password: string,
    },
    posts: { id: number, userId: number, content: string }
}
export default async function Posts() {
    let posts:typePost[]=[];
    let verified = false;
    const res = await getAllPost();
    if(cookies().get("user_token") && cookies().get("user_name")){
        const userToken = cookies().get("user_token")?.value || ""; 
        const userName = cookies().get("user_name")?.value || "";  
        let resp = await verifyToken({"token": userToken.toString(), "username": userName.toString()});
        if(resp.success){
            verified = true;
        } else{
            console.log(resp.failure);
        }
    }
    if(res.success){
        posts = res.posts;
    } else{
        console.log(res.error);
    }

    return (
        <div className="flex flex-col items-center justify-center">
            
            {
               verified ?  posts?.map((post:typePost,i:number) => {
                    return (
                        <div key={i} className="bg-slate-500 rounded p-4">
                            <h1>{post.users.username}</h1>

                            <h1>{post.posts.content}</h1>
                        </div>
                    )
                })
                :<div>You are not verified please login</div>
            }
        </div>
    )
}
