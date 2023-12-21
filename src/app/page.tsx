import MaxWidthWrapper from "@/components/max-width-wrapper";
import { CircleIcon, MessageSquare, PencilIcon } from "lucide-react";
import Link from "next/link";

function PostItem() {
  return (
    <>
      <div className="absolute -left-2.5">
        <CircleIcon className="h-4 w-4 fill-background stroke-muted-foreground" />
      </div>
      <div>
        <p className="mb-5 text-xs tracking-widest text-muted-foreground">
          10.11.18
        </p>
        <Link href="/post/1">
          <article className="card transition-all hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] dark:hover:shadow-[0_3px_10px_rgb(255,255,255,0.2)]">
            <h2 className="mb-2 text-lg font-semibold">Merry Christmas</h2>
            <p className="text-sm text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              voluptatum?
            </p>
          </article>
        </Link>
      </div>
    </>
  );
}

function PostList() {
  return (
    <div className="relative mb-20 space-y-10 border-l-2 pl-10">
      {Array.from({ length: 5 }).map((_, i) => (
        <PostItem key={i} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <MaxWidthWrapper>
      <div className="mb-5 flex items-baseline justify-between border-b-2 pb-5">
        <MessageSquare className="h-6 w-6" />
        <p className="text-lg font-semibold">For you</p>
      </div>
      <PostList />
    </MaxWidthWrapper>
  );
}
