import { axiosInstance } from "@/lib/utils";

interface SignUpBody {
  name: string;
  email: string;
  password: string;
}

export const signupHandler = async (body: SignUpBody) => {
  try {
    const { name, email, password } = body;
    const response = await axiosInstance.post("/auth/signup", {
      name,
      email,
      password,
    });

    return {
      status: true,
      data: response.data,
    };
  } catch (err) {
    console.error(err);
    return {
      status: false,
      data: err.response.data.message,
    };
  }
};
