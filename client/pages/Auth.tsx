import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, Mail } from "lucide-react";

export default function Auth() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirm?: string;
  }>({});

  const title = useMemo(
    () => (mode === "login" ? "Welcome back" : "Create your account"),
    [mode],
  );

  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Enter a valid email";
    if (password.length < 6)
      errs.password = "Password must be at least 6 characters";
    if (mode === "signup" && password !== confirm)
      errs.confirm = "Passwords do not match";
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      alert(`${mode === "login" ? "Logged in" : "Signed up"} (demo)`);
    }
  };

  return (
    <section className="relative min-h-[calc(100vh-64px-64px)] overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-10 text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(900px_500px_at_10%_-10%,rgba(99,102,241,0.25),transparent),radial-gradient(900px_500px_at_90%_0%,rgba(236,72,153,0.25),transparent)]" />

      <div className="container grid items-center justify-center gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-extrabold md:text-4xl">{title}</h1>
          <p className="mt-2 max-w-md text-white/80">
            Sign in to continue or create a new account. You can switch between
            Login and Signup at any time.
          </p>
          <div className="mt-6 hidden md:block">
            <div className="relative overflow-hidden rounded-2xl border bg-white/5 p-6 backdrop-blur">
              <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(600px_300px_at_20%_20%,rgba(99,102,241,0.35),transparent),radial-gradient(600px_300px_at_80%_80%,rgba(236,72,153,0.35),transparent)]" />
              <p className="text-sm text-white/80">
                Build resumes, portfolios, and pitches with beginner‑friendly
                tools. Save progress locally and export anytime.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto w-full max-w-md"
        >
          <div className="relative overflow-hidden rounded-2xl border bg-card p-6 shadow-xl">
            <div className="pointer-events-none absolute -inset-1 -z-10 rounded-3xl bg-gradient-to-r from-indigo-500/30 via-fuchsia-500/30 to-sky-500/30 blur-2xl" />

            <Tabs value={mode} onValueChange={(v) => setMode(v as any)}>
              <TabsList className="w-full justify-center gap-2 bg-transparent p-0 text-foreground">
                <TabsTrigger
                  value="login"
                  className="rounded-full bg-muted/60 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="rounded-full bg-muted/60 px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Signup
                </TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                {/* Login */}
                <TabsContent value="login" className="mt-4">
                  <motion.form
                    key="login"
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                    onSubmit={onSubmit}
                  >
                    <div>
                      <Label htmlFor="email" className="mb-1 block">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                          errors.email ? "email-err" : undefined
                        }
                      />
                      {errors.email ? (
                        <div
                          id="email-err"
                          className="mt-1 text-xs text-red-400"
                        >
                          {errors.email}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Label htmlFor="password" className="mb-1 block">
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        aria-invalid={Boolean(errors.password)}
                        aria-describedby={
                          errors.password ? "pass-err" : undefined
                        }
                      />
                      {errors.password ? (
                        <div
                          id="pass-err"
                          className="mt-1 text-xs text-red-400"
                        >
                          {errors.password}
                        </div>
                      ) : null}
                    </div>
                    <div className="text-right text-sm">
                      <a className="text-primary hover:underline" href="#">
                        Forgot Password?
                      </a>
                    </div>
                    <Button
                      type="submit"
                      className="w-full rounded-full bg-gradient-to-r from-primary to-fuchsia-500 text-white transition hover:brightness-110"
                    >
                      Login
                    </Button>
                    <Divider />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <SocialButton provider="Google" icon={<GoogleIcon />} />
                      <SocialButton
                        provider="GitHub"
                        icon={<Github className="h-4 w-4" />}
                      />
                    </div>
                    <SmallNote />
                  </motion.form>
                </TabsContent>
                {/* Signup */}
                <TabsContent value="signup" className="mt-4">
                  <motion.form
                    key="signup"
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-4"
                    onSubmit={onSubmit}
                  >
                    <div>
                      <Label htmlFor="email" className="mb-1 block">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={
                          errors.email ? "email-err" : undefined
                        }
                      />
                      {errors.email ? (
                        <div
                          id="email-err"
                          className="mt-1 text-xs text-red-400"
                        >
                          {errors.email}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Label htmlFor="password" className="mb-1 block">
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        aria-invalid={Boolean(errors.password)}
                        aria-describedby={
                          errors.password ? "pass-err" : undefined
                        }
                      />
                      {errors.password ? (
                        <div
                          id="pass-err"
                          className="mt-1 text-xs text-red-400"
                        >
                          {errors.password}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <Label htmlFor="confirm" className="mb-1 block">
                        Confirm Password
                      </Label>
                      <Input
                        id="confirm"
                        type="password"
                        placeholder="Re-enter password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        aria-invalid={Boolean(errors.confirm)}
                        aria-describedby={
                          errors.confirm ? "confirm-err" : undefined
                        }
                      />
                      {errors.confirm ? (
                        <div
                          id="confirm-err"
                          className="mt-1 text-xs text-red-400"
                        >
                          {errors.confirm}
                        </div>
                      ) : null}
                    </div>
                    <Button
                      type="submit"
                      className="w-full rounded-full bg-gradient-to-r from-primary to-fuchsia-500 text-white transition hover:brightness-110"
                    >
                      Create Account
                    </Button>
                    <Divider />
                    <div className="grid gap-3 sm:grid-cols-2">
                      <SocialButton provider="Google" icon={<GoogleIcon />} />
                      <SocialButton
                        provider="GitHub"
                        icon={<Github className="h-4 w-4" />}
                      />
                    </div>
                    <SmallNote />
                  </motion.form>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Divider() {
  return (
    <div className="relative py-2 text-center text-xs text-muted-foreground">
      <span className="bg-card px-2">or</span>
      <div className="absolute left-0 top-1/2 h-[1px] w-full -translate-y-1/2 bg-border" />
    </div>
  );
}

function SmallNote() {
  return (
    <div className="text-center text-xs text-muted-foreground">
      By continuing, you agree to our Terms and Privacy Policy.
    </div>
  );
}

function SocialButton({
  provider,
  icon,
}: {
  provider: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className="inline-flex w-full items-center justify-center gap-2 rounded-full border bg-white/70 px-4 py-2 font-medium text-foreground/80 backdrop-blur transition hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_8px_28px_rgba(99,102,241,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {icon}
      Continue with {provider}
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 48 48"
      aria-hidden
      focusable="false"
    >
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303C33.676,32.91,29.229,36,24,36c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      />
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,16.128,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.197l-6.191-5.238C29.162,35.091,26.715,36,24,36 c-5.202,0-9.636-3.064-11.386-7.431l-6.54,5.036C9.393,39.556,16.13,44,24,44z"
      />
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-1.009,2.909-3.137,5.266-5.894,6.565 c0.001-0.001,0.002-0.001,0.003-0.002l6.191,5.238C33.3,40.104,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      />
    </svg>
  );
}
