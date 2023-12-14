import { cookies } from "next/headers";
import { db } from "@/db";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import CreatePostForm from "../components/create-form";

export default async function createPost() {


  const username = cookies().get("user_name")?.value
  let currentUser = await db.select()
    .from(users)
    .where(eq(users.username, username ?? "")) // Use the casted value or an empty string as fallback
    .then((res) => {
      return res[0];
    });
  console.log(currentUser?.id);

  return (
    <>
      {
        currentUser?.username ? <CreatePostForm userId={currentUser?.id} />
          : <div>Not logged in</div>
      }
    </>

  )
}

