import Aside from "./aside";
import Panel from "./panel";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {

  const session = await getServerSession();

  if (!session) {
    redirect("/auth/sign-in");
  }

  return (
    <main className="bg-[#1a1a1a] flex flex-row overflow-hidden">
        <Aside />
        <Panel />
    </main>
  );
}
