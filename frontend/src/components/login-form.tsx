import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome Back</h1>
          <p className="text-sm text-slate-500">
            Enter your credentials to access your decks
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="username">Username</FieldLabel>
          <Input id="username" type="text" name="username" placeholder="johndoe" required className="border-slate-200 focus:ring-slate-900" />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
          </div>
          <Input id="password" type="password" name="password" required className="border-slate-200 focus:ring-slate-900" />
        </Field>
        <Field>
          <Button type="submit" className="w-full bg-slate-900 text-white hover:bg-slate-800 h-11">
            Login
          </Button>
        </Field>
        <Field>
          <div className="text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="underline underline-offset-4 font-medium text-slate-900 hover:text-slate-700">
              Sign up
            </a>
          </div>
        </Field>
      </FieldGroup>
    </form>
  )
}
