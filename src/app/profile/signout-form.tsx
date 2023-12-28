import { signOut } from "@/auth";

import FormSubmitButton from "@/components/form-submit-button";

async function logout() {
  "use server";
  await signOut({
    redirectTo: "/",
  });
}

export default async function SignOutForm() {
  return (
    <form action={logout} className="mt-3 w-full">
      <FormSubmitButton
        variant="secondary"
        value="Sign Out"
        loadingValue="Signing Out..."
      />
    </form>
  );
}
