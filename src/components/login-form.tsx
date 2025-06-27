import { cn, saveToLocalStorage } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { loginHandler } from "@/services/authServices";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAppDispatch } from "@/store/hook";
import { updateAuth } from "@/reducers/authSlice";

const formSchema = z.object({
  email: z.string().email("Email is required"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof formSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const navigateToSignup = () => {
    navigate("/signup");
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const response = await loginHandler(data);
    if (response.status) {
      toast.success("Login successfull");
      saveToLocalStorage("user", JSON.stringify(response.data.user));
      dispatch(
        updateAuth({
          loading: false,
          authenticated: true,
        })
      );
      navigate("/");
    } else {
      toast.error(response.data as unknown as string);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "john.doe@example.com",
      password: "123",
    },
    resolver: zodResolver(formSchema),
  });

  return (
    <div
      className={cn("flex flex-col gap-6 justify-center", className)}
      {...props}
    >
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">
                  Login to your Family Tree account
                </p>
              </div>
              <div className="h-18">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="john@example.com"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <span className="text-start text-sm text-red-400 w-full inline-block">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="h-18">
                <div className="grid gap-3">
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                  />
                </div>
                {errors.password && (
                  <span className="text-start text-sm text-red-400 w-full inline-block">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <Button
                type="submit"
                className="w-full cursor-pointer hover:bg-emerald-200"
              >
                Login
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>
              <div className="w-xs">
                <Button
                  variant="outline"
                  type="button"
                  className="w-full cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a
                  onClick={navigateToSignup}
                  className="underline underline-offset-4 cursor-pointer"
                >
                  Sign up
                </a>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="https://images.pexels.com/photos/8795390/pexels-photo-8795390.jpeg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
