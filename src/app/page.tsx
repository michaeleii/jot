import MaxWidthWrapper from "@/components/max-width-wrapper";
import { PencilIcon } from "lucide-react";

function PostItem() {
  return (
    <div>
      <p className="mb-5 text-xs text-gray-500 tracking-widest">10.11.18</p>
      <article className="p-10 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <h2 className="font-semibold mb-2">Lorem ipsum dolor sit amet.</h2>
        <p className="text-sm text-gray-500">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          voluptatum?
        </p>
      </article>
    </div>
  );
}

function PostList() {
  return (
    <div className="space-y-10 mb-10">
      {Array.from({ length: 5 }).map((_, i) => (
        <PostItem key={i} />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <MaxWidthWrapper>
      <div className="border-b-2 pb-2 mb-5 flex justify-between items-baseline">
        <PencilIcon className="w-6 h-6" />
        <p className="text-lg font-semibold font-">Your feed</p>
      </div>
      <PostList />
    </MaxWidthWrapper>
  );
}
