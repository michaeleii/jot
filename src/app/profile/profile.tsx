import Image from "next/image";
import { getCurrentUser } from "@/lib/auth";

export async function Profile() {
  const user = await getCurrentUser();
  return (
    <article className="card flex flex-wrap justify-between">
      <div>
        <h1 className="main-heading">{user.name}</h1>
      </div>
      <Image
        className="rounded-full"
        src={user.image || "ttps://www.gravatar.com/avatar/?d=mp"}
        alt={user.name || ""}
        width={100}
        height={100}
        quality={100}
      />
    </article>
  );
}
