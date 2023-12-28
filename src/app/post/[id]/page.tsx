import MaxWidthWrapper from "@/components/max-width-wrapper";
import SinglePostItem from "./single-post-item";

type SinglePostPageProps = {
  params: { id: string };
};

export default function SinglePostPage({ params }: SinglePostPageProps) {
  const postId = +params.id;
  return (
    <MaxWidthWrapper className="mt-10">
      <SinglePostItem postId={postId} />
    </MaxWidthWrapper>
  );
}
