import { useFormState } from "react-dom";
import FormErrors from "@/components/form-errors";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { State, login } from "./actions";

const initialState: State = { message: null };

export default function LoginForm() {
  const [state, formAction] = useFormState(login, initialState);
  return (
    <form action={formAction} className="space-y-3">
      <Input
        className={cn({ "border-destructive": state?.message })}
        name="username"
        placeholder="Enter your username..."
        aria-describedby="username-error"
      />
      {state?.message && (
        <FormErrors id="username-error" errors={[state.message]} />
      )}
    </form>
  );
}
