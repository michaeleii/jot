import FormSubmitButton from "@/components/form-submit-button";
import { logout } from "./actions";
import { LogOutIcon } from "lucide-react";

export default function SignOutForm() {
  return (
    <form action={logout} className="w-full">
      <FormSubmitButton
        variant="ghost"
        value={
          <div className="flex items-center justify-start pr-6">
            <LogOutIcon className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </div>
        }
        loadingValue="Please wait..."
      />
    </form>
  );
}
