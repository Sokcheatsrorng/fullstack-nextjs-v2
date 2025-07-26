import { SignIn, SignOut } from "@/components/auth/AuthButton";
import { authOptions } from "@/lib/key-cloak-auth/next-auth-options";
import { getServerSession } from "next-auth";


export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
   <div>
       {!!session && <pre>{JSON.stringify(session, null, 2)}</pre>}
      {!!session ? <SignOut /> : <SignIn/>}

   </div>
  );
}
