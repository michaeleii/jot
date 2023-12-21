type MaxWidthWrapperProps = {
  children: React.ReactNode;
};

export default function MaxWidthWrapper({ children }: MaxWidthWrapperProps) {
  return <main className="pt-5 px-5 max-w-4xl mx-auto">{children}</main>;
}
