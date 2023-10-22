import { Button } from "@material-tailwind/react";
import NotFoundImg from "../assets/notfound.svg";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-[85vh] flex-col gap-12">
      <div>
        <img src={NotFoundImg} alt="offline picture" className="w-[200px]" />
      </div>
      <div className="w-8/12 flex flex-col items-center gap-5 font-mulish">
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl font-bold ">Oops! Why you're here ?</p>
          <p className="w-5/12 text-center text-sm">
            We are very sorry for inconvenience. It look like you're trying to
            access a page either has been deleted or never even existed.
          </p>
        </div>
        <Button className=" bg-[#237943] mb-4 font-mulish text-sm">
          <Link to="/">Go Back to home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
