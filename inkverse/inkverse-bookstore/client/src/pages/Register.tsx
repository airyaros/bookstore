import React from "react";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Typography, Button, Input } from "@material-tailwind/react";
import Logo from "../assets/inkverselogo.svg";
import ClickableText from "../components/clickableText/ClickableText";
import SocialMediaIconsList from "../components/socialMediaIconList/SocialMediaIconsList";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/RootReducer";
import { addUser } from "../features/auth/AuthSlice";


type RegisterFormData = {
  username: string;
  email: string;
  password: string;
  checkbox: boolean;
};

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);


  const onSubmit = (data: RegisterFormData) => {
    // Dispatch the addUser action to add user data to the state
    dispatch(addUser(data));
    console.log(authState);
  };
  console.log(authState)

  return (
    <div className="w-full flex flex-col gap-2 justify-center items-center h-screen font-mulish">
      <Helmet>
        <title>Register page</title>
      </Helmet>
      <div className="flex gap-2 items-center">
        <img src={Logo} alt="inkverse_logo" className="w-12 h-12" />
        <h1 className="font-bold text-xl">InkVerse</h1>
      </div>
      <div className="flex flex-col mb-4">
        <div className="flex flex-col items-center">
          <Typography variant="h4" className="font-mulish font-bold">
            Adventure starts here 🚀
          </Typography>
          <Typography variant="paragraph" className="font-mulish">
            Create your inkverse account here!
          </Typography>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="input-form">
          <div className="flex flex-col gap-4 my-4">
            <Input
              crossOrigin={undefined}
              type="text"
              placeholder="Username"
              {...register("username", { required: true })}
              className=""
            />
            <Input
              crossOrigin={undefined}
              type="text"
              placeholder="Email"
              {...register("email", { required: true })}
              className="input"
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
                label="agree on terms"
                onClick={() => console.log("agree on terms")}
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
            Register
          </Button>
        </form>

        <div className="flex justify-content-center align-items-center gap-2 mb-4">
          <Typography variant="paragraph" className="font-mulish">
            {" "}
            Already have an account?
          </Typography>
          <Link to="/login">
            <ClickableText
              label="Sign in instead"
              onClick={() => console.log("sign in")}
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

export default Register;
