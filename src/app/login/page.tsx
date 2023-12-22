import MaxWidthWrapper from "@/components/max-width-wrapper";
import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <MaxWidthWrapper className="max-w-lg">
      <LoginForm />
    </MaxWidthWrapper>
  );
}
