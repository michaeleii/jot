import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function SinglePostPage() {
  return (
    <MaxWidthWrapper>
      <article className="p-10">
        <h2 className="font-semibold text-4xl mb-2">Merry Christmas</h2>
        <span className="text-sm mb-5 text-muted-foreground">
          By Michael Lei
        </span>
        <p className="text-muted-foreground mt-10">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          voluptatum?
        </p>
      </article>
    </MaxWidthWrapper>
  );
}
