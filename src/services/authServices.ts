import { axiosInstance, baseUrl } from "@/lib/utils";

interface SignUpBody {
  name: string;
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

interface LoginResponse {
  status: boolean;
  data: {
    token: string;
    user: Record<string, string>;
  };
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

export const loginHandler = async (body: LoginBody): Promise<LoginResponse> => {
  try {
    const { email, password } = body;
    const response = await axiosInstance.post("/auth/login", {
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

export const logoutHandler = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");

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

export const fetchLoggedInUser = async () => {
  try {
    const response = await axiosInstance.get("/auth/me");
    return {
      status: true,
      data: response.data,
    };
  } catch (err) {
    console.error(err);
    throw {
      status: false,
      data: err.response.data.message,
    };
  }
};

export const loginWithGoogle = () => {
  window.location.href = `${baseUrl}/auth/google`;
};
