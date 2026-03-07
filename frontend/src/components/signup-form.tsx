import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signup } from "@/services/auth.service";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      await signup(data);
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Create Account</h1>
          <p className="text-sm text-slate-500">
            Join Decky and start mastering your cards
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input id="username" name="username" placeholder="johndoe" required className="border-slate-200 focus:ring-slate-900" />
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input id="password" name="password" type="password" required className="border-slate-200 focus:ring-slate-900" />
        </Field>
        <Field>
          <Button type="submit" className="w-full bg-slate-900 text-white hover:bg-slate-800 h-11" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
        </Field>
        <div className="text-center text-sm text-slate-500">
          Already have an account?{" "}
          <a href="/login" className="underline underline-offset-4 font-medium text-slate-900 hover:text-slate-700">
            Login
          </a>
        </div>
      </FieldGroup>
    </form>
  );
}
