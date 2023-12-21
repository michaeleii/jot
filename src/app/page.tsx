import MaxWidthWrapper from "@/components/max-width-wrapper";
import { cn } from "@/lib/utils";
import { CircleIcon, PencilIcon } from "lucide-react";
import Link from "next/link";

function PostItem() {
  return (
    <>
      <div className="absolute -left-2.5">
        <CircleIcon className="fill-background w-4 h-4 stroke-muted-foreground" />
      </div>
      <div>
        <p className="mb-5 text-xs text-muted-foreground tracking-widest">
          10.11.18
        </p>
        <Link href="/post/1">
          <article className="p-10  hover:shadow-[0_3px_10px_rgb(0,0,0,0.2)] border dark:hover:shadow-[0_3px_10px_rgb(255,255,255,0.2)] transition-all">
            <h2 className="font-semibold text-lg mb-2">Merry Christmas</h2>
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
    <div className="space-y-10 mb-10 border-l-2 pl-10 relative">
      {Array.from({ length: 5 }).map((_, i) => (
        <PostItem key={i} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <MaxWidthWrapper>
      <div className="border-b-2 pb-5 mb-5 flex justify-between items-baseline">
        <PencilIcon className="w-6 h-6" />
        <p className="text-lg font-semibold">Your feed</p>
      </div>
      <PostList />
    </MaxWidthWrapper>
  );
}
