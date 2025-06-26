import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupHandler } from "@/services/authServices";
import { toast } from "sonner";

const formSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(3, "Password is required"),
    confirmPassword: z.string().min(3, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

type FormData = z.infer<typeof formSchema>;

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const response = await signupHandler(data);

    if (response.status) {
      toast.success("Signup successfull, Login to continue!");
      reset();
    } else {
      toast.error(response.data);
    }
  };

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div
      className={cn("flex flex-col gap-6 justify-center", className)}
      {...props}
    >
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-6 md:p-8 md:w-md"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold text-start w-full">
                  Create an account
                </h1>
                <p className="text-muted-foreground text-start text-sm">
                  Let's get started. Fill in the details below to create your
                  account.
                </p>
              </div>
              <div className="h-16">
                <div className="grid gap-3">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" {...register("name")} />
                </div>
                {errors.name && (
                  <span className="text-start text-sm text-red-400 w-full inline-block">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div className="h-16">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" {...register("email")} />
                </div>
                {errors.email && (
                  <span className="text-start text-sm text-red-400 w-full inline-block">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="h-16">
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
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
              <div className="h-16">
                <div className="grid gap-3">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    {...register("confirmPassword")}
                  />
                </div>
                {errors.confirmPassword && (
                  <span className="text-start text-sm text-red-400 w-full inline-block">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
              <Button
                type="submit"
                className="w-full hover:bg-emerald-200 cursor-pointer"
              >
                Signup
              </Button>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"></div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <a
                  onClick={navigateToLogin}
                  className="underline underline-offset-4 cursor-pointer hover:text-(--secondary-foreground)"
                >
                  Login
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
