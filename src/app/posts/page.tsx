import { getAllPost } from "../actions"
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
    const res = await getAllPost();
    if(res.success){
        posts = res.posts;
        console.log(posts);
    } else{
        console.log(res.error);
    }

    return (
        <div className="flex flex-col items-center justify-center">
            {
                posts.map((post:typePost,i:number) => {
                    return (
                        <div key={i} className="bg-slate-500 rounded p-4">
                            <h1>{post.users.username}</h1>

                            <h1>{post.posts.content}</h1>
                        </div>
                    )
                })
            }
        </div>
    )
}
