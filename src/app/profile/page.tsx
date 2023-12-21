import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function Profile() {
  return (
    <MaxWidthWrapper>
      <article className="card">
        <h1 className="main-heading">michaellei</h1>
        <p className="text-muted-foreground mt-10">Enter your bio here.</p>
      </article>
    </MaxWidthWrapper>
  );
}
