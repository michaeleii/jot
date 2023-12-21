import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function SinglePostPage() {
  return (
    <MaxWidthWrapper>
      <article className="p-10">
        <h1 className="main-heading">Merry Christmas</h1>
        <span className="mb-5 text-sm text-muted-foreground">
          By michaellei
        </span>
        <p className="mt-10 text-muted-foreground">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          voluptatum?
        </p>
      </article>
    </MaxWidthWrapper>
  );
}
