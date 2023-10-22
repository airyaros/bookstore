import React from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Typography, Button, Input } from "@material-tailwind/react";
import Logo from "../assets/inkverselogo.svg";
import ClickableText from "../components/clickableText/ClickableText";
import SocialMediaIconsList from "../components/socialMediaIconList/SocialMediaIconsList";
import axios from "axios";

type LoginFormData = {
  email: string;
  password: string;
  checkbox: boolean;
};

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  // const onSubmit = (data: LoginFormData) => console.log(data);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await axios.post(
        "https://inkverse-backend.onrender.com/api/login",
        {
          usernameOrEmail: data.email,
          password: data.password,
        }
      );
      console.log("Login response:", response.data);
    } catch (error) {
      console.error("Error during login: ", error);
    }
  };

  return (
    <div className="flex flex-col gap-2 justify-center items-center h-[95vh] font-mulish">
      <Helmet>
        <title>Login page</title>
      </Helmet>
      <div className="flex gap-2 items-center">
        <img src={Logo} alt="inkverse_logo" className="w-12 h-12" />
        <h1 className="font-bold text-xl">InkVerse</h1>
      </div>
      <div className="flex flex-col mb-4">
        <div className="flex flex-col items-center">
          <Typography variant="h4" className="font-mulish font-bold">
            Welcome to Inkverse! 👋🏻
          </Typography>
          <Typography variant="paragraph" className="font-mulish">
            Please sign-in to your account and start the adventure
          </Typography>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 my-4">
            <Input
              crossOrigin={undefined}
              type="text"
              placeholder="Email"
              {...register("email", { required: true })}
              className="text-black "
            />
            <Input
              crossOrigin={undefined}
              type="password"
              placeholder="Password"
              {...register("password", { required: true, minLength: 6 })}
              className="input"
            />
            {errors.password?.type === "minLength" && (
              <p className="text-red-700">Minimum 6 characters</p>
            )}
          </div>

          <div className="flex items-center justify-between my-4">
            <div className="flex gap-2 items-center">
              <input type="checkbox" {...register("checkbox")} />
              <ClickableText
                label="Remember me"
                onClick={() => console.log("remember me")}
              />
            </div>

            <ClickableText
              label="Forget Password ?"
              onClick={() => console.log("forget password")}
            />
          </div>
          <Button
            onClick={handleSubmit(onSubmit)}
            className="w-full bg-[#237943] mb-4 font-mulish font-bold text-sm"
          >
            Login
          </Button>
        </form>

        <div className="flex justify-center items-center gap-2 mb-4">
          <Typography variant="paragraph" className="font-mulish">
            {" "}
            New on our platform?{" "}
          </Typography>
          <Link to="/register">
            <ClickableText
              label="Create An Account"
              onClick={() => console.log("create an account")}
            />
          </Link>
        </div>
        <div className="flex justify-center items-center gap-1 text-gray-500 mb-4">
          <div className="h-px bg-gray-400 w-full"></div>
          <p>or</p>
          <div className="h-px bg-gray-400 w-full"></div>
        </div>
        <SocialMediaIconsList
          twitterUrl="https://twitter.com/"
          facebookUrl="https://www.facebook.com/"
          instagramUrl="https://instagram.com"
        />
      </div>
    </div>
  );
};

export default Login;
