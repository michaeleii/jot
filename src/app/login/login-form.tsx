// "use client";

// import { useFormState } from "react-dom";
// import FormErrors from "@/components/form-errors";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/lib/utils";
// import { State, login } from "./actions";
// import FormSubmitButton from "@/components/form-submit-button";

// const initialState: State = { message: null };

// export default function LoginForm() {
//   const [state, formAction] = useFormState(login, initialState);
//   return (
//     <form action={formAction} className="space-y-5">
//       <h1 className="main-heading">Login</h1>
//       <Input
//         className={cn({ "border-destructive": state?.message })}
//         name="username"
//         placeholder="Enter your username..."
//         aria-describedby="username-error"
//       />
//       {state?.message && (
//         <FormErrors id="username-error" errors={[state.message]} />
//       )}
//       <FormSubmitButton value="Login" loadingValue="Logging in..." />
//     </form>
//   );
// }
