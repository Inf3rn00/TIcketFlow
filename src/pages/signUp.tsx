import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { z } from "zod";
import { ArrowLeft, UserPlus, Eye, EyeOff } from "lucide-react";

const signupSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, { message: "Name must be at least 2 characters" })
      .max(50, { message: "Name must be less than 50 characters" }),
    email: z
      .string()
      .trim()
      .email({ message: "Please enter a valid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" })
      .max(100, { message: "Password must be less than 100 characters" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate("/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);

    try {
      // Validate input
      signupSchema.parse({ name, email, password, confirmPassword });

      // Attempt signup
      await signup(email, password, name);
      toast.success("Account created successfully! Welcome to TicketFlow.");
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = password.length >= 6 ? "strong" : password.length >= 3 ? "medium" : "weak";

  return (
    <div className="min-h-screen flex items-center justify-center bg-background py-12 px-4">
      {/* Back to home button */}
      <Link
        to="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-medium">Back to home</span>
      </Link>

      <Card className="w-full max-w-md border-border shadow-sm">
        <CardHeader className="space-y-3 text-center pb-6">
          <div className="mx-auto w-12 h-12 rounded-md bg-primary flex items-center justify-center mb-2">
            <UserPlus className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-foreground">
              Create account
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Join thousands of teams managing their workflow
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Joshua Dodo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={!!errors.name}
                className="bg-background"
                disabled={isLoading}
              />
              {errors.name && (
                <p className="text-sm text-destructive font-medium">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!errors.email}
                className="bg-background"
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-destructive font-medium">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  {showPassword ? (
                    <>
                      <EyeOff className="w-4 h-4" />
                      Hide
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      Show
                    </>
                  )}
                </button>
              </div>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a secure password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!errors.password}
                className="bg-background"
                disabled={isLoading}
              />
              {/* Simple strength indicator */}
              {password && (
                <div className="flex items-center gap-2 text-xs">
                  <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${passwordStrength === "weak" ? "w-1/3 bg-destructive" :
                        passwordStrength === "medium" ? "w-2/3 bg-yellow-500" :
                          "w-full bg-green-500"
                        }`}
                    />
                  </div>
                </div>
              )}
              {errors.password && (
                <p className="text-sm text-destructive font-medium">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  {showConfirmPassword ? (
                    <>
                      <EyeOff className="w-4 h-4" />
                      Hide
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      Show
                    </>
                  )}
                </button>
              </div>
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                aria-invalid={!!errors.confirmPassword}
                className="bg-background"
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive font-medium">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Creating account...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Create account
                </div>
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4 pt-2">
          <div className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="font-medium text-primary hover:underline transition-colors"
            >
              Sign in here
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;