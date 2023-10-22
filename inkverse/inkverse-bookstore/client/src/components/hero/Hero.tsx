import Book from "../../assets/book.png";
import { Button } from "@material-tailwind/react";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

const Hero = () => {
  return (
    <div className="grid md:grid-cols-2 bg-green-200 rounded-xl place-items-center relative font-mulish">
      <div className="px-5 md:px-10 flex flex-col gap-4 text-center md:text-left">
        <div className="text-[2rem] mt-10 md:mt-0 md:text-[3.5rem] font-bold letter-spacing-sm">
          <h1>Expand your mind,</h1>
          <h1>reading a book</h1>
        </div>
        <p className="flex text-sm md:text-lg">
          Reading books is a wonderful way to spend your time. Here at, we
          believe reading will help you make connections with others.
        </p>
        <div className="my-3 flex justify-center md:justify-start mb-10 md:mb-0">
          <Button
            variant="filled"
            className="flex items-center gap-2 font-mulish bg-[#237943] text-white text-[0.8rem] md:text-lg"
          >
            Get started
            <ChevronRightIcon className="w-6 h-6" />
          </Button>
        </div>
      </div>
      <img
        src={Book}
        alt="reading vector"
        className="hidden md:block w-[400px] h-auto translate-y-0 md:-translate-y-12"
      />
    </div>
  );
};

export default Hero;
